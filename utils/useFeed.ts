import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export function useFeed() {
  const { data, error, mutate } = useSWR("/api/posts", fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutateFeed: mutate,
  };
}
