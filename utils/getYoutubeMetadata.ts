export default async function getYoutubeMetadata(urls: string[]) {
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
      console.error("(┛◉Д◉)┛彡┻━┻ ", url);
      thumbnailUrls[url] = "";
    }
  }
  return thumbnailUrls;
}
