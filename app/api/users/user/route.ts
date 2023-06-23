import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { job: true },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        job: { connect: { id: Number(data.jobId) } },
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
