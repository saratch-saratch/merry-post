import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

//here
//check again

export async function GET(req: NextRequest, res: NextResponse) {
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

    const filteredUser = {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      displayName: user?.displayName,
      jobId: user?.job.id,
      jobName: user?.job.jobName,
      color: user?.job.color,
    };

    return NextResponse.json(filteredUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const data = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(data.password, user?.password);

    if (data.password !== user.password) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 401 }
      );
    }

    if (data.newPassword === "") data.newPassword = user?.password;

    const editedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: data.email,
        password: data.newPassword,
        displayName: data.displayName,
        job: { connect: { id: Number(data.jobId) } },
      },
    });

    return NextResponse.json(editedUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
