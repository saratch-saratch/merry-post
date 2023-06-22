"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { mutate } from "@/components/Home/Feed";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function Content() {
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR("/api/users/me", fetcher);
  const {
    data: jobs,
    error: jobsError,
    isLoading: jobsLoading,
  } = useSWR("/api/jobs", fetcher);

  const router = useRouter();
  const [post, setPost] = useState({ title: "", description: "", link: "" });
  const [inputError, setInputError] = useState({
    title: false,
    description: false,
  });

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newPost = { ...post };
    let newError = { ...userError };

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
        } catch (userError) {
          newPost.link = "";
        }
      }
    };

    validateNewPost(newPost);
    setInputError(newError);
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
          const userErrorData = await response.json();
          console.log(userErrorData);
        } else {
          mutate();
          router.push("/home");
        }
      } catch (userError) {
        console.log(userError);
      }
    }
  };

  if (userError || jobsError || userLoading || jobsLoading) return <></>;

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 style={{ color: user.job.color }} className="text-3xl">
            {user.displayName}
          </h2>
          <p>{user.username}</p>
        </div>
        <div
          style={{ backgroundColor: user.job.color }}
          className="h-16 w-16 flex-shrink-0 rounded-full"
        />
      </div>
      <div className=" h-1 w-full rounded-lg bg-gradient-to-l from-amber-200  via-neutral-700 to-neutral-800" />
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleCreate(event)}
        className="flex w-full justify-between gap-4 rounded-md bg-neutral-700 p-4"
      >
        <div className="flex w-1/2 flex-col gap-4">
          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={post.link}
            onChange={(e) => setPost({ ...post, link: e.target.value })}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={post.link}
            onChange={(e) => setPost({ ...post, link: e.target.value })}
          />
          {/* will be its own component */}
          <select
            name="jobId"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
          >
            <option value={user.jobId}>{user.job.jobName}</option>
            {jobs
              .filter((job: { id: number }) => job.id !== user.jobId)
              .map((job: { id: number; jobName: string }) => (
                <option key={job.id} value={job.id}>
                  {job.jobName}
                </option>
              ))}
          </select>
          <input
            type="text"
            name="newPassword"
            placeholder="New password"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={post.link}
            onChange={(e) => setPost({ ...post, link: e.target.value })}
          />
          <p className="text-xs">Please enter your current password</p>
          <input
            type="text"
            name="password"
            placeholder="Current password"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={post.link}
            onChange={(e) => setPost({ ...post, link: e.target.value })}
          />
        </div>
        <div className="flex h-full w-1/2 flex-col justify-end gap-4">
          <button className="flex h-12 w-3/4 items-center justify-center gap-1 self-end rounded-3xl bg-neutral-600 font-semibold text-white hover:bg-neutral-500 hover:text-black">
            Log out
          </button>
          <button
            type="submit"
            className="flex h-12 w-3/4 items-center justify-center gap-1 self-end rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
