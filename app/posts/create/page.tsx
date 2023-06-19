"use client";

import { RiCloseCircleFill, RiChat3Line } from "react-icons/ri";
import Link from "next/link";

export default async function CreatePage() {
  return (
    <main className="ml-2 flex h-screen w-full min-w-[32rem] flex-col overflow-auto rounded-lg bg-neutral-800">
      <header className="sticky top-0 flex h-12 w-full items-center justify-between gap-2 rounded-t-lg bg-neutral-900 px-4 py-2">
        <div className="flex gap-4 overflow-hidden">
          <RiChat3Line className="h-6 w-6 shrink-0 -rotate-90" />
          <h3 className="truncate font-vt323 text-lg font-bold">
            Create new post
          </h3>
        </div>
        <Link href="/posts">
          <RiCloseCircleFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
        </Link>
      </header>
      <section className="flex h-full flex-col overflow-x-hidden overflow-y-scroll p-4">
        <form className="flex w-full flex-col gap-4 rounded-md bg-neutral-700 p-4">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="bg-inherit text-3xl outline-none"
            />
            <p className="text-xs text-rose-600">Please enter post title </p>
          </div>
          <div className=" h-1 w-full rounded-lg bg-gradient-to-l from-amber-200  via-neutral-600 to-neutral-700" />
          <div className="flex flex-col gap-1">
            <textarea
              name="description"
              rows={10}
              placeholder="Enter a description"
              className="resize-none bg-inherit outline-none"
            ></textarea>
            <p className="text-xs text-rose-600">
              Please enter post description{" "}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="link"
              placeholder="Media url"
              className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            />
            <p className="px-2 text-xs text-teal-400">Link is okay!</p>
          </div>
          <button className="flex h-12 w-1/4 items-center justify-center gap-1 self-end rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black">
            Post
          </button>
        </form>
      </section>
    </main>
  );
}
