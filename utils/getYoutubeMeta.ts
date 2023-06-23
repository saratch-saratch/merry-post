import { YoutubeMeta } from "@/types/youtubeMeta";

export async function getYoutubeMeta(url: string) {
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
    return null;
  }
}

export async function getYoutubeThumbnails(urls: string[]) {
  const thumbnailUrls: Record<string, string> = {};
  for (const url of urls) {
    try {
      if (url.length > 0) {
        const res = await fetch("https://youtube.com/oembed?url=" + url);
        const metadata = await res.json();
        const thumbnail = metadata.thumbnail_url;
        thumbnailUrls[url] = thumbnail;
      }
    } catch (error) {
      thumbnailUrls[url] = "";
    }
  }
  return thumbnailUrls;
}
