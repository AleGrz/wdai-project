"use server";
import type { TokenPair } from "@/types";
import type { User } from "@prisma/client";

import { cookies } from "next/headers";
import * as jose from "jose";

export async function getUserData(): Promise<User | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken === undefined || accessToken?.value === undefined) return null;

  const request = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    body: JSON.stringify({ accessToken: accessToken.value })
  });

  if (!request.ok) return null;

  return request.json();
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function generateTokens(user: User): Promise<TokenPair> {
  const jwtSecret = process.env.JWT_SECRET as string;
  const accessToken = await new jose.SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(jwtSecret));

  const refreshToken = await new jose.SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(jwtSecret));

  return {
    accessToken: {
      value: accessToken,
      expiresIn: 36000,
    },
    refreshToken: {
      value: refreshToken,
      expiresIn: 6048000,
    },
  }
}

export async function decodeToken(token: string): Promise<number | null> {
  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret)
    );

    return decoded.payload.userId as number;
  } catch {
    return null;
  }
}

export async function login(tokens: TokenPair): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "accessToken",
    value: tokens.accessToken.value,
    httpOnly: true,
    maxAge: tokens.accessToken.expiresIn,
    sameSite: "strict",
  })
  cookieStore.set({
    name: "refreshToken",
    value: tokens.refreshToken.value,
    httpOnly: true,
    maxAge: tokens.refreshToken.expiresIn,
    sameSite: "strict",
  })
};