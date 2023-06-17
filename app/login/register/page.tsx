"use client";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Job } from "@prisma/client";

export default function Login() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/jobs",
    fetcher
  );

  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (data) {
      setJobs(data);
    }
  }, [data]);

  if (error) return <div>{"(┛◉Д◉)┛彡┻━┻"}</div>;
  if (isLoading) return <div>{"♪☆＼(^０^＼) ♪(／^-^)／☆♪"}</div>;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //sign up completed!
    //go back to login page
    router.push("/login");
  };

  return (
    <section className="relative h-full p-4 text-neutral-900">
      <form
        onSubmit={handleSubmit}
        className="flex h-full flex-col items-center justify-between"
      >
        {/* username and email */}
        <div className="flex gap-4">
          <div className="flex w-60 items-center gap-2">
            <input
              type="text"
              placeholder="Username"
              className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
            />
            <p style={{ display: "none" }} className="flex-grow text-rose-600">
              X
            </p>
          </div>
          <div className="flex w-60 items-center gap-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
            />
            <p style={{ display: "none" }} className="flex-grow text-rose-600">
              X
            </p>
          </div>
        </div>

        {/* display name and job */}
        <div className="flex gap-4">
          <div className="flex w-60 items-center gap-2">
            <input
              type="text"
              placeholder="Display name"
              className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
            />
            <p style={{ display: "none" }} className="flex-grow text-rose-600">
              X
            </p>
          </div>
          <div className="flex w-60 items-center gap-2">
            <select className="h-6 w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none">
              <option value="">Choose your job</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.jobName}
                </option>
              ))}
            </select>
            <p style={{ display: "none" }} className="flex-grow text-rose-600">
              X
            </p>
          </div>
        </div>

        {/* password */}
        <div className="flex gap-4">
          <div className="flex w-60 items-center gap-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
            />
            <p style={{ display: "" }} className="flex-grow text-rose-600">
              X
            </p>
          </div>
          <div className="flex w-60 items-center gap-2">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
            />
            <p style={{ display: "" }} className="flex-grow text-rose-600">
              X
            </p>
          </div>
        </div>

        {/* submit button */}
        <button className="w-fit hover:text-stone-50">
          {"(ﾉ≧∇≦)ﾉ ﾐ Sign up"}
        </button>

        {/* completion message */}
        <p
          style={{ display: "" }}
          className="absolute bottom-4 right-4 text-teal-300"
        >
          {"(｢• ω •)｢ Done!"}
        </p>
      </form>
      <Link
        href="/login"
        className="absolute bottom-4 left-4 text-stone-50 hover:text-amber-200"
      >
        {" ヽ(。_°)ノ Cancel"}
      </Link>
    </section>
  );
}
