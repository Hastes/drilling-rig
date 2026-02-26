"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [layersSettled, setLayersSettled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setLayersSettled(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const skyOffset = revealed ? 0 : -35;
  const groundOffset = revealed ? 0 : -55;
  const waterOffset = revealed ? 0 : -85;

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center h-screen max-h-[180vh] overflow-hidden bg-[#2a4a5e]"
    >
      {/* Слой 1: Небо — быстрее всех опускается */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          zIndex: 0,
          transform: `translateY(${skyOffset + scrollY * 0.01}px)`,
          transition: layersSettled ? "none" : "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a8c5e0" />
              <stop offset="50%" stopColor="#c5d9ed" />
              <stop offset="100%" stopColor="#e8eef5" />
            </linearGradient>
            <filter id="cloud-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
            </filter>
            <radialGradient id="cloud1" cx="30%" cy="30%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cloud2" cx="70%" cy="40%" r="45%">
              <stop offset="0%" stopColor="white" stopOpacity="0.25" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cloud3" cx="50%" cy="60%" r="40%">
              <stop offset="0%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#sky-grad)" />
          <ellipse cx="25%" cy="35%" rx="25%" ry="18%" fill="url(#cloud1)" filter="url(#cloud-blur)" />
          <ellipse cx="75%" cy="45%" rx="20%" ry="14%" fill="url(#cloud2)" filter="url(#cloud-blur)" />
          <ellipse cx="50%" cy="70%" rx="30%" ry="12%" fill="url(#cloud3)" filter="url(#cloud-blur)" />
        </svg>
        <div className="absolute inset-0 bg-black opacity-[0.35]" aria-hidden />
      </div>

      {/* Тайтл — ПОД грунтом, контейнер как в хедере, справа уже */}
      <div
        className="container-section absolute inset-0 flex flex-col items-start justify-center w-full"
        style={{ zIndex: 1, pointerEvents: "none" }}
      >
        <div className="max-w-3xl w-full">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg text-white uppercase text-left"
          style={{
            opacity: revealed ? 1 : 0.5,
            transform: revealed ? "translateY(-5rem)" : "translateY(18rem)",
            transition: "opacity 1.8s ease, transform 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Профессиональное бурение скважин
        </h1>
        <p
          className="text-sm sm:text-base md:text-xl text-white/90 leading-relaxed drop-shadow-md text-left"
          style={{
            opacity: revealed ? 1 : 0.5,
            transform: revealed ? "translateY(-5rem)" : "translateY(16rem)",
            transition: "opacity 1.8s ease 0.3s, transform 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
          }}
        >
          Гидрогеология, геологические изыскания и тампонаж. Собственная техника,
          опытные специалисты, соблюдение всех нормативов.
        </p>
        </div>
      </div>

      {/* Слой грунта — средняя скорость опускания, с задержкой */}
      <div
        className="absolute left-0 right-0 top-0 w-full pointer-events-none overflow-hidden"
        style={{
          zIndex: 2,
          bottom: -80,
          height: "calc(100% + 80px)",
          transform: `translateY(${groundOffset + scrollY * 0.18}px)`,
          transition: layersSettled ? "none" : "transform 2.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/parralax/грунт.png`}
          alt=""
          fill
          className="object-cover object-[88%_35%] md:object-[0_35%]"
          sizes="100vw"
        />
      </div>

      {/* Слой воды — медленнее всего, с задержкой, создаёт каскад */}
      <div
        className="absolute left-0 right-0 w-full pointer-events-none overflow-hidden"
        style={{
          zIndex: 3,
          bottom: -80,
          height: "calc(50% + 80px)",
          transform: `translateY(${waterOffset + scrollY * 0.45}px)`,
          transition: layersSettled ? "none" : "transform 3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/parralax/вода.png`}
          alt=""
          fill
          className="object-cover object-[88%_35%] md:object-[0_35%]"
          sizes="100vw"
        />
      </div>

      {/* Premium scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-medium">Листай</span>
        <div className="relative w-px h-12 bg-white/20 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 w-full h-4 rounded-full bg-gradient-to-b from-white/90 to-white/40 animate-scroll-dot"
            style={{
              boxShadow: "0 0 16px rgba(255,255,255,0.4), 0 0 4px rgba(255,255,255,0.6)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
