import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(req: Request) {
  try {
    const jobs = await prisma.job.findMany();

    if (!jobs) {
      return NextResponse.json({ error: "Jobs not found" }, { status: 404 });
    }

    return NextResponse.json(jobs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
