"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Subtitle } from "../types/types_subtitle";

interface SubtitleDisplayProps {
  subtitles: Subtitle[];
  currentTime: number;
  isAnimating: boolean;
}

const emotionColors = {
  Neutral: "text-white",
  Fear: "text-red-400",
  Anger: "text-red-600",
  Confusion: "text-yellow-400",
  "Surprise (negative)": "text-purple-400",
  Distress: "text-orange-400",
  Determination: "text-blue-400",
};

export function SubtitleDisplay({
  subtitles,
  currentTime,
  isAnimating,
}: SubtitleDisplayProps) {
  const currentSubtitle = subtitles.find(
    (subtitle) =>
      currentTime >= subtitle.start_time && currentTime <= subtitle.end_time
  );

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <div className="h-32 rounded-lg bg-zinc-900 p-4">
      <div className="flex h-full flex-col items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {currentSubtitle ? (
            <motion.div
              key={currentSubtitle.start_time}
              variants={container}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center"
            >
              <motion.p
                className={`mb-2 text-sm font-medium ${
                  emotionColors[
                    currentSubtitle.emotion as keyof typeof emotionColors
                  ]
                }`}
              >
                {currentSubtitle.emotion} (Intensity:{" "}
                {currentSubtitle.emotion_intensity})
              </motion.p>
              <motion.div className="flex flex-wrap justify-center">
                {currentSubtitle.words.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={child}
                    className={`mx-0.5 text-2xl font-bold ${
                      isAnimating ? "animate-bounce" : ""
                    }`}
                    style={{
                      display: "inline-block",
                      animationDelay: `${index * 0.05}s`,
                      animationDuration: "0.5s",
                    }}
                  >
                    {word.word}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg text-gray-400"
            >
              No subtitles available. Please import subtitles.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
