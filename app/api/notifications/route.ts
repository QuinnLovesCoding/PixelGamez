import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you would fetch these from the database using Prisma.
  // For now, we return a 200 with an empty array so the fetch in Header doesn't fail.
  return NextResponse.json([]);
}
