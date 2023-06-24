import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function DELETE(
  request: Request,
  { params }: { params: { commentId: string } }
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
    const comment = await prisma.comment.findUnique({
      where: {
        id: params.commentId,
      },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this comment" },
        { status: 403 }
      );
    }

    const post = await prisma.comment.delete({
      where: {
        id: params.commentId,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
