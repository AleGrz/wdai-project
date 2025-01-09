"use server";
import { cookies } from "next/headers";

export const setCookies = async (tokens: { token: string; refreshToken: string }) => {
  "use server";
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'accessToken',
    value: tokens.token,
    httpOnly: true,
    path: '/',
  })
  cookieStore.set({
    name: 'refreshToken',
    value: tokens.refreshToken,
    httpOnly: true,
    path: '/',
  })
};