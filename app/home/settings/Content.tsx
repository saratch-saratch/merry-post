"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { mutateFeed } from "@/app/home/Feed";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { signOut } from "next-auth/react";

export default function Content() {
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    mutate: mutateUser,
  } = useSWR("/api/users/user", fetcher);
  const {
    data: jobs,
    error: jobsError,
    isLoading: jobsLoading,
  } = useSWR("/api/jobs", fetcher);
  const router = useRouter();
  const [editedUser, setEditedUser] = useState({
    displayName: "",
    jobId: NaN,
    email: "",
    newPassword: "",
    password: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setEditedUser((editedUser) => ({
      ...editedUser,
      [name]: value,
    }));
  };

  const validateUser = () => {
    let isValid = true;

    const validatedUserError = {
      displayName: editedUser.displayName.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(editedUser.email),
      password: editedUser.password.trim() === "",
    };

    for (const key in validatedUserError) {
      if (validatedUserError[key as keyof typeof validatedUserError]) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateUser()) {
      setSubmitStatus("validationError");
      return;
    }

    try {
      console.log(editedUser);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users/user",
        {
          method: "PUT",
          body: JSON.stringify(editedUser),
        }
      );

      setEditedUser((editedUser) => ({
        ...editedUser,
        password: "",
        newPassword: "",
      }));

      if (response.ok) {
        setSubmitStatus("ok");
        mutateUser();
        mutateFeed();
      } else {
        setSubmitStatus("submitError");
      }
    } catch (error) {
      setSubmitStatus("submitError");
    }
  };

  useEffect(() => {
    if (user) {
      setEditedUser((editedUser) => ({
        ...editedUser,
        displayName: user.displayName,
        jobId: user.jobId,
        email: user.email,
      }));
    }
  }, [user]);

  if (userError || jobsError || userLoading || jobsLoading) return null;

  return (
    <section className="flex h-full flex-col gap-4 overflow-x-hidden overflow-y-scroll p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 style={{ color: user.color }} className="text-3xl">
            {user.displayName}
          </h2>
          <p>{user.username}</p>
        </div>
        <div
          style={{ backgroundColor: user.color }}
          className="h-16 w-16 flex-shrink-0 rounded-full"
        />
      </div>
      <div className=" h-1 w-full rounded-lg bg-gradient-to-l from-amber-200  via-neutral-700 to-neutral-800" />
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
        className="flex w-full justify-between gap-4 rounded-md bg-neutral-700 p-4"
      >
        <div className="flex w-1/2 flex-col gap-4">
          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={editedUser.displayName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={editedUser.email}
            onChange={handleChange}
          />
          <select
            name="jobId"
            onChange={handleChange}
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
          >
            {jobs && <option value={user.jobId}>{user.jobName}</option>}
            {jobs
              .filter((job: { id: number }) => job.id !== user.jobId)
              .map((job: { id: number; jobName: string }) => (
                <option key={job.id} value={job.id}>
                  {job.jobName}
                </option>
              ))}
          </select>
          <input
            type="password"
            name="newPassword"
            placeholder="New password (optional)"
            className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
            value={editedUser.newPassword}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <p className="text-xs">Please enter your current password</p>
            <input
              type="password"
              name="password"
              placeholder="Current password"
              className="rounded-md bg-inherit bg-neutral-800 p-2 outline-none"
              value={editedUser.password}
              onChange={handleChange}
            />
            {submitStatus === "ok" && (
              <p className="text-xs text-teal-300">{"(｢• ω •)｢ Done!"}</p>
            )}
            {submitStatus === "validationError" && (
              <p className="text-xs text-red-500">
                {"(┛◉Д◉)┛彡 Please fill out all fields"}
              </p>
            )}
            {submitStatus === "submitError" && (
              <p className="text-xs text-red-500">
                {"(┛◉Д◉)┛彡 Something went wrong, please try again"}
              </p>
            )}
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col justify-between">
          <button
            type="button"
            onClick={async () => {
              await signOut({ callbackUrl: "/" });
            }}
            className="flex h-12 w-3/4 items-center justify-center gap-1 self-end rounded-3xl bg-neutral-600 font-semibold text-white hover:bg-neutral-500 hover:text-black"
          >
            Sign out
          </button>
          <button
            type="submit"
            className="flex h-12 w-3/4 items-center justify-center gap-1 self-end rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
