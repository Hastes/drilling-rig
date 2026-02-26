"use client";

import { useEffect, useRef, useState } from "react";

const cities = [
  { name: "Новосибирск", subtitle: "Головной офис", x: 38, y: 48, main: true },
  { name: "Хакасия", subtitle: "Текущие объекты", x: 68, y: 56, main: false },
  { name: "Красноярск", subtitle: "Региональные проекты", x: 76, y: 22, main: false },
  { name: "Томск", subtitle: "Изыскания", x: 48, y: 28, main: false },
  { name: "Кузбасс", subtitle: "Промышленные объекты", x: 52, y: 66, main: false },
  { name: "Алтай", subtitle: "Частные заказчики", x: 24, y: 70, main: false },
];

const lines = [
  [0, 4], [4, 1], [0, 3], [3, 2], [0, 5],
];

function CityMarker({ city, offsetY }: { city: typeof cities[0]; offsetY: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), cities.indexOf(city) * 120 + 200);
    return () => clearTimeout(t);
  }, [city]);

  return (
    <div
      ref={ref}
      className="absolute flex flex-col items-center"
      style={{
        left: `${city.x}%`,
        top: `${city.y}%`,
        transform: `translate(-50%, -100%) translateY(${offsetY}px)`,
        zIndex: city.main ? 10 : 5,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Pulse ring for main city */}
      {city.main && (
        <span className="absolute rounded-full border border-white/20 animate-ping"
          style={{ width: 80, height: 80, bottom: 12, left: "50%", transform: "translateX(-50%)" }}
        />
      )}

      {/* Custom pin */}
      <div
        className="relative flex items-center justify-center rounded-full border-2 drop-shadow-lg"
          style={{
            width: city.main ? 56 : 40,
            height: city.main ? 56 : 40,
            backgroundColor: city.main ? "#ffffff" : "rgba(255,255,255,0.12)",
            borderColor: city.main ? "#ffffff" : "rgba(255,255,255,0.4)",
          }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={city.main ? "#1E3146" : "rgba(255,255,255,0.8)"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: city.main ? 26 : 18, height: city.main ? 26 : 18 }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>

        {/* Triangle pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: city.main ? -10 : -8,
            width: 0,
            height: 0,
            borderLeft: `${city.main ? 7 : 5}px solid transparent`,
            borderRight: `${city.main ? 7 : 5}px solid transparent`,
            borderTop: `${city.main ? 10 : 8}px solid ${city.main ? "#ffffff" : "rgba(255,255,255,0.4)"}`,
          }}
        />
      </div>

      {/* Label card */}
      <div
        className="mt-3 text-center"
        style={{ minWidth: city.main ? 120 : 90 }}
      >
        <span
          className={`block whitespace-nowrap font-bold ${
            city.main ? "text-base text-white" : "text-sm text-white/90"
          }`}
        >
          {city.name}
        </span>
        <span className="block text-xs text-white/50 whitespace-nowrap mt-0.5">
          {city.subtitle}
        </span>
      </div>
    </div>
  );
}

export function ParallaxMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * 0.06);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: "80vh", minHeight: 580 }}
    >
      {/* Hex grid — slowest */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${offset * 0.15}px)` }}
      >
        <defs>
          <pattern id="hexgrid" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.4)">
            <polygon points="30,2 55,15 55,37 30,50 5,37 5,15" fill="none" stroke="#D9E0E7" strokeWidth="0.5" opacity="0.12" />
            <polygon points="60,28 85,41 85,63 60,76 35,63 35,41" fill="none" stroke="#D9E0E7" strokeWidth="0.5" opacity="0.12" />
            <polygon points="0,28 25,41 25,63 0,76 -25,63 -25,41" fill="none" stroke="#D9E0E7" strokeWidth="0.5" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexgrid)" />
      </svg>

      {/* Glow zones */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
        style={{ transform: `translateY(${offset * 0.25}px)` }}
      >
        <defs>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D9E0E7" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#D9E0E7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="310" cy="240" r="170" fill="url(#glow1)" />
        <circle cx="560" cy="180" r="110" fill="url(#glow2)" />
        <circle cx="400" cy="340" r="130" fill="url(#glow2)" />
        <circle cx="200" cy="355" r="90" fill="url(#glow2)" />
      </svg>

      {/* Connection lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      >
        {lines.map(([fi, ti]) => {
          const f = cities[fi];
          const t = cities[ti];
          return (
            <line
              key={`${fi}-${ti}`}
              x1={`${f.x}%`}
              y1={`${f.y}%`}
              x2={`${t.x}%`}
              y2={`${t.y}%`}
              stroke="#D9E0E7"
              strokeWidth="1.5"
              strokeDasharray="8 5"
              opacity="0.2"
            />
          );
        })}
      </svg>

      {/* City markers */}
      {cities.map((city) => (
        <CityMarker key={city.name} city={city} offsetY={offset * 0.7} />
      ))}
    </div>
  );
}
