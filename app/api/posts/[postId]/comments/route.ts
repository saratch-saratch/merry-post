import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
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
        userId: comment.userId,
        color: comment.user.job.color,
        message: comment.message,
        createdAt: comment.createdAt,
        isOwner: comment.userId === userId,
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
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();

    const comment = await prisma.comment.create({
      data: {
        message: body.message,
        post: { connect: { id: params.postId } },
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create new comment" },
      { status: 500 }
    );
  }
}
