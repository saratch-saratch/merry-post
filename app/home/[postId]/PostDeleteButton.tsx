"use client";

import { RiDeleteBinFill } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";

export default function PostDeleteButton() {
  const { postId } = useParams();
  const router = useRouter();

  const deletePost = async () => {
    // try {
    //   const response = await fetch(
    //     process.env.NEXT_PUBLIC_API_URL + "/posts/" + postId,
    //     { method: "DELETE" }
    //   );
    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.status}`);
    //   }
    //   router.push("/home");
    // } catch (error) {
    //   console.error("An error occurred while deleting the post:", error);
    // }
    console.log("Post deleted");
  };

  return (
    <button onClick={deletePost}>
      <RiDeleteBinFill className="h-6 w-6 fill-rose-400 hover:fill-rose-600" />
    </button>
  );
}
