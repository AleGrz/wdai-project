import type { NextRequest } from "next/server";
import type { Review, User } from "@prisma/client";

import { NextResponse } from "next/server";

const accessRules = [
  {
    path: "/cart/:userId/buy",
    methods: ["POST"],
    roles: ["user", "admin"],
    userSpecific: true
  },
  {
    path: "/cart/:userId",
    methods: ["GET", "PUT", "DELETE"],
    roles: ["user", "admin"],
    userSpecific: true
  },
  {
    path: "/category/:categoryId",
    methods: ["PATCH", "DELETE"],
    roles: ["admin"]
  },
  {
    path: "/category",
    methods: ["POST"],
    roles: ["admin"]
  },
  {
    path: "/product/:productId",
    methods: ["PATCH", "DELETE"],
    roles: ["admin"]
  },
  {
    path: "/product/:productId/review",
    methods: ["POST"],
    roles: ["user", "admin"],
    userSpecific: true
  },
  {
    path: "/product/:productId/review/:reviewId",
    methods: ["PATCH", "DELETE"],
    roles: ["user", "admin"],
    userSpecific: true
  },
  {
    path: "/product",
    methods: ["POST"],
    roles: ["admin"]
  },
  {
    path: "/user",
    methods: ["GET"],
    roles: ["admin"]
  }
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const method = request.method;
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";
  
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

  const user = await fetch(`${request.nextUrl.origin}/auth`, {
    method: "POST",
    body: JSON.stringify({ accessToken: token }),
  }).then((res) => (!res.ok ? null : res.json())) as User | null;

  for (const rule of accessRules) {
    if (matchesPath(rule.path, path) && rule.methods.includes(method)) {
      if (!user) {
        return NextResponse.json(
          { message: "Unauthorized: You need to be logged in to access this resource." },
          { status: 401 }
        );
      }
      if (!rule.roles.includes(user.isAdmin ? "admin" : "user")) {
        return NextResponse.json(
          { message: "Forbidden: You do not have access to this resource." },
          { status: 403 }
        );
      }

      if (rule.userSpecific) {
        if (rule.path.includes(":reviewId") && method !== "POST") {
          const reviewSpecificPlace = rule.path.split("/").indexOf(":reviewId");
          const reviewId = decodeURIComponent(path.split("/")[reviewSpecificPlace]);
          const productSpecificPlace = rule.path.split("/").indexOf(":productId");
          const productId = decodeURIComponent(path.split("/")[productSpecificPlace]);
          const review = await fetch(`${request.nextUrl.origin}/product/${productId}/review/${reviewId}`).then((res) =>
            res.ok ? res.json() : null
          ) as Review | null;

          if (!review || (review.userId !== user.id && !user.isAdmin)) {
            return NextResponse.json(
              { message: "Forbidden: You can only access your own resources." },
              { status: 403 }
            );
          }
        } else if (!rule.path.includes(":userId")) {
          try {
            const body = await request.json();

            if (body && body.userId && parseInt(body.userId) !== user.id) {
              return NextResponse.json(
                { message: "Forbidden: You can only access your own resources." },
                { status: 403 }
              );
            }
          } catch {
            return NextResponse.json(
              { message: "Bad Request: Invalid body format." },
              { status: 400 }
            );
          }
        } else {
          const userSpecificPlace = rule.path.split("/").indexOf(":userId");
          const userIdFromPath = decodeURIComponent(path.split("/")[userSpecificPlace]);
          
          if (parseInt(userIdFromPath) !== user.id && !user.isAdmin) {
            return NextResponse.json(
              { message: "Forbidden: You can only access your own resources." },
              { status: 403 }
            );
          }
        }
      }
    }
  }

  return NextResponse.next();
}
