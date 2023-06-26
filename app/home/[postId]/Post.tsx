"use client";

import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import moment from "moment";
import DeletePost from "./DeletePost";
import Metadata from "./Metadata";

interface PostProps {
  post: {
    id: string;
    title: string;
    description: string;
    url: string;
    createdAt: string;
    lastModified: string;
    user: string;
    color: string;
    userId: string;
    isOwner: boolean;
  };
  status: string;
}

export default function Post({ post, status }: PostProps) {
  const date = moment(post.createdAt).fromNow();
  const modifiedDate = moment(post.lastModified).fromNow();

  return (
    <section className="group flex w-full gap-2 rounded-md bg-gradient-to-bl from-neutral-700 via-neutral-800 to-neutral-800 px-4 py-2 hover:via-neutral-700 hover:to-neutral-700">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-3xl">{post.title}</h2>
        <div className="flex w-full gap-4">
          <div
            style={{ backgroundColor: post.color }}
            className="h-8 w-8 flex-shrink-0 rounded-full"
          />
          <div className="flex w-full flex-col justify-between gap-4">
            <p style={{ color: post.color }} className="font-bold">
              {post.user}
            </p>
            <p>{post.description}</p>
            {post.url.length > 0 && <Metadata url={post.url} />}
            <div>
              <p className="text-end text-xs">{date}</p>
              {post.lastModified && (
                <p className="text-end text-xs">
                  {"Last modified " + modifiedDate}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {post.isOwner && (
        <div className="invisible flex flex-col gap-1 group-hover:visible">
          <Link href={"/home/" + post.id + "/edit"}>
            <RiEdit2Fill className="h-6 w-6 fill-neutral-500 hover:fill-white" />
          </Link>
          <DeletePost postId={post.id} isOwner={post.isOwner} status={status} />
        </div>
      )}
    </section>
  );
}
