import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const post = await prisma.comment.delete({
      where: {
        id: params.commentId,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
