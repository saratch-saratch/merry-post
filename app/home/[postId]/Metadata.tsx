import Link from "next/link";
import { getYoutubeMeta } from "@/utils/getYoutubeMeta";

export default async function Metadata({ link }: { link: string }) {
  const youtubeMeta = await getYoutubeMeta(link);

  return (
    <Link href={link} className="w-3/4">
      <div className="flex flex-col gap-2 rounded-md bg-neutral-900 p-2">
        <div>
          <p className="text-xs">{youtubeMeta?.provider}</p>
          <h3 className="text-rose-600">{youtubeMeta?.title}</h3>
          <p className="text-xs">{youtubeMeta?.author}</p>
        </div>
        <img
          src={youtubeMeta?.thumbnail}
          alt=""
          className="aspect-video h-full w-full rounded-md object-cover"
        ></img>
      </div>
    </Link>
  );
}
