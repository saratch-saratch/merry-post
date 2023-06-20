import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            displayName: true,
            job: { select: { color: true } },
          },
        },
      },
    });

    const filteredPosts = posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        link: post.link,
        createdAt: post.createdAt,
        user: post.user.displayName,
        color: post.user.job.color,
      };
    });

    return NextResponse.json(filteredPosts, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
      if (!url.hostname.includes(".")) {
        return NextResponse.json(
          { error: "Link is not a valid url" },
          { status: 400 }
        );
      }
      checkedLink = link;
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        link: checkedLink,
        //use token to get user id
        user: { connect: { id: "1" } },
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
