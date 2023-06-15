import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({ include: { job: true } });
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
