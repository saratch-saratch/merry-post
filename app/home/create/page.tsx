"use client";

import { RiCloseCircleFill, RiChat3Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { mutate } from "@/app/home/Feed";

export default function CreatePage() {
  const router = useRouter();
  const [post, setPost] = useState({ title: "", description: "", link: "" });
  const [error, setError] = useState({ title: false, description: false });

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newPost = { ...post };
    let newError = { ...error };

    const validateNewPost = (newPost: {
      title: string;
      description: string;
      link: string;
    }) => {
      if (newPost.title === "") {
        newError.title = true;
      } else {
        newError.title = false;
      }

      if (newPost.description === "") {
        newError.description = true;
      } else {
        newError.description = false;
      }

      if (newPost.link !== "") {
        try {
          const url = new URL(newPost.link);
          if (url.hostname !== "www.youtube.com") {
            newPost.link = "";
          }
        } catch (error) {
          newPost.link = "";
        }
      }
    };

    validateNewPost(newPost);
    setError(newError);
    setPost(newPost);
    if (!newError.title && !newError.description) {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        } else {
          mutate();
          router.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="ml-2 flex h-screen w-full min-w-[32rem] flex-col overflow-auto rounded-lg bg-neutral-800">
      <header className="sticky top-0 flex h-12 w-full shrink-0 items-center justify-between gap-2 rounded-t-lg bg-neutral-900 px-4 py-2">
        <div className="flex gap-4 overflow-hidden">
          <RiChat3Line className="h-6 w-6 shrink-0 -rotate-90" />
          <h3 className="truncate font-vt323 text-lg font-bold">
            Create new post
          </h3>
        </div>
        <button onClick={() => router.push("/home")}>
          <RiCloseCircleFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
        </button>
      </header>
      <section className="flex h-full flex-col overflow-x-hidden overflow-y-scroll p-4">
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => handleCreate(event)}
          className="flex w-full flex-col gap-4 rounded-md bg-neutral-700 p-4"
        >
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="bg-inherit text-xl outline-none"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            {error.title && (
              <p className="text-xs text-rose-600">Please enter post title </p>
            )}
          </div>
          <div className=" h-1 w-full rounded-lg bg-gradient-to-l from-amber-200  via-neutral-600 to-neutral-700" />
          <div className="flex flex-col gap-1">
            <textarea
              name="description"
              rows={10}
              placeholder="Enter a description"
              className="resize-none bg-inherit outline-none"
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
            ></textarea>
            {error.description && (
              <p className="text-xs text-rose-600">
                Please enter post description{" "}
              </p>
            )}
          </div>
          <input
            type="text"
            name="link"
            placeholder="Media url"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={post.link}
            onChange={(e) => setPost({ ...post, link: e.target.value })}
          />
          <button className="flex h-12 w-1/4 items-center justify-center gap-1 self-end rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black">
            Post
          </button>
        </form>
      </section>
    </main>
  );
}
