"use server"
import type { TokenPair, User } from "@/types";

import { cookies } from "next/headers";

export async function getUserData(refresh: boolean = true): Promise<User | null> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken");
  let refreshToken = cookieStore.get("refreshToken");

  if ((accessToken === undefined || !accessToken.value) && refreshToken !== undefined && refreshToken.value && refresh) {
    const tokens = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshToken.value })
    }).then((res) => !res.ok ? null : res.json()) as TokenPair | null;
  
    if (tokens) {
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
      accessToken = cookieStore.get("accessToken");
      refreshToken = cookieStore.get("refreshToken");
    }
  }

  if (!accessToken) return null;

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    body: JSON.stringify({ accessToken: accessToken })
  }).then((res) => !res.ok ? null : res.json());
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
  let accessToken = cookieStore.get("accessToken");
  let refreshToken = cookieStore.get("refreshToken");

  if ((accessToken === undefined || !accessToken.value) && refreshToken !== undefined && refreshToken.value) {
    const tokens = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshToken.value })
    }).then((res) => !res.ok ? null : res.json()) as TokenPair | null;
  
    if (tokens) {
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
      accessToken = cookieStore.get("accessToken");
      refreshToken = cookieStore.get("refreshToken");
    }
  }

  return { accessToken: accessToken?.value ?? null, refreshToken: refreshToken?.value ?? null };
}