import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { username, email, displayName, password, confirmPassword, jobId } =
      data;

    if (
      !username ||
      !email ||
      !displayName ||
      !password ||
      !confirmPassword ||
      !jobId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      username.trim() === "" ||
      email === !/^\S+@\S+\.\S+$/.test(email) ||
      displayName.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      confirmPassword !== password
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (isNaN(Number(jobId))) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

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
