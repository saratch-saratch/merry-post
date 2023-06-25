"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { useFeed } from "@/utils/useFeed";
import { useSession } from "next-auth/react";

interface FetchedPost {
  id: string;
  title: string;
  description: string;
  url: string;
  createdAt: string;
  user: string;
  color: string;
}

export default function Feed() {
  const { posts, isError, isLoading } = useFeed();
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [sortedPosts, setSortedPosts] = useState<FetchedPost[]>([]);
  const { status } = useSession();

  useEffect(() => {
    const getYoutubeThumbnails = async (urls: string[]) => {
      const thumbnailUrls: Record<string, string> = {};
      for (const url of urls) {
        try {
          if (url.length > 0) {
            const res = await fetch("https://youtube.com/oembed?url=" + url);
            const metadata = await res.json();
            const thumbnail = metadata.thumbnail_url;
            thumbnailUrls[url] = thumbnail;
          }
        } catch (error) {
          thumbnailUrls[url] = "";
        }
      }
      return thumbnailUrls;
    };

    if (posts) {
      const urls = posts.map((post: FetchedPost) => post.url);
      const fetchThumbnails = async () => {
        const result = await getYoutubeThumbnails(urls);
        setThumbnails(result);
      };
      fetchThumbnails();

      const sorted = [...posts].sort((a, b) => {
        const result = Date.parse(b.createdAt) - Date.parse(a.createdAt);
        return result;
      });
      setSortedPosts(sorted);
    }
  }, [posts]);

  if (isError || isLoading) return null;

  return (
    <>
      {status === "authenticated" && (
        <section className="flex flex-col gap-4">
          {sortedPosts.map((post: FetchedPost) => (
            <Link href={"/home/" + post.id} key={post.id}>
              <div className="flex w-full flex-col justify-between gap-1 rounded-md bg-neutral-700 from-neutral-500 px-4 py-2 hover:cursor-pointer hover:bg-gradient-to-br">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between gap-2">
                    <h3 className="line-clamp-3 text-xl font-bold">
                      {post.title}
                    </h3>
                    {post.url && thumbnails[post.url] !== "" && (
                      <img
                        src={thumbnails[post.url]}
                        className="aspect-video h-20 flex-shrink-0 self-center rounded-md object-cover"
                        alt="Thumbnail"
                      ></img>
                    )}
                  </div>
                  <div className="flex">
                    <p className="shrink-0" style={{ color: post.color }}>
                      {post.user}
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
      )}
    </>
  );
}
