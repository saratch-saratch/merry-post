"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { RiSwordFill } from "react-icons/ri";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/posts");
  };

  return (
    <section className="relative flex h-full flex-col items-center justify-between gap-4 p-4 text-neutral-900">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-center font-vt323 text-3xl text-inherit">
            Merry Post
          </h1>
          <RiSwordFill className="h-7 w-7 fill-stone-50" />
        </div>
        <p className="text-sm text-inherit">
          Final Fantasy XIV Free Company's Dynamic Forum
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
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
            type="password"
            placeholder="Password"
            className="w-full flex-shrink bg-stone-50 px-4 text-inherit outline-none"
          />
          <p style={{ display: "" }} className="flex-grow text-rose-600">
            X
          </p>
        </div>
        <button className="w-fit hover:text-stone-50">
          {"(ﾉ≧∇≦)ﾉ ﾐ Sign in"}
        </button>
      </form>
      <Link
        href="/login/register"
        className="absolute bottom-4 right-4 text-stone-50 hover:text-amber-200"
      >
        {" ☆ﾟ°˖* ᕕ( ᐛ )ᕗ Sign up"}
      </Link>
    </section>
  );
}
