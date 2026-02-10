"use client";

import { useState, useEffect, useCallback } from "react";

const PHRASES = [
  "Deeper Legal Research",
  "Automatic Motions",
  "Faster Briefs",
  "Instant Discovery",
  "and More\u2026",
  "Deeper Legal Research",
];

const INITIAL_HOLD = 4000;
const PHRASE_HOLD = 2750;
const TRANSITION_OUT = 500;
const TRANSITION_IN = 500;

export const Greeting = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">(
    "entering"
  );
  const [done, setDone] = useState(false);

  const advance = useCallback(() => {
    if (done) return;

    // Start exit
    setPhase("exiting");

    setTimeout(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= PHRASES.length - 1) {
          setDone(true);
        }
        return next;
      });
      setPhase("entering");

      setTimeout(() => {
        setPhase("visible");
      }, TRANSITION_IN);
    }, TRANSITION_OUT);
  }, [done]);

  useEffect(() => {
    // Initial entrance
    const entranceTimer = setTimeout(() => {
      setPhase("visible");
    }, TRANSITION_IN);
    return () => clearTimeout(entranceTimer);
  }, []);

  useEffect(() => {
    if (done || phase !== "visible") return;

    const holdTime = index === 0 ? INITIAL_HOLD : PHRASE_HOLD;
    const timer = setTimeout(advance, holdTime);
    return () => clearTimeout(timer);
  }, [index, phase, done, advance]);

  const isVisible = phase === "visible";
  const isExiting = phase === "exiting";
  const isEntering = phase === "entering";

  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <div className="relative h-[2.25rem] md:h-[2.5rem] overflow-hidden">
        <span
          className="absolute inset-0 font-semibold text-xl md:text-2xl transition-all ease-out"
          style={{
            transitionDuration: isExiting
              ? `${TRANSITION_OUT}ms`
              : `${TRANSITION_IN}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isExiting
              ? "translateY(-12px) scale(0.97)"
              : isEntering
                ? "translateY(12px) scale(0.97)"
                : "translateY(0) scale(1)",
          }}
        >
          {PHRASES[index]}
        </span>
      </div>
      <div
        className="text-xl text-zinc-500 md:text-2xl transition-opacity duration-700"
        style={{ opacity: 1 }}
      >
        The most powerful tool for legal professionals
      </div>
    </div>
  );
};
