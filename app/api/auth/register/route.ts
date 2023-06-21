import { getErrorResponse } from "@/utils/helpers";
import prisma from "@/prisma/prisma";
import { RegisterUserInput, RegisterUserSchema } from "@/utils/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        job: { connect: { id: Number(data.jobId) } },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    if (error.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
