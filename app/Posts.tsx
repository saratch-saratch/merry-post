"use client";

import Link from "next/link";
import moment from "moment";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function Posts() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/posts",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const posts = data;

  return (
    <section className="flex flex-col gap-4">
      {posts.map((post: any) => (
        <Link href={"/posts"} key={post.id}>
          <div className="flex w-full justify-between gap-4 rounded-md bg-neutral-700 from-neutral-500 px-4 py-2 hover:cursor-pointer hover:bg-gradient-to-br">
            <div className="flex w-full flex-col justify-between overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <h3 className="line-clamp-3 text-xl font-bold">
                    {post.title}
                  </h3>
                  <div className="h-20 w-20 flex-shrink-0 self-center rounded-lg bg-neutral-500"></div>
                </div>
                <div className="flex">
                  <p style={{ color: post.user.job.color }}>
                    {post.user.displayName}
                  </p>
                  <p className="truncate">: {post.description}</p>
                </div>
              </div>
              <p className="text-end text-xs">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
