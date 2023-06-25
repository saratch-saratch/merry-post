"use client";

import { FormEvent, useState } from "react";
import { useComments } from "@/utils/useComment";

export default function CommentBar({
  postId,
  status,
}: {
  postId: string;
  status: string;
}) {
  const [message, setMessage] = useState("");
  const { mutateComments } = useComments(postId);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "authenticated" && message !== "") {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId + "/comments",
          {
            method: "POST",
            body: JSON.stringify({ message: message }),
          }
        );
        setMessage("");
        if (!res.ok) return;
        mutateComments();
      } catch (error) {
        setMessage("");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 flex h-12 rounded-b-lg  bg-neutral-900 px-4 py-2"
    >
      <input
        type="text"
        name="message"
        placeholder="Send a comment in this post"
        className="w-full rounded-md bg-neutral-800 px-4 outline-none"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></input>
    </form>
  );
}
