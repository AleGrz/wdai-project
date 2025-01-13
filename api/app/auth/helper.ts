"use server";
import type { TokenPair } from "@/types";
import type { User } from "@prisma/client";

import * as jose from "jose";

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
      expiresIn: 3_600_000,
    },
    refreshToken: {
      value: refreshToken,
      expiresIn: 604_800_000,
    },
  }
}

export async function decodeToken(token: string): Promise<{userId: number | null, expired: boolean}> {
  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret)
    );

    return {userId: decoded.payload.userId as number, expired: false};
  } catch(e) {
    return {userId: null, expired: e instanceof jose.errors.JWTExpired};
  }
}