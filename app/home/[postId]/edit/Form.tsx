"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useFeed } from "@/utils/useFeed";
import { usePost } from "@/utils/usePost";
import { useSession } from "next-auth/react";

export default function Form({ postId }: { postId: string }) {
  const { post, isError, isLoading, mutatePost } = usePost(postId);
  const { mutateFeed } = useFeed();
  const { status } = useSession();
  const router = useRouter();

  const [editedPost, setEditedPost] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [editedError, setEditedError] = useState({
    title: false,
    description: false,
    url: false,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEditedPost((post) => ({ ...post, [name]: value }));
  };

  const validatePost = () => {
    let isValid = true;
    let isUrlValid = true;

    if (editedPost.url !== "") {
      try {
        const url = new URL(editedPost.url);
        if (url.hostname !== "www.youtube.com") {
          isUrlValid = false;
        }
      } catch (error) {
        isUrlValid = false;
      }
    }

    const validatedUserError = {
      title: editedPost.title.trim() === "",
      description: editedPost.description.trim() === "",
      url: !isUrlValid,
    };

    for (const key in validatedUserError) {
      if (validatedUserError[key as keyof typeof validatedUserError]) {
        isValid = false;
        break;
      }
    }

    setEditedError(validatedUserError);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "unauthenticated" || !post.isOwner || !validatePost())
      return;

    try {
      const res = await fetch("/api/posts/" + postId, {
        method: "PUT",
        body: JSON.stringify(editedPost),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      mutateFeed();
      mutatePost();
      router.push("/home/" + postId);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    if (post) {
      if (!post.isOwner) {
        router.push("/home");
      }

      setEditedPost({
        title: post.title,
        description: post.description,
        url: post.url,
      });
    }
  }, [post]);

  if (isError || isLoading) return null;

  return (
    <>
      {status === "authenticated" && post.isOwner && (
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
            {editedError.title && (
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
            />
            {editedError.description && (
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
              value={editedPost.url}
              onChange={handleChange}
            />
            {editedError.url && (
              <p className="text-xs text-rose-600">Invalid media url</p>
            )}
          </div>
          <button className="flex h-12 w-1/4 items-center justify-center gap-1 self-end rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black">
            Edit
          </button>
        </form>
      )}
    </>
  );
}
