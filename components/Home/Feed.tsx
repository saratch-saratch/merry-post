"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import getYoutubeMetadata from "@/utils/getYoutubeMetadata";
import { FetchedPost } from "@/interfaces/fetchedPost";

export default function Feed() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/posts",
    fetcher
  );

  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [posts, setPosts] = useState<FetchedPost[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  useEffect(() => {
    if (posts) {
      const urls = posts.map((post) => post.link || "");

      const fetchThumbnails = async () => {
        const result = await getYoutubeMetadata(urls);
        setThumbnails(result);
      };
      fetchThumbnails();
    }
  }, [posts]);

  if (error) return <div>{"(┛◉Д◉)┛彡┻━┻"}</div>;
  if (isLoading) return <div>{"♪☆＼(^０^＼) ♪(／^-^)／☆♪"}</div>;

  return (
    <section className="flex flex-col gap-4">
      {posts.map((post: FetchedPost) => (
        <Link href={"/posts/" + post.id} key={post.id}>
          <div className="flex w-full flex-col justify-between gap-2 rounded-md bg-neutral-700 from-neutral-500 px-4 py-2 hover:cursor-pointer hover:bg-gradient-to-br">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-2">
                <h3 className="line-clamp-3 text-xl font-bold">{post.title}</h3>
                {post.link && thumbnails[post.link] !== "" && (
                  <img
                    src={thumbnails[post.link]}
                    className="aspect-video h-20 flex-shrink-0 self-center rounded-lg object-cover"
                    alt="Thumbnail"
                  ></img>
                )}
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
        </Link>
      ))}
    </section>
  );
}
