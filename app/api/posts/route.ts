import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

//here
//check again

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

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
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const { title, description, link } = body;
  let validatedUrl = "";

  try {
    if (!session) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    if (!title || !description || title === "" || description === "") {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    if (link) {
      const url = new URL(link);
      if (!url.hostname.includes("youtube.com")) {
        return NextResponse.json(
          { error: "Link is not a valid url" },
          { status: 400 }
        );
      }
      validatedUrl = link;
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        link: validatedUrl,
        user: { connect: { id: userId } },
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
