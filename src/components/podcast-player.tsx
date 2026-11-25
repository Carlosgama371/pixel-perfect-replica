import { useRef, useState } from "react";
import { Headphones, Pause, Play, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { episode, validEpisodeSource } from "@/lib/podcast";

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export function PodcastPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [failed, setFailed] = useState(false);
  const source = validEpisodeSource(episode.source);
  const available = source?.kind === "mp3" && !failed;

  return <div className="player-shell">
    {source?.kind === "spotify" && episode.source ? <>
      <iframe title={`${episode.title} · ${episode.show} en Spotify`} src={source.url} width="100%" height="152" allow="encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-md border-0" />
      <a className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4" href={episode.source.url}>Abrir en Spotify</a>
    </> : <>
      {available && <audio ref={audio} src={source.url} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} onTimeUpdate={() => setTime(audio.current?.currentTime ?? 0)} onLoadedMetadata={() => setDuration(Number.isFinite(audio.current?.duration) ? audio.current?.duration ?? 0 : 0)} />}
      {!available && <p className="mb-4 flex items-center gap-2 text-sm text-dark-muted"><Headphones size={16} />Episodio disponible próximamente</p>}
      <div className="flex items-center gap-4">
        <Button variant="campaign" size="icon" className="h-11 w-11 shrink-0 rounded-full" disabled={!available} aria-label={playing ? "Pausar episodio" : "Reproducir episodio"} onClick={() => { const element = audio.current; if (!element) return; if (playing) element.pause(); else void element.play().catch(() => setFailed(true)); }}>{playing ? <Pause /> : <Play />}</Button>
        <div className="flex-1"><input aria-label="Progreso del episodio" type="range" className="audio-slider" min="0" max={duration || 1} value={time} disabled={!available || !duration} onChange={e => { if (audio.current) audio.current.currentTime = Number(e.target.value); setTime(Number(e.target.value)); }} /><div className="mt-1 flex justify-between text-[10px] text-dark-muted"><span>{clock(time)}</span><span>{clock(duration)}</span></div></div>
        <Button variant="darkGhost" size="icon" title="Avanzar 15 segundos" aria-label="Avanzar 15 segundos" disabled={!available || !duration} onClick={() => { if (audio.current) audio.current.currentTime = Math.min(duration, time + 15); }}><SkipForward /></Button>
        <Volume2 size={16} className="hidden sm:block" /><input aria-label="Volumen" type="range" min="0" max="1" step="0.01" value={volume} disabled={!available} className="audio-slider max-w-16" onChange={e => { const next = Number(e.target.value); setVolume(next); if (audio.current) audio.current.volume = next; }} />
      </div>
    </>}
    {episode.transcript && <details className="mt-6 border-t border-on-dark/20 pt-4"><summary className="cursor-pointer text-sm">Transcripción del episodio</summary><p className="mt-4 whitespace-pre-line text-sm leading-7 text-dark-muted">{episode.transcript}</p></details>}
  </div>;
}