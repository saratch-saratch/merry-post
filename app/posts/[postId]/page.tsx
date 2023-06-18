import {
  RiCloseCircleFill,
  RiEdit2Fill,
  RiDeleteBinFill,
  RiChat3Line,
} from "react-icons/ri";
import Link from "next/link";
import moment from "moment";
import PostDeleteButton from "./PostDeleteButton";

export const metadata = {
  title: "Post Title",
};

async function getPost(postId: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function Post({ params }: { params: { postId: string } }) {
  const post = await getPost(params.postId);
  const date = moment(post.createdAt).fromNow();
  const modifiedDate = moment(post.lastModified).fromNow();

  return (
    <section className="ml-2 h-screen w-full min-w-[32rem] overflow-scroll rounded-lg bg-neutral-800">
      <header className="sticky top-0 flex h-12 items-center justify-between rounded-t-lg bg-neutral-900 px-4 py-2">
        <div className="flex gap-2">
          <RiChat3Line className="h-6 w-6 -rotate-90" />
          <h3 className="truncate font-vt323 text-lg font-bold"></h3>
        </div>
        <Link href="/posts">
          <RiCloseCircleFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
        </Link>
      </header>
      <section className="flex flex-col gap-4 overflow-x-hidden overflow-y-scroll p-4">
        <section className="group flex w-full gap-2 rounded-sm bg-gradient-to-bl from-neutral-700 via-neutral-800 to-neutral-800 px-4 py-2 hover:via-neutral-700 hover:to-neutral-700">
          <div className="flex w-full flex-col gap-4">
            <h2 className="text-3xl">{post.title}</h2>
            <div className="flex w-full gap-4">
              <div
                style={{ backgroundColor: post.color }}
                className="h-10 w-10 flex-shrink-0 rounded-full"
              ></div>
              <div className="flex flex-col justify-between gap-2">
                <div>
                  <p style={{ color: post.color }} className="font-bold">
                    {post.user}
                  </p>
                  <p>{post.description}</p>
                </div>
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
            <Link href={"/posts/" + params.postId + "/edit"}>
              <RiEdit2Fill className="h-6 w-6 fill-neutral-500 hover:fill-white" />
            </Link>
            <PostDeleteButton />
          </div>
        </section>
        <div className=" h-1 w-full rounded-lg bg-gradient-to-r from-neutral-800 via-neutral-700 to-amber-200" />
        <section className="flex flex-col gap-4">
          {/* will be replaced with client component */}
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <div className="group flex w-full gap-2 rounded-sm px-4 py-2 hover:bg-neutral-700">
              <div className="flex w-full gap-4">
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-teal-500"></div>
                <div className="flex flex-col justify-between gap-2">
                  <div>
                    <p className="font-bold text-rose-600">Username</p>
                    <p>description</p>
                  </div>
                  <p className="text-xs">{date}</p>
                </div>
              </div>
              <div className="invisible flex flex-col gap-1 group-hover:visible">
                <Link href="">
                  <RiDeleteBinFill className="h-6 w-6 fill-rose-600 hover:fill-red-600" />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </section>
      <form className="sticky bottom-0 flex h-12 rounded-b-lg  bg-neutral-900 px-4 py-2"></form>
    </section>
  );
}
