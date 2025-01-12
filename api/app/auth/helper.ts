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