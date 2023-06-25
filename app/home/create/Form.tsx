"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { useFeed } from "@/utils/useFeed";
import { useSession } from "next-auth/react";

export default function Form() {
  const router = useRouter();
  const { status } = useSession();
  const { mutateFeed } = useFeed();

  const [post, setPost] = useState({ title: "", description: "", url: "" });
  const [error, setError] = useState({
    title: false,
    description: false,
    url: false,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setPost((post) => ({ ...post, [name]: value }));
  };

  const validatePost = () => {
    let isValid = true;
    let isUrlValid = true;

    if (post.url !== "") {
      try {
        const url = new URL(post.url);
        if (url.hostname !== "www.youtube.com") {
          isUrlValid = false;
        }
      } catch (error) {
        isUrlValid = false;
      }
    }

    const validatedUserError = {
      title: post.title.trim() === "",
      description: post.description.trim() === "",
      url: !isUrlValid,
    };

    for (const key in validatedUserError) {
      if (validatedUserError[key as keyof typeof validatedUserError]) {
        isValid = false;
        break;
      }
    }

    setError(validatedUserError);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "unauthenticated" || !validatePost()) return;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      mutateFeed();
      router.push("/home");
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      {status === "authenticated" && (
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 rounded-md bg-neutral-700 p-4"
        >
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="bg-inherit text-xl outline-none"
              value={post.title}
              onChange={handleChange}
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
              onChange={handleChange}
            ></textarea>
            {error.description && (
              <p className="text-xs text-rose-600">
                Please enter post description
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="url"
              placeholder="Media url"
              className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
              value={post.url}
              onChange={handleChange}
            />
            {error.url && (
              <p className="text-xs text-rose-600">Invalid media url</p>
            )}
          </div>
          <button className="flex h-12 w-1/4 items-center justify-center gap-1 self-end rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black">
            Post
          </button>
        </form>
      )}
    </>
  );
}
