"use server";
import type { TokenPair, User } from "@/types";

import { cookies } from "next/headers";

export async function getUserData(): Promise<User | null> {
  const {accessToken } = await getTokensFromCookies();

  if (!accessToken) return null;

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    body: JSON.stringify({ accessToken: accessToken })
  }).then((res) => !res.ok ? null : res.json());
}

export async function refreshTokens(refreshToken: string): Promise<void> {
  const tokens = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    body: JSON.stringify({ refreshToken: refreshToken })
  }).then((res) => !res.ok ? null : res.json()) as TokenPair | null;

  if (tokens)
    await login(tokens);
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
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

export async function getTokensFromCookies(): Promise<{accessToken: string | null, refreshToken: string | null}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if ((accessToken === undefined || !accessToken.value) && refreshToken !== undefined && refreshToken.value) {
    await refreshTokens(refreshToken.value);
  }

  return { accessToken: cookieStore.get("accessToken")?.value || null, refreshToken: cookieStore.get("refreshToken")?.value || null };
}