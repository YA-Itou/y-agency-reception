"use client";

import { useEffect } from "react";

export function useIdleReset(enabled: boolean, timeoutMs: number, onIdle: () => void) {
  useEffect(() => {
    if (!enabled) return;

    let timer = window.setTimeout(onIdle, timeoutMs);

    const bump = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(onIdle, timeoutMs);
    };

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "pointermove",
      "keydown",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, bump, { passive: true }));

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, bump));
    };
  }, [enabled, timeoutMs, onIdle]);
}
