"use client";

import { useEffect, useState, useContext } from "react";
import { PageReadyContext } from "@/context/PageReadyContext";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PARALLAX_IMAGES = [
  `${base}/assets/parralax/грунт.png`,
  `${base}/assets/parralax/вода.png`,
];

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function Preloader() {
  const ctx = useContext(PageReadyContext);
  const setPageReady = ctx?.setPageReady;
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const finish = () => {
      setLoaded(true);
      setPageReady?.();
      setTimeout(() => setVisible(false), 600);
    };

    const run = async () => {
      await Promise.all([
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise<void>((r) => {
              window.addEventListener("load", () => r(), { once: true });
            }),
        Promise.all(PARALLAX_IMAGES.map((src) => loadImage(src))),
      ]);
      finish();
    };

    run();
  }, [mounted]);

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-palette-900 transition-opacity duration-500 ease-out"
      style={{
        opacity: loaded ? 0 : 1,
        pointerEvents: loaded ? "none" : "auto",
      }}
      aria-hidden={loaded}
    >
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: loaded ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-palette-100/30 border-t-white" />
          </div>
          <span className="text-sm font-medium text-palette-100/80 tracking-widest uppercase">
            Загрузка
          </span>
        </div>
      </div>
    </div>
  );
}
