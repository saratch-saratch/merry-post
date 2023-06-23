"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { mutate } from "@/app/home/Feed";
import { useSession } from "next-auth/react";

export default function Form() {
  const router = useRouter();
  const { status } = useSession();
  const [post, setPost] = useState({ title: "", description: "", link: "" });
  const [error, setError] = useState({
    title: false,
    description: false,
    link: false,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setPost((post) => ({ ...post, [name]: value }));
  };

  const validatePost = (
    newPost: {
      title: string;
      description: string;
      link: string;
    },
    newError: {
      title: boolean;
      description: boolean;
      link: boolean;
    }
  ) => {
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
          newError.link = true;
        } else {
          newError.link = false;
        }
      } catch (error) {
        newError.link = true;
      }
    }
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newPost = { ...post };
    let newError = { ...error };

    validatePost(newPost, newError);
    setError(newError);
    setPost(newPost);

    if (
      status === "authenticated" &&
      !newError.title &&
      !newError.description
    ) {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: {
            "Content-Type": "application/json",
          },
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
    <form
      onSubmit={handleCreate}
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
          <p className="text-xs text-rose-600">Please enter post description</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="link"
          placeholder="Media url"
          className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
          value={post.link}
          onChange={handleChange}
        />
        {error.link && (
          <p className="text-xs text-rose-600">Invalid media url</p>
        )}
      </div>
      <button className="flex h-12 w-1/4 items-center justify-center gap-1 self-end rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black">
        Post
      </button>
    </form>
  );
}
