import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: params.postId,
      },
      include: {
        user: {
          select: {
            displayName: true,
            job: { select: { color: true } },
          },
        },
      },
    });

    const filteredComments = comments.map((comment) => {
      return {
        id: comment.id,
        user: comment.user.displayName,
        color: comment.user.job.color,
        message: comment.message,
        createdAt: comment.createdAt,
      };
    });

    return NextResponse.json(filteredComments, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const body = await request.json();
  try {
    const comment = await prisma.comment.create({
      data: {
        message: body.message,
        post: { connect: { id: params.postId } },
        //using token to get user id
        user: { connect: { id: "1" } },
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
