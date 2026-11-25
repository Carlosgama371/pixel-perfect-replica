export type EpisodeSource = { kind: "mp3"; url: string } | { kind: "spotify"; url: string };

// Supply an MP3 URL or the public Spotify episode URL when the recording is ready.
export const episode: { source: EpisodeSource | null; transcript: string | null } = {
  source: null,
  transcript: null,
};

export function validEpisodeSource(source: EpisodeSource | null): EpisodeSource | null {
  if (!source) return null;
  try {
    const url = new URL(source.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (source.kind === "mp3" && /\.mp3$/i.test(url.pathname)) return source;
    if (source.kind === "spotify" && url.protocol === "https:" && url.hostname === "open.spotify.com" && /^\/(embed\/)?episode\/[a-zA-Z0-9]+\/?$/.test(url.pathname)) {
      return { kind: "spotify", url: `https://open.spotify.com/embed/episode/${url.pathname.split("/").filter(Boolean).at(-1)}` };
    }
  } catch { return null; }
  return null;
}