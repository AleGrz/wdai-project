"use server";
import { cookies } from "next/headers";

export const setCookies = async (tokens: { accessToken: string; refreshToken: string }) => {
<<<<<<< HEAD
  "use server";
=======
>>>>>>> 081dc51f2c9d5468272308010f16b4ce9166da66
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'accessToken',
    value: tokens.accessToken,
    httpOnly: true,
    sameSite: 'strict',
<<<<<<< HEAD
    path: '/',
=======
>>>>>>> 081dc51f2c9d5468272308010f16b4ce9166da66
  })
  cookieStore.set({
    name: 'refreshToken',
    value: tokens.refreshToken,
    httpOnly: true,
    sameSite: 'strict',
<<<<<<< HEAD
    path: '/',
=======
>>>>>>> 081dc51f2c9d5468272308010f16b4ce9166da66
  })
};