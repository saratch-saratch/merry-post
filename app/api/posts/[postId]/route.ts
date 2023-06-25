import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

//here

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
      user: post?.user.displayName,
      color: post?.user.job.color,
    };

    return NextResponse.json(filteredPost, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

//here

export async function PUT(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const body = await request.json();
  const { title, description, url } = body;
  let checkedLink = "";
  try {
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    if (url !== "") {
      const validatedUrl = new URL(url);
      if (!validatedUrl.hostname.includes("youtube.com")) {
        return NextResponse.json(
          { error: "Link is not a valid url" },
          { status: 400 }
        );
      }
      checkedLink = url;
    }

    const post = await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
        description,
        url: checkedLink,
        lastModified: new Date(),
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function DELETE(
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
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: params.postId,
      },
    });

    if (!comment) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (comment.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to delete this post" },
        { status: 403 }
      );
    }

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
