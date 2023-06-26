"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface YoutubeMetaProps {
  provider: string;
  title: string;
  author: string;
  thumbnail: string;
}

export default function Metadata({ url }: { url: string }) {
  const [youtubeMeta, setYoutubeMeta] = useState<YoutubeMetaProps | null>(null);

  useEffect(() => {
    const fetchYoutubeMeta = async () => {
      try {
        const res = await fetch("https://youtube.com/oembed?url=" + url);
        const data = await res.json();
        const meta: YoutubeMetaProps = {
          provider: data.provider_name,
          title: data.title,
          author: data.author_name,
          thumbnail: data.thumbnail_url,
        };
        setYoutubeMeta(meta);
      } catch (error) {
        setYoutubeMeta(null);
      }
    };

    fetchYoutubeMeta();
  }, [url]);

  if (!youtubeMeta) return null;

  return (
    <Link href={url}>
      <div className="flex w-4/5 flex-col gap-2 rounded-md bg-neutral-900 p-2">
        <div>
          <p className="text-xs">{youtubeMeta?.provider}</p>
          <h3 className="line-clamp-2 text-rose-600 ">{youtubeMeta?.title}</h3>
          <p className="text-xs">{youtubeMeta?.author}</p>
        </div>
        <img
          src={youtubeMeta?.thumbnail}
          alt=""
          className="aspect-video h-full w-full rounded-md object-cover"
        />
      </div>
    </Link>
  );
}
