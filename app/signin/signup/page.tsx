"use client";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SignUp() {
  const { data: jobs, error, isLoading } = useSWR("/api/jobs", fetcher);
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    displayName: "",
    jobId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userError, setUserError] = useState({
    username: false,
    displayName: false,
    jobId: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [submitStatus, setSubmitStatus] = useState("");
  const { status } = useSession();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const validateUser = () => {
    let isValid = true;

    const validatedUserError = {
      username: user.username.trim() === "",
      displayName: user.displayName.trim() === "",
      jobId: user.jobId === "",
      email: !/^\S+@\S+\.\S+$/.test(user.email),
      password: user.password.trim() === "",
      confirmPassword:
        user.password.trim() === "" || user.password !== user.confirmPassword,
    };

    for (const key in validatedUserError) {
      if (validatedUserError[key as keyof typeof validatedUserError]) {
        isValid = false;
        break;
      }
    }

    setUserError(validatedUserError);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateUser()) return;

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSubmitStatus("ok");
        setTimeout(() => router.push("/signin"), 2000);
      } else setSubmitStatus("error");
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  useEffect(() => {
    if (status === "authenticated") router.push("/home");
  }, [status]);

  if (error || isLoading) return null;
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
                  value={user.username}
                  onChange={handleChange}
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
                  value={user.email}
                  onChange={handleChange}
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
                  value={user.displayName}
                  onChange={handleChange}
                  className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                />
                {userError.displayName && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
              <div className="flex w-60 items-center gap-2">
                <select
                  name="jobId"
                  onChange={handleChange}
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
                  value={user.password}
                  onChange={handleChange}
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
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
                />
                {userError.confirmPassword && (
                  <p className="flex-grow text-rose-600">X</p>
                )}
              </div>
            </div>

            <button className="w-fit hover:text-stone-50">
              {"(ﾉ≧∇≦)ﾉ ﾐ Sign up"}
            </button>
            {submitStatus === "ok" && (
              <p className="absolute bottom-4 right-4 text-teal-300">
                {"(｢• ω •)｢ Done!"}
              </p>
            )}
            {submitStatus === "error" && (
              <p className="absolute bottom-4 right-4 text-rose-600">
                {"(┛◉Д◉)┛彡 Error!"}
              </p>
            )}
          </form>
          <Link
            href="/signin"
            className="absolute bottom-4 left-4 text-stone-50 hover:text-amber-200"
          >
            {" ヽ(。_°)ノ Cancel"}
          </Link>
        </section>
      )}
    </>
  );
}
