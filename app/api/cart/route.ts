import { PrismaClient } from "@prisma/client";

export default async function GET({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const prisma = new PrismaClient();

  if (!slug || typeof slug !== "string") {
    return Response.json({ error: "No slug provided" }, { status: 400 });
  }

  return Response.json(await prisma.order.findUnique({ where: { id: slug } }));
}
