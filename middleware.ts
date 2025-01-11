import type { NextRequest } from "next/server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const accessRules = [
  {
    path: "/api/cart/:userid/buy",
    methods: ["PATCH"],
    roles: ["user", "admin"],
    userSpecific: true
  },
  {
    path: "/api/cart/:userid",
    methods: ["GET"],
    roles: ["user", "admin"],
    userSpecific: true
  },
  {
    path: "/api/category/:categoryId",
    methods: ["PATCH", "DELETE"],
    roles: ["admin"]
  },
  {
    path: "/api/category",
    methods: ["POST"],
    roles: ["admin"]
  },
  {
    path: "/api/product/:productId",
    methods: ["PATCH", "DELETE"],
    roles: ["admin"]
  },
  {
    path: "/api/product",
    methods: ["POST"],
    roles: ["admin"]
  },
  {
    path: "/api/user",
    methods: ["GET"],
    roles: ["admin"]
  },
  {
    path: "/cart/:userid",
    methods: ["GET"],
    roles: ["user", "admin"],
    userSpecific: true
  }
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const method = request.method;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
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
  if (move) {
    return NextResponse.next();
  }
  const response = await fetch(`${request.nextUrl.origin}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken: accessToken?.value }),
  });


  const loginUrl = request.nextUrl.clone();

  loginUrl.pathname = "/login";
  if (!response.ok && !path.startsWith("/api")) {
    return NextResponse.redirect(loginUrl);
  }

  const user = await response.json();

  for (const rule of accessRules) {
    if (matchesPath(rule.path, path) && rule.methods.includes(method)) {
      if (!rule.roles.includes(user.isAdmin ? "admin" : "user")) {
        return NextResponse.json(
          { message: "Forbidden: You do not have access to this resource." },
          { status: 403 }
        );
      }

      if (rule.userSpecific) {
        const userSpecificPlace = rule.path.split("/").indexOf(":userid");
        const userIdFromPath = path.split("/")[userSpecificPlace];

        if (parseInt(userIdFromPath) !== user.id && !user.isAdmin) {
          return NextResponse.json(
            { message: "Forbidden: You can only access your own resources." },
            { status: 403 }
          );
        }
      }
    }
  }

  return NextResponse.next();
}
