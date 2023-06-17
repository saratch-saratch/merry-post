"use client";

import { RiRestartFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default async function ReloadButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.refresh();
      }}
    >
      <RiRestartFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
    </button>
  );
}
