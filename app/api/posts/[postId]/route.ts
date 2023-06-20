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
      user: post?.user.displayName,
      color: post?.user.job.color,
    };

    return NextResponse.json(filteredPost, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const body = await request.json();
  const { title, description, link } = body;
  let checkedLink: string;
  try {
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    if (!link) {
      checkedLink = "";
    } else {
      const url = new URL(link);
      if (!url.hostname.includes("youtube.com")) {
        return NextResponse.json(
          { error: "Link is not a valid url" },
          { status: 400 }
        );
      }
      checkedLink = link;
    }

    const post = await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
        description,
        link: checkedLink,
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
