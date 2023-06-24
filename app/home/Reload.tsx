"use client";

import { RiRestartFill } from "react-icons/ri";
import { useFeed } from "@/utils/useFeed";

export default function Reload() {
  const { mutateFeed } = useFeed();

  return (
    <button onClick={() => mutateFeed()}>
      <RiRestartFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
    </button>
  );
}
