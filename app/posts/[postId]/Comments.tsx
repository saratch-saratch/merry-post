"use client";

import { RiDeleteBinFill } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { FetchedComment } from "@/interfaces/fetchedComment";

export default function Comments() {
  const { postId } = useParams();
  const router = useRouter();
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR("/api/posts/" + postId + "/comments", fetcher);

  const deletePost = async (commentId: string) => {
    // try {
    //   const response = await fetch(
    //     process.env.NEXT_PUBLIC_API_URL + "/comments/" + commentId,
    //     { method: "DELETE" }
    //   );
    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.status}`);
    //   }
    //   router.refresh();
    // } catch (error) {
    //   console.error("An error occurred while deleting the comment:", error);
    // }
    console.log("Comment deleted");
  };

  if (error) return <div>{"(┛◉Д◉)┛彡┻━┻"}</div>;
  if (isLoading) return <div>{"♪☆＼(^０^＼) ♪(／^-^)／☆♪"}</div>;

  return (
    <section className="flex flex-col gap-4">
      {comments.map((comment: FetchedComment) => (
        <div
          key={comment.id}
          className="group flex w-full gap-2 rounded-md px-4 py-2 hover:bg-neutral-700"
        >
          <div className="flex w-full gap-4">
            <div
              style={{ backgroundColor: comment.color }}
              className="h-6 w-6 flex-shrink-0 rounded-full"
            ></div>
            <div className="flex w-full flex-col justify-between gap-2">
              <div>
                <p style={{ color: comment.color }} className="font-bold">
                  {comment.user}
                </p>
                <p>{comment.message}</p>
              </div>
              <p className="text-xs">{moment(comment.createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="invisible flex flex-col gap-1 group-hover:visible">
            <button onClick={() => deletePost(comment.id)}>
              <RiDeleteBinFill className="h-6 w-6 fill-rose-400 hover:fill-red-600" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
