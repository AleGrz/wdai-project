import type { NextRequest } from "next/server";
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
  }
];

export async function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
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
  if (move) {
    return NextResponse.next();
  }

  const response = await fetch(`${request.nextUrl.origin}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";

  if (!response.ok) {
    return NextResponse.redirect(loginUrl);
  }

  const data = await response.json();
  const user = data.user;

  for (const rule of accessRules) {
    if (matchesPath(rule.path, path) && rule.methods.includes(method)) {
      if (!rule.roles.includes(user.role)) {
        return NextResponse.json(
          { message: "Forbidden: You do not have access to this resource." },
          { status: 403 }
        );
      }

      if (rule.userSpecific) {
        const userSpecificPlace = rule.path.split("/").indexOf(":userid");
        const userIdFromPath = path.split("/")[userSpecificPlace];
        if (userIdFromPath !== user.id && !user.isAdmin) {
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
