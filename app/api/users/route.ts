import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

//this will be removed in final version
export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({ include: { job: true } });
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password, displayName, jobId } = body;
  try {
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

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        displayName,
        job: { connect: { id: parseInt(jobId) } },
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
