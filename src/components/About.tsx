"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function AnimatedStat({
  value,
  label,
  delay = 0,
  inView,
}: {
  value: string;
  label: string;
  delay?: number;
  inView: boolean;
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[\d]/g, "");
  const isNumeric = !isNaN(numeric) && numeric > 0;

  const counted = useCountUp(isNumeric ? numeric : 0, 1800, started && isNumeric);

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="font-display font-bold leading-tight text-palette-900 tabular-nums"
        style={{
          fontFamily: "var(--font-display), Manrope, sans-serif",
          fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
          opacity: started ? 1 : 0,
          transform: started ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {isNumeric ? `${counted}${suffix}` : value}
      </div>
      <div
        className="text-palette-400 text-xs md:text-sm mt-2 max-w-[140px] leading-snug"
        style={{
          opacity: started ? 1 : 0,
          transform: started ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.5s ease ${delay + 200}ms, transform 0.5s ease ${delay + 200}ms`,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function About() {
  const stats = [
    { value: "2022", label: "Год основания" },
    { value: "300+", label: "Реализованных объектов" },
    {
      value: "Сибирь",
      label: "Красноярск, Алтай, Новосибирск, Томск, Хакасия, Кузбасс",
    },
    {
      value: "13",
      label: "Собственный парк: 3 буровые, 8 единиц транспорта, 2 внедорожника",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-palette-100">
      <div className="container-section">
        <h2 className="text-3xl md:text-4xl font-bold text-palette-900 mb-12">
          Более 25 лет в отрасли
        </h2>
        <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start">
          <div className="flex-1 max-w-2xl space-y-6 mb-12 lg:mb-0">
            <p className="text-lg leading-relaxed text-palette-800 pl-6 border-l-4 border-palette-800/30">
            Более 25 лет в отрасли позволили руководителю компании пройти все этапы
            профессионального становления — от помощника машиниста и
            индивидуального предпринимателя до генерального директора, — и
            обрести непререкаемый авторитет. Наша организация — действующий член
            СОЮЗА БУРОВЫХ ПРЕДПРИЯТИЙ КУЗБАССА{" "}
            <a
              href="#"
              className="font-semibold text-palette-900 hover:text-palette-800"
              title="Сайт в разработке"
            >
              НКО «КУЗБАССКИЙ БУРОВОЙ СОЮЗ»
            </a>
            .
          </p>
          <p className="text-lg leading-relaxed text-palette-800 pl-6 border-l-4 border-palette-800/20">
            Мы — специализированная буровая компания, которая объединяет
            технологическую оснащённость, профессиональную команду и многолетний
            опыт работы на объектах различного масштаба.
          </p>
          <p className="text-lg leading-relaxed text-palette-800 pl-6 border-l-4 border-palette-800/20">
            Выполняем полный комплекс буровых работ: от геологических изысканий до
            обустройства скважин под строительные и инженерные нужды.
          </p>
          <p className="text-lg leading-relaxed font-medium text-palette-900 pl-6 border-l-4 border-palette-800">
            Наша задача — повышение качества услуг в области и за ее пределами.
          </p>
          </div>

          <div
            ref={sectionRef}
            className="flex-shrink-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-px bg-palette-900/10 rounded-lg overflow-hidden"
          >
          {stats.map((stat, i) => (
            <div key={i} className="bg-palette-100 p-4 md:p-6">
              <AnimatedStat
                value={stat.value}
                label={stat.label}
                delay={i * 120}
                inView={inView}
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
