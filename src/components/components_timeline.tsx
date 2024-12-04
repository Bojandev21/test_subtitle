import * as React from "react";
import { TimelineProps } from "../types/types_subtitle";

const emotionColors = {
  Neutral: "bg-white",
  Fear: "bg-red-400",
  Anger: "bg-red-600",
  Confusion: "bg-yellow-400",
  "Surprise (negative)": "bg-purple-400",
  Distress: "bg-orange-400",
  Determination: "bg-blue-400",
};

export function Timeline({
  subtitles,
  currentTime,
  onTimeUpdate,
  isPlaying,
}: TimelineProps) {
  const totalDuration = React.useMemo(() => {
    return Math.max(...subtitles.map((s) => s.end_time), 0);
  }, [subtitles]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPlaying || totalDuration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onTimeUpdate(percentage * totalDuration);
  };

  return (
    <div className="h-24 rounded-lg bg-zinc-900 p-4" onClick={handleClick}>
      <div className="relative h-full w-full">
        {subtitles.map((subtitle) => (
          <div
            key={subtitle.start_time}
            className={`absolute h-full ${
              emotionColors[subtitle.emotion as keyof typeof emotionColors]
            } opacity-50`}
            style={{
              left: `${(subtitle.start_time / totalDuration) * 100}%`,
              width: `${
                ((subtitle.end_time - subtitle.start_time) / totalDuration) *
                100
              }%`,
            }}
          />
        ))}
        {totalDuration > 0 && (
          <div
            className="absolute h-full w-0.5 bg-white transition-all"
            style={{
              left: `${(currentTime / totalDuration) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
