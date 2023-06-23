"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiSwordFill } from "react-icons/ri";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState({ login: false, input: false });
  const { status } = useSession();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validationError = false;

    if (user.username === "" || user.password === "") {
      validationError = true;
      setError({ login: false, input: true });
    }

    if (!validationError) {
      const result = await signIn("credentials", {
        username: user.username,
        password: user.password,
        callbackUrl: "/home",
      });

      if (result?.error) {
        setError({ login: true, input: false });
        return;
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
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
            onSubmit={handleLogin}
            className="flex w-60 flex-col items-center gap-4"
          >
            {error.input && (
              <p className="text-sm text-rose-600">
                Username and password are required{" "}
              </p>
            )}
            {error.login && (
              <p className="text-sm text-rose-600">
                Invalid username or password
              </p>
            )}
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full flex-shrink bg-stone-50 px-4 text-neutral-900 outline-none"
              value={user.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="w-full flex-shrink bg-stone-50 px-4 text-inherit outline-none"
            />
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
      )}
    </>
  );
}
