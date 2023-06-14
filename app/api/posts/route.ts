import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
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
