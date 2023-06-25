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
}
