"use client";

import { RiDeleteBinFill } from "react-icons/ri";
import moment from "moment";
import { useComments } from "@/utils/useComment";

interface CommentProps {
  id: string;
  user: string;
  userId: string;
  color: string;
  message: string;
  createdAt: string;
  isOwner: boolean;
}

export default function Comments({
  postId,
  status,
}: {
  postId: string;
  status: string;
}) {
  const { comments, isError, isLoading, mutateComments } = useComments(postId);

  const deletePost = async (commentId: string, isOwner: boolean) => {
    try {
      if (status !== "authenticated" || !isOwner) return;

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/comments/" + commentId,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      mutateComments();
    } catch (error) {
      return console.log(error);
    }
  };

  if (isError || isLoading) return null;

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
            />
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
          {comment.isOwner && (
            <div className="invisible flex flex-col gap-1 group-hover:visible">
              <button onClick={() => deletePost(comment.id, comment.isOwner)}>
                <RiDeleteBinFill className="h-6 w-6 fill-rose-400 hover:fill-red-600" />
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
