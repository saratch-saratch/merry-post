import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

//everything here only accessible using token

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        job: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const body = await request.json();
    const { username, email, password, displayName, jobId } = body;

    if (Object.values(body).some((value) => value === "")) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    if (usernameExists) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        password,
        displayName,
        jobId,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
