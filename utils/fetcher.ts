export default async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }
  return res.json();
}

// import useSWR from "swr";
// import fetcher from "@/utils/fetcher";

// function getData() {
//   const { data, error, isLoading } = useSWR(
//     "http://localhost:3000/api/...",
//     fetcher
//   );

//   if (error) return "failed to load";
//   if (isLoading) return "loading...";

//   return data;
// }
