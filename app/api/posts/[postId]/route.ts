import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
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

    const filteredPost = {
      ...post,
      link: post?.link || "",
      user: post?.user.displayName,
      color: post?.user.job.color,
    };

    return NextResponse.json(filteredPost, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
