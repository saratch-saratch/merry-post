"use client";

import { RiDeleteBinFill } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import { mutate } from "../Feed";

interface DeletePostProps {
  userId: string;
  postUserId: string;
}

export default function DeletePost({ userId, postUserId }: DeletePostProps) {
  const { postId } = useParams();
  const router = useRouter();

  const deletePost = async () => {
    if (userId !== postUserId) return;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId,
        { method: "DELETE" }
      );
      if (!response.ok) {
        return;
      }
      mutate();
      router.push("/home");
    } catch (error) {
      return;
    }
  };

  return (
    <button onClick={deletePost}>
      <RiDeleteBinFill className="h-6 w-6 fill-rose-400 hover:fill-rose-600" />
    </button>
  );
}
