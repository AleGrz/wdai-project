import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const accessRules = [
  {
    path: "/api/cart/:userid/buy",
    methods: ["PATCH"],
    roles: ["user", "admin"],
    userSpecific: true,
  },
  
  {
    path: "/api/category",
    methods: ["GET", "PATCH", "DELETE"],
    roles: ["admin"],
  },
  {
    path: "/api/user/*",
    methods: ["PATCH"],
    roles: ["admin"],
  },
];

export async function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const path = request.nextUrl.pathname;
  const method = request.method;

  // Fetch user data using the token
  const response = await fetch(`${request.nextUrl.origin}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    return NextResponse.redirect("/login");
  }

  const data = await response.json();
  const user = data.user;

  // Function to match path with wildcard rules
  const matchesPath = (rulePath: string, requestPath: string) => {
    const ruleRegex = new RegExp(
      "^" + rulePath.replace(/\*/g, ".*").replace(/:([a-zA-Z]+)/g, "([^/]+)") + "$"
    );
    return ruleRegex.test(requestPath);
  };

  // Check access rules
  for (const rule of accessRules) {
    if (matchesPath(rule.path, path) && rule.methods.includes(method)) {
      // Check if the user has the required role
      if (!rule.roles.includes(user.role)) {
        return NextResponse.json(
          { message: "Forbidden: You do not have access to this resource." },
          { status: 403 }
        );
      }

      // If user-specific check is required
      if (rule.userSpecific) {
        const userIdFromPath = path.split("/").pop(); // Extract `userid` from the path
        if (userIdFromPath !== user.id && user.role !== "admin") {
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
