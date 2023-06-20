import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import moment from "moment";
import PostDeleteButton from "./PostDeleteButton";
import Metadata from "./Metadata";

export default async function Post({
  postId,
  post,
}: {
  postId: string;
  post: any;
}) {
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
          ></div>
          <div className="flex w-full flex-col justify-between gap-4">
            <p style={{ color: post.color }} className="font-bold">
              {post.user}
            </p>
            <p>{post.description}</p>
            {post.link.length > 0 && <Metadata link={post.link} />}
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
      <div className="invisible flex flex-col gap-1 group-hover:visible">
        <Link href={"/home/" + postId + "/edit"}>
          <RiEdit2Fill className="h-6 w-6 fill-neutral-500 hover:fill-white" />
        </Link>
        <PostDeleteButton />
      </div>
    </section>
  );
}
