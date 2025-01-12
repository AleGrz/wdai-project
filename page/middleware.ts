import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getUserData } from "@/app/(auth)/helper";

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
  const matchesPath = (rulePath: string, requestPath: string) => {
    const ruleRegex = new RegExp(
      "^" + rulePath.replace(/:([a-zA-Z]+)/g, "([^/]+)") + "$"
    );

    return ruleRegex.test(requestPath);
  };

  let move = true;

  for (const rule of accessRules) {
    if (matchesPath(rule.path, path) && rule.methods.includes(method)) {
      move = false;
      break;
    }
  }
  if (move)
    return NextResponse.next();
  const user = await getUserData();
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
