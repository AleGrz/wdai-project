import type {NextRequest} from "next/server";

import { NextResponse } from "next/server";

import { getUserData } from "@/app/(auth)/helper";

export async function GET(request: NextRequest) {
  const user = await getUserData(false);

  if (user) {
    return NextResponse.redirect(new URL("/cart/" + user.id, request.nextUrl));
  }
  // There should not be any user that is not logged in.
}