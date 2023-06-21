import { YoutubeMeta } from "@/types/youtubeMeta";

export default async function getYoutubeMeta(url: string) {
  try {
    const res = await fetch("https://youtube.com/oembed?url=" + url);
    const data = await res.json();
    const youtubeMeta: YoutubeMeta = {
      provider: data.provider_name,
      title: data.title,
      author: data.author_name,
      thumbnail: data.thumbnail_url,
    };
    return youtubeMeta;
  } catch (error) {
    console.error("(┛◉Д◉)┛彡┻━┻ ", url);
  }
}
