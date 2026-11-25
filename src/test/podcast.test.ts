import { describe, expect, it } from "vitest";
import { validEpisodeSource } from "@/lib/podcast";

describe("Podcast source availability", () => {
  it("keeps playback unavailable without audio", () => {
    expect(validEpisodeSource(null)).toBeNull();
  });
  it("accepts an MP3 and rejects invalid or unsafe audio sources", () => {
    expect(validEpisodeSource({ kind: "mp3", url: "https://example.com/episode.mp3" })).toEqual({ kind: "mp3", url: "https://example.com/episode.mp3" });
    expect(validEpisodeSource({ kind: "mp3", url: "javascript:alert(1)" })).toBeNull();
    expect(validEpisodeSource({ kind: "mp3", url: "https://example.com/page" })).toBeNull();
  });
  it("embeds only valid Spotify episodes", () => {
    expect(validEpisodeSource({ kind: "spotify", url: "https://open.spotify.com/episode/abc123" })?.url).toBe("https://open.spotify.com/embed/episode/abc123");
    expect(validEpisodeSource({ kind: "spotify", url: "https://example.com/episode/abc123" })).toBeNull();
  });
});