import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
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
        url: post.url,
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
  const { title, description, url } = body;

  try {
    if (!session) {
      return NextResponse.json(
        { error: "You are not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    if (!title || !description || title === "" || description === "") {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    let validatedUrl = "";
    if (url && url !== "") {
      try {
        const newUrl = new URL(url);
        if (!newUrl.hostname.includes("youtube.com")) {
          return NextResponse.json(
            { error: "Url is not valid" },
            { status: 400 }
          );
        }
        validatedUrl = url;
      } catch (err) {
        return NextResponse.json(
          { error: "Url is not valid" },
          { status: 400 }
        );
      }
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        url: validatedUrl,
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
