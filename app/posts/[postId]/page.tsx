import { RiCloseCircleFill, RiChat3Line } from "react-icons/ri";
import Link from "next/link";
import Comments from "./Comments";
import MessageBar from "./MessageBar";
import Post from "./Post";

export const metadata = {
  title: "Post Title",
};

async function getPost(postId: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId);
  return res.json();
}

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPost(params.postId);

  return (
    <section className="ml-2 h-screen w-full min-w-[32rem] overflow-scroll rounded-lg bg-neutral-800">
      <header className="sticky top-0 flex h-12 w-full items-center justify-between gap-2 rounded-t-lg bg-neutral-900 px-4 py-2">
        <RiChat3Line className="h-6 w-6 shrink-0 -rotate-90" />
        <h3 className="truncate font-vt323 text-lg font-bold">{post.title}</h3>
        <Link href="/posts">
          <RiCloseCircleFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
        </Link>
      </header>
      <section className="flex h-full flex-col gap-4 overflow-x-hidden overflow-y-scroll p-4">
        <Post postId={params.postId} post={post} />
        <div className="h-1 w-full shrink-0 rounded-lg bg-gradient-to-r from-neutral-800 via-neutral-700 to-amber-200" />
        <Comments postId={params.postId} />
      </section>
      <MessageBar postId={params.postId} />
    </section>
  );
}
