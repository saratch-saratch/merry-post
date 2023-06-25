import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { job: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const filteredUser = {
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      jobId: user.job.id,
      jobName: user.job.jobName,
      color: user.job.color,
    };

    return NextResponse.json(filteredUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { displayName, jobId, email, newPassword, password } = data;

    if (!displayName || !jobId || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      displayName.trim() === "" ||
      email === !/^\S+@\S+\.\S+$/.test(email) ||
      password.trim() === ""
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

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (password !== user.password) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 401 }
      );
    }

    if (email !== user.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
    }

    const validatedNewPassword =
      newPassword.trim() !== "" ? newPassword : user.password;

    const editedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
        password: validatedNewPassword,
        displayName: displayName,
        job: { connect: { id: Number(jobId) } },
      },
    });

    return NextResponse.json(editedUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
