"use server";
import { cookies } from "next/headers";

export const setCookies = async (tokens: { accessToken: string; refreshToken: string }) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'accessToken',
    value: tokens.accessToken,
    httpOnly: true,
    sameSite: 'strict',
  })
  cookieStore.set({
    name: 'refreshToken',
    value: tokens.refreshToken,
    httpOnly: true,
    sameSite: 'strict',
  })
};