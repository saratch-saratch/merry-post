"use client";

import { RiDeleteBinFill } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";

export default function PostDeleteButton() {
  const { postId } = useParams();
  const router = useRouter();
  return (
    <RiDeleteBinFill
      onClick={async () => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        router.push("/posts");
      }}
      className="h-6 w-6 fill-rose-400 hover:cursor-pointer hover:fill-rose-600"
    />
  );
}
