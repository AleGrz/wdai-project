import type { User } from "@prisma/client";

import { cookies } from "next/headers";

export async function getUserData(): Promise<User|null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken === undefined || accessToken?.value === undefined) return null;

  const request = await fetch("http://localhost:3000/api/auth", { method: "POST", body: JSON.stringify({ accessToken: accessToken.value }) });

  if (!request.ok) return null;

  return request.json();
}