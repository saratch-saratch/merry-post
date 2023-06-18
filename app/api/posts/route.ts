import { NextRequest, NextResponse } from "next/server";
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
        link: post.link || "",
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

// export async function POST(request: Request) {
//   try {
//     const res = await request.json();
//     const post = { data: { title: res.title } };
//     const newPost = await prisma.post.create(post);
//     console.log(newPost);
//     return NextResponse.json(newPost, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
//   }
// }
