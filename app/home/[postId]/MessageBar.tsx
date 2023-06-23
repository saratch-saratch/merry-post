"use client";

import { FormEvent, useState } from "react";
import { mutate } from "./Comments";
import { useSession } from "next-auth/react";

export default function MessageBar({ postId }: { postId: string }) {
  const { status } = useSession();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "authenticated" && message !== "") {
      try {
        await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId + "/comments",
          {
            method: "POST",
            body: JSON.stringify({ message: message }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessage("");
        mutate();
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
        placeholder="Send a message in this post"
        className="w-full rounded-md bg-neutral-800 px-4 outline-none"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></input>
    </form>
  );
}
