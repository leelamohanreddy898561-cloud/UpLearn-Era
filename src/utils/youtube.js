// Small helpers for working with the channel's YouTube links.

// Extracts the 11-character video id from any YouTube URL form.
export function videoIdFrom(url = "") {
  return url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1] ?? "";
}

// YouTube's own thumbnail for a video. Not every upload has every size, so
// callers should step through the list below when an image fails to load.
export const THUMB_QUALITIES = ["maxresdefault", "sddefault", "hqdefault"];
export const thumbUrl = (id, quality = THUMB_QUALITIES[0]) =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

// The embed URL used inside the popup player.
export const embedUrl = (id) =>
  `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`;