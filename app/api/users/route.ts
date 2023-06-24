import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

//here need rewrite

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password, displayName, jobId } = body;

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
        displayName: displayName,
        job: { connect: { id: Number(jobId) } },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
