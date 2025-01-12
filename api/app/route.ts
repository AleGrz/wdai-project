import type { MessageResponse } from "@/types";

export async function GET() {
  return Response.json(
    { message: 'API endpoint not found' } as MessageResponse,
    { status: 404 }
  );
}