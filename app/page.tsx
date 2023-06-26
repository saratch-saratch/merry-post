"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading" || status === "unauthenticated") {
      router.push("/signin");
    }

    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);

  return (
    <main className="flex h-screen min-w-[32rem] flex-col justify-center bg-stone-50">
      <div className="h-16 w-full bg-gradient-to-b from-stone-50 to-stone-300" />
      <div className="h-64 bg-neutral-400" />
      <div className="h-16 bg-gradient-to-t from-stone-50 to-stone-300" />
      <p className="absolute bottom-0 left-4 text-sm text-black">
        2023 Saratch Tanapongwonglert
      </p>
    </main>
  );
}
