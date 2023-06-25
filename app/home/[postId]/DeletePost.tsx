"use client";

import { RiDeleteBinFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useFeed } from "@/utils/useFeed";

interface DeletePostProps {
  postId: string;
  isOwner: boolean;
  status: string;
}

export default function DeletePost({
  postId,
  isOwner,
  status,
}: DeletePostProps) {
  const router = useRouter();
  const { mutateFeed } = useFeed();

  const deletePost = async () => {
    try {
      if (status !== "authenticated" || !isOwner) return;

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId,
        { method: "DELETE" }
      );
      if (!response.ok) {
        return;
      }
      mutateFeed();
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
