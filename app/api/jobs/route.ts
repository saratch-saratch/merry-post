import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(request: Request) {
  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
