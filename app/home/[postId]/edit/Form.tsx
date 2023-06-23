"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { mutateFeed } from "@/app/home/Feed";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";

export default function Form({ postId }: { postId: string }) {
  const {
    data: post,
    error,
    isLoading,
  } = useSWR("/api/posts/" + postId, fetcher);

  const { data: session } = useSession();
  const userId = session?.user.id;

  const router = useRouter();
  const [editedPost, setEditedPost] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [postError, setPostError] = useState({
    title: false,
    description: false,
    link: false,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEditedPost((post) => ({ ...post, [name]: value }));
  };

  const validatePost = (
    newEditedPost: {
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
    if (newEditedPost.title === "") {
      newError.title = true;
    } else {
      newError.title = false;
    }

    if (newEditedPost.description === "") {
      newError.description = true;
    } else {
      newError.description = false;
    }

    if (newEditedPost.link !== "") {
      try {
        const url = new URL(post.link);
        if (url.hostname !== "www.youtube.com") {
          newEditedPost.link = "";
        }
      } catch (error) {
        newEditedPost.link = "";
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newEditedPost = { ...editedPost };
    let newError = { ...postError };

    validatePost(newEditedPost, newError);
    setPostError(newError);
    setEditedPost(newEditedPost);
    if (
      userId === post.userId &&
      !newError.title &&
      !newError.description &&
      !newError.link
    ) {
      try {
        const response = await fetch("/api/posts/" + postId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEditedPost),
        });
        if (!response.ok) {
          return;
        } else {
          mutateFeed();
          router.push("/home/" + postId);
        }
      } catch (error) {
        return;
      }
    }
  };

  useEffect(() => {
    if (post) {
      if (userId !== post.userId) {
        router.push("/home");
      }

      setEditedPost({
        title: post.title,
        description: post.description,
        link: post.link,
      });
    }
  }, [post]);

  if (error || isLoading) return null;

  return (
    <>
      {userId === post.userId && (
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
              value={editedPost.title}
              onChange={handleChange}
            />
            {postError.title && (
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
              value={editedPost.description}
              onChange={handleChange}
            ></textarea>
            {postError.description && (
              <p className="text-xs text-rose-600">
                Please enter post description
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="link"
              placeholder="Media url"
              className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
              value={editedPost.link}
              onChange={handleChange}
            />
            {postError.link && (
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
