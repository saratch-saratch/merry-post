import prisma from "@/prisma/prisma";
import { getErrorResponse } from "@/utils/helpers";
import { RegisterUserInput, RegisterUserSchema } from "@/utils/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("X-USER-ID");

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
    const userId = request.headers.get("X-USER-ID");

    if (!userId) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);

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
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = request.headers.get("X-USER-ID");

    if (!userId) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

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
