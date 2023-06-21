import { signJWT } from "@/utils/token";
import { getErrorResponse } from "@/utils/helpers";
import prisma from "@/prisma/prisma";
import { LoginUserInput, LoginUserSchema } from "@/utils/userSchema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user || !(data.password === user.password)) {
      return getErrorResponse(401, "Invalid username or password");
    }

    const token = await signJWT({ sub: user.id }, { exp: "1h" });

    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: 60 * 60,
      }),
    ]);

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}
