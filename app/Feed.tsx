"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

interface Post {
  id: string;
  title: string;
  link?: string;
  description: string;
  createdAt: string;
  user: {
    job: {
      color: string;
    };
    displayName: string;
  };
}

const getYoutubeMetadata = async (url: string) => {
  try {
    const res = await fetch("https://youtube.com/oembed?url=" + url);

    const metadata = await res.json();
    const thumbnail = metadata.thumbnail_url;
    console.log(thumbnail);
    return thumbnail;
  } catch (error) {
    console.error("Failed to fetch metadata");
    return null;
  }
};

export default function Feed() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/posts",
    fetcher
  );

  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      const thumbnailUrl = await getYoutubeMetadata(
        "www.youtube.com/watch?v=PMP8b68C9iY"
      );
      setUrl(thumbnailUrl);
    };

    fetchThumbnail();
  }, []);

  if (error) return <div>{"(┛◉Д◉)┛彡┻━┻"}</div>;
  if (isLoading) return <div>{"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"}</div>;
  const posts = data;
  return (
    <section className="flex flex-col gap-4">
      {posts.map((post: Post) => (
        <Link href={"/posts"} key={post.id}>
          <div className="flex w-full justify-between gap-4 rounded-md bg-neutral-700 from-neutral-500 px-4 py-2 hover:cursor-pointer hover:bg-gradient-to-br">
            <div className="flex w-full flex-col justify-between overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <h3 className="line-clamp-3 text-xl font-bold">
                    {post.title}
                  </h3>
                  {url ? (
                    <img
                      src={url}
                      className="aspect-video h-20 flex-shrink-0 self-center rounded-lg object-cover"
                      alt="Thumbnail"
                    ></img>
                  ) : (
                    <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-neutral-500"></div>
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
          </div>
        </Link>
      ))}
    </section>
  );
}
