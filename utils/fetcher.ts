export default async function fetcher(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
}

// import useSWR from "swr"
// import fetcher from "@/utils/fetcher"

// function Profile () {
//   const { data, error, isLoading } = useSWR("url", fetcher)

//   if (error) return <div>component</div>
//   if (isLoading) return <div>component</div>

//   return <div>{data}</div>
// }
