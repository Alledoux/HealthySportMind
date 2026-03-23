import { API_BASE_URL } from "../config/api";

export async function fetchRSS(feedUrl) {
  const encoded = encodeURIComponent(feedUrl);

  const res = await fetch(
   `${API_BASE_URL}/api/rss/?url=${encoded}`
  );

  const data = await res.json();
  return data.items;
}