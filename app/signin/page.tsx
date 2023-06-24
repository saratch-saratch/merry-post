"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiSwordFill } from "react-icons/ri";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useSession, signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const { status } = useSession();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.username === "" || user.password === "") {
      setError("validation");
      return;
    }

    {
      const response = await signIn("credentials", {
        ...user,
        redirect: false,
      });
      if (response?.error) setError("submit");
      else router.push("/home");
    }
  };

  useEffect(() => {
    if (status === "authenticated") router.push("/home");
  }, [status]);

  return (
    <>
      {status === "unauthenticated" && (
        <section className="relative flex h-full flex-col items-center justify-between p-4 text-neutral-900">
          <div className="flex items-center gap-2">
            <h1 className="text-center font-vt323 text-3xl text-inherit">
              Merry Post
            </h1>
            <RiSwordFill className="h-7 w-7 fill-stone-50" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-4"
          >
            {error === "validation" && (
              <p className="text-sm text-rose-600">
                {"(┛◉Д◉)┛彡 Username and password are required"}
              </p>
            )}
            {error === "submit" && (
              <p className="text-sm text-rose-600">
                {"(┛◉Д◉)┛彡 Invalid username or password"}
              </p>
            )}
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-60 flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
              value={user.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="w-60 flex-shrink bg-stone-50 px-4 text-inherit outline-none"
            />
            <button className="w-fit hover:text-stone-50">
              {"(ﾉ≧∇≦)ﾉ ﾐ Sign in"}
            </button>
          </form>
          <Link
            href="/signin/signup"
            className="absolute bottom-4 right-4 text-stone-50 hover:text-amber-200"
          >
            {" ☆ﾟ°˖* ᕕ( ᐛ )ᕗ Sign up"}
          </Link>
        </section>
      )}
    </>
  );
}
