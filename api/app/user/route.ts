import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isAdmin: true,
    },
  });

  return Response.json(users);
}
