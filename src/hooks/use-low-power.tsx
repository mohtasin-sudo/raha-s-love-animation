import * as React from "react";

/**
 * Detects whether the device is likely under load / low-power, so we can
 * scale down non-critical animations (counts, blurs, drop-shadows) to
 * prevent stutter on mobile.
 *
 * Triggers when ANY of these are true:
 *  - prefers-reduced-motion
 *  - Save-Data header
 *  - Slow effective network (2g / slow-2g)
 *  - deviceMemory <= 4 GB
 *  - hardwareConcurrency <= 4 (and mobile)
 *  - battery < 20% and not charging
 *  - rolling FPS measurement drops below 45 for >1s
 */
export function useLowPower() {
  const [low, setLow] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    // Best-effort SSR-safe initial guess: assume low on small screens.
    return window.matchMedia?.("(max-width: 767px)").matches ?? false;
  });

  React.useEffect(() => {
    let cancelled = false;
    const mark = (v: boolean) => {
      if (!cancelled && v) setLow(true);
    };

    // Reduced motion preference
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rm.matches) mark(true);
    rm.addEventListener?.("change", () => mark(rm.matches));

    // Network / save-data
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData) mark(true);
    if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) mark(true);

    // Memory & cores
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    if (typeof mem === "number" && mem > 0 && mem <= 4) mark(true);
    const cores = navigator.hardwareConcurrency ?? 8;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile && cores <= 4) mark(true);

    // Battery
    const navAny = navigator as unknown as { getBattery?: () => Promise<{ level: number; charging: boolean }> };
    navAny.getBattery?.().then((b) => {
      if (!b.charging && b.level < 0.2) mark(true);
    }).catch(() => {});

    // Rolling FPS — escalates to low-power if sustained drops detected.
    let raf = 0;
    let last = performance.now();
    let slowFrames = 0;
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      // 22ms ≈ 45fps threshold
      if (dt > 22) slowFrames++;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 60) {
        mark(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return low;
}
