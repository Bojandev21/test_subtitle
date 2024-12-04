"use client";

import * as React from "react";
import { Camera, Play, Square, Upload } from "lucide-react";
import { SubtitleDisplay } from "./components/components_subtitle-display";
import { Timeline } from "./components/components_timeline";
import { Subtitle } from "./types/types_subtitle";

export default function SubtitleEditor() {
  const [subtitles, setSubtitles] = React.useState<Subtitle[]>([]);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const totalDuration = React.useMemo(() => {
    return Math.max(...subtitles.map((s) => s.end_time), 0);
  }, [subtitles]);

  React.useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return time + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const handleImport = async () => {
    try {
      const response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output-pv43A69y7lpMEH9CGnjldPgvxVMrXW.txt"
      );
      const data = await response.json();
      setSubtitles(data);
    } catch (error) {
      console.error("Error importing subtitles:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="text-white hover:bg-white/10 flex gap-1 items-center py-2 px-4 rounded-md border border-white transition-colors"
              onClick={() => setIsAnimating(!isAnimating)}
            >
              <Camera className="h-5 w-5" />
              <span className="ml-2">Animation</span>
            </button>
            <button
              className="text-white hover:bg-white/10 flex gap-1 items-center py-2 px-4 rounded-md border border-white transition-colors"
              onClick={handleImport}
            >
              <Upload className="h-5 w-5" />
              <span className="ml-2">Import Subtitles</span>
            </button>
          </div>
          <button className="text-white hover:bg-white/10 flex gap-1 items-center py-2 px-4 rounded-md border border-white transition-colors">
            EXPORT
          </button>
        </div>
        <div className="aspect-[4/2] bg-zinc-900">
          <div className="flex h-full items-center justify-center">
            <div className="h-3/4 w-1/3 bg-purple-500/50" />
          </div>
        </div>
        <SubtitleDisplay
          subtitles={subtitles}
          currentTime={currentTime}
          isAnimating={isAnimating}
        />
        <div className="flex items-center justify-center gap-4">
          <button
            className="text-white hover:bg-white/10 p-3 rounded-md transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Square className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        </div>
        <Timeline
          subtitles={subtitles}
          currentTime={currentTime}
          onTimeUpdate={setCurrentTime}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
}
