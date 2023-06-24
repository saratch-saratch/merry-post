"use client";

import { RiCloseCircleFill, RiChat3Line } from "react-icons/ri";
import Link from "next/link";
import Comments from "./Comments";
import CommentBar from "./CommentBar";
import Post from "./Post";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostPage({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const {
    data: post,
    error,
    isLoading,
  } = useSWR("/api/posts/" + postId, fetcher);

  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user.id as string;

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status]);

  if (error || isLoading)
    return (
      <section className="ml-2 flex h-screen w-full min-w-[32rem] flex-col rounded-lg bg-neutral-800">
        <header className="sticky top-0 flex h-12 w-full shrink-0 items-center justify-between gap-2 rounded-t-lg bg-neutral-900 px-4 py-2" />
      </section>
    );

  return (
    <>
      {status === "authenticated" && (
        <section className="ml-2 flex h-screen w-full min-w-[32rem] flex-col rounded-lg bg-neutral-800">
          <header className="sticky top-0 flex h-12 w-full shrink-0 items-center justify-between gap-2 rounded-t-lg bg-neutral-900 px-4 py-2">
            <div className="flex gap-4 overflow-hidden">
              <RiChat3Line className="h-6 w-6 shrink-0 -rotate-90" />
              <h3 className="truncate font-vt323 text-lg font-bold">
                {post.title}
              </h3>
            </div>
            <Link href="/home">
              <RiCloseCircleFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
            </Link>
          </header>
          <section className="flex h-full flex-col gap-4 overflow-x-hidden overflow-y-scroll p-4">
            <Post postId={postId} post={post} userId={userId} />
            <div className="h-1 w-full shrink-0 rounded-lg bg-gradient-to-r from-neutral-800 via-neutral-700 to-amber-200" />
            <Comments postId={postId} status={status} />
          </section>
          <CommentBar postId={postId} status={status} />
        </section>
      )}
    </>
  );
}
