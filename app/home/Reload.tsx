"use client";

import { RiRestartFill } from "react-icons/ri";
import { mutate } from "./Feed";

export default function Reload() {
  return (
    <button onClick={() => mutate()}>
      <RiRestartFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
    </button>
  );
}
