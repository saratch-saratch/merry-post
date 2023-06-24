import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export function useComments(postId: string) {
  const { data, error, mutate } = useSWR(
    "/api/posts/" + postId + "/comments",
    fetcher
  );

  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
