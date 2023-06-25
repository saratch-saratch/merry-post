import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export function usePost(postId: string) {
  const { data, error, mutate } = useSWR("/api/posts/" + postId, fetcher);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
    mutatePost: mutate,
  };
}
