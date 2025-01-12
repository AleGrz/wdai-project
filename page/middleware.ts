import type { NextRequest } from "next/server";
import type { TokenPair, User } from "@/types";

import { NextResponse } from "next/server";

import { getTokensFromCookies, login } from "@/app/(auth)/helper";

const accessRules = [
  {
    path: "/login",
    methods: ["GET", "POST"],
    roles: ["guest"],
    redirect: "/",
  },
  {
    path: "/signup",
    methods: ["GET", "POST"],
    roles: ["guest"],
    redirect: "/",
  },
  {
    path: "/cart/:userid",
    methods: ["GET"],
    roles: ["user", "admin"],
    userSpecific: true,
    redirect: "/login",
  },
  {
    path: "/cart",
    methods: ["GET"],
    roles: ["user", "admin"],
    redirect: "/login",
  }
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const method = request.method;
  let { accessToken, refreshToken } = await getTokensFromCookies();
  const matchesPath = (rulePath: string, requestPath: string) => {
    const ruleRegex = new RegExp(
      "^" + rulePath.replace(/:([a-zA-Z]+)/g, "([^/]+)") + "$"
    );

    return ruleRegex.test(requestPath);
  };

  if (accessToken === null && refreshToken !== null) {
    const tokens = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshToken }),
    }).then((res) => res.ok ? res.json() : null) as TokenPair | null;

    if (tokens) {
      await login(tokens);
      accessToken = tokens.accessToken.value;
      refreshToken = tokens.refreshToken.value;
    }
  }

  let move = true;

  for (const rule of accessRules) {
    if (matchesPath(rule.path, path) && rule.methods.includes(method)) {
      move = false;
      break;
    }
  }
  if (move)
    return NextResponse.next();
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    body: JSON.stringify({ accessToken: accessToken }),
  }).then((res) => res.ok ? res.json() : null) as User | null;
  const userRole = !user ? "guest" : user.isAdmin ? "admin" : "user";

  for (const rule of accessRules) {
    if (matchesPath(rule.path, path) && rule.methods.includes(method)) {
      if (!rule.roles.includes(userRole)) {
        return NextResponse.redirect(new URL(rule.redirect, request.url));
      }

      if (rule.userSpecific && user) {
        const userSpecificPlace = rule.path.split("/").indexOf(":userid");
        const userIdFromPath = path.split("/")[userSpecificPlace];

        if (parseInt(userIdFromPath) !== user.id && !user.isAdmin) {
          return NextResponse.redirect(new URL(rule.redirect, request.url));
        }
      }
    }
  }

  return NextResponse.next();
}
