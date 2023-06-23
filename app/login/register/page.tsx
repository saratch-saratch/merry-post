"use client";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Register() {
  const { data: jobs, error, isLoading } = useSWR("/api/jobs", fetcher);
  const router = useRouter();
  const [userError, setUserError] = useState({
    username: false,
    displayName: false,
    jobId: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [userSubmit, setUserSubmit] = useState(false);
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = {
      username: event.currentTarget.username.value,
      displayName: event.currentTarget.displayName.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      confirmPassword: event.currentTarget.confirmPassword.value,
      jobId: event.currentTarget.jobId.value,
    };

    //validation
    const userErrorUpdates: { [key: string]: boolean } = {};
    Object.entries(newUser).forEach(([key, value]) => {
      if (value.length === 0) {
        userErrorUpdates[key] = true;
      } else {
        userErrorUpdates[key] = false;
      }
    });

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(newUser.email)) {
      userErrorUpdates.email = true;
    } else userErrorUpdates.email = false;

    if (
      newUser.password !== newUser.confirmPassword ||
      newUser.password === ""
    ) {
      userErrorUpdates.password = true;
      userErrorUpdates.confirmPassword = true;
    } else {
      userErrorUpdates.password = false;
      userErrorUpdates.confirmPassword = false;
    }

    //still need to check if username is taken

    setUserError((prevUserError) => ({
      ...prevUserError,
      ...userErrorUpdates,
    }));
    if (Object.values(userErrorUpdates).some((value) => value === true)) {
      return;
    }

    //send POST request to create new user
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: newUser.username,
            displayName: newUser.displayName,
            email: newUser.email,
            password: newUser.password,
            jobId: newUser.jobId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
      } else {
        setUserSubmit(true);
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (error || isLoading) return <></>;
  return (
    <>
      {status === "unauthenticated" && (
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
                  name="username"
                  className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                />
                {userError.username && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
              <div className="flex w-60 items-center gap-2">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                />
                {userError.email && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
            </div>

            {/* display name and job */}
            <div className="flex gap-4">
              <div className="flex w-60 items-center gap-2">
                <input
                  type="text"
                  placeholder="Display name"
                  name="displayName"
                  className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                />
                {userError.displayName && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
              <div className="flex w-60 items-center gap-2">
                <select
                  name="jobId"
                  className="h-6 w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                >
                  <option value="">Choose your job</option>
                  {jobs?.map((job: { id: number; jobName: string }) => (
                    <option key={job.id} value={job.id}>
                      {job.jobName}
                    </option>
                  ))}
                </select>
                {userError.jobId && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
            </div>

            {/* password */}
            <div className="flex gap-4">
              <div className="flex w-60 items-center gap-2">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                />
                {userError.password && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
              <div className="flex w-60 items-center gap-2">
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                />
                {userError.confirmPassword && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
            </div>

            {/* submit button */}
            <button className="w-fit hover:text-stone-50">
              {"(ﾉ≧∇≦)ﾉ ﾐ Sign up"}
            </button>

            {/* completion message */}
            {userSubmit && (
              <p className="absolute bottom-4 right-4 text-teal-300">
                {"(｢• ω •)｢ Done!"}
              </p>
            )}
          </form>
          <Link
            href="/login"
            className="absolute bottom-4 left-4 text-stone-50 hover:text-amber-200"
          >
            {" ヽ(。_°)ノ Cancel"}
          </Link>
        </section>
      )}
    </>
  );
}
