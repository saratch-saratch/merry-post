"use client";

import { RiDeleteBinFill } from "react-icons/ri";
import moment from "moment";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

interface CommentProps {
  id: string;
  user: string;
  userId: string;
  color: string;
  message: string;
  createdAt: string;
}

interface PostProps {
  postId: string;
  userId: string;
}

export default function Comments({ postId, userId }: PostProps) {
  const {
    data: comments,
    error,
    isLoading,
    mutate: mutateComments,
  } = useSWR("/api/posts/" + postId + "/comments", fetcher);

  const deletePost = async (commentId: string, commentUserId: string) => {
    if (userId !== commentUserId) return;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/comments/" + commentId,
        { method: "DELETE" }
      );
      if (!response.ok) {
        return;
      }
      mutateComments();
    } catch (error) {
      return;
    }
  };

  if (error || isLoading) return null;

  return (
    <section className="flex flex-col gap-4">
      {comments.map((comment: CommentProps) => (
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
          {userId === comment.userId && (
            <div className="invisible flex flex-col gap-1 group-hover:visible">
              <button onClick={() => deletePost(comment.id, comment.userId)}>
                <RiDeleteBinFill className="h-6 w-6 fill-rose-400 hover:fill-red-600" />
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
