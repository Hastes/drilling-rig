"use client";

import { useEffect, useRef, useState } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const activities = [
  {
    num: "01",
    title: "Геологические изыскания",
    description:
      "Бурение скважин для изучения состава грунтов, определения уровня грунтовых вод, оценки несущей способности оснований под фундаменты зданий и сооружений. Позволяют заранее увидеть подводные камни и выбрать оптимальное решение ещё на этапе проектирования.",
    tag: "Геология",
    imageUrls: [
      "/photos/IMG_2197.jpg",
      "/photos/IMG_6698.jpg",
      "/photos/IMG_6699.jpg",
      "/photos/IMG_6700.jpg",
      "/photos/IMG_6701.jpg",
      "/photos/Шерегеш, гора Зеленая июнь 24.jpg",
    ],
  },
  {
    num: "02",
    title: "Гидрогеологические работы",
    description:
      "Поиск и разведка водоносных горизонтов, бурение эксплуатационных скважин на воду для частных лиц и организаций.",
    tag: "Гидрогеология",
    imageUrls: [
      "/photos/IMG_0803.jpg",
      "/photos/PHOTO-2024-05-03-10-00-04.jpg",
      "/photos/PHOTO-2024-05-31-22-26-29.jpg",
      "/photos/IMG_1262.JPG",
    ],
  },
  {
    num: "03",
    title: "Специальные виды бурения",
    description:
      "Бурение для установки свай, шпунтовых ограждений, дренажных систем и других инженерных задач любой сложности.",
    tag: "Инженерное бурение",
    imageUrls: [
      "/photos/IMG_0015.JPG",
      "/photos/IMG_4318.JPG",
      "/photos/928be286-1925-4e00-af2e-a02e2e6cc68f.JPG",
    ],
  },
  {
    num: "04",
    title: "Тампонаж скважин",
    description:
      "Заполнение ствола скважины специальными растворами для изоляции участков, укрепления стенок или полной ликвидации выработки.",
    tag: "Тампонаж",
    imageUrls: [
      "/photos/IMG_1393.jpg",
      "/photos/IMG_1401.jpg",
      "/photos/IMG_4321.jpg",
    ],
  },
  {
    num: "05",
    title: "ПБС-МОНТАЖ",
    description:
      "Производство павильонов — собственное производство скважинных павильонов с автоматикой под нужды Заказчика.",
    tag: "Павильоны",
    imageUrls: [
      "/photos/IMG_7257.JPG",
      "/photos/f988f515-f304-4d62-8fec-ef2a934f9015.JPG",
      "/photos/image-01-11-23-10-06-1 (1).jpeg",
      "/photos/IMG_6698 (1).jpg",
    ],
  },
];

function ActivityRow({
  item,
  index,
  onTitleClick,
}: {
  item: typeof activities[0];
  index: number;
  onTitleClick?: (item: typeof activities[0]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleTitleClick = () => {
    if (onTitleClick) onTitleClick(item);
  };

  return (
    <div
      ref={ref}
      className="group relative border-t border-palette-800/30 py-10 md:py-14 overflow-hidden cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
      }}
    >
      {/* Giant watermark number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold leading-none select-none pointer-events-none transition-all duration-500 group-hover:opacity-20"
        style={{
          fontSize: "clamp(8rem, 18vw, 16rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(142, 169, 195, 0.15)",
          opacity: 0.1,
          lineHeight: 1,
        }}
      >
        {item.num}
      </div>

      <div className="relative z-10 grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 items-start">
        {/* Number + tag */}
        <div>
          <span
            className="font-display font-bold text-palette-400/60 block"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {item.num}
          </span>
          <span className="text-xs font-medium text-palette-400 border border-palette-800/30 rounded-full px-3 py-1 mt-2 inline-block tracking-wider uppercase">
            {item.tag}
          </span>
        </div>

        {/* Title — кликабельно для открытия фото работ */}
        <h3
          className="font-bold text-white leading-tight group-hover:text-palette-100 transition-colors duration-300 cursor-pointer hover:underline underline-offset-2"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
          onClick={handleTitleClick}
          onKeyDown={(e) => e.key === "Enter" && handleTitleClick()}
          role="button"
          tabIndex={0}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-palette-400 leading-relaxed text-base">
          {item.description}
        </p>
      </div>

      {/* Bottom line that animates in on hover */}
      <div className="absolute bottom-0 left-0 h-px bg-palette-400/30 w-0 group-hover:w-full transition-all duration-700" />
    </div>
  );
}

export function Activities() {
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fullscreenIndex !== null) fullscreenRef.current?.focus();
  }, [fullscreenIndex]);

  const handleTitleClick = (item: typeof activities[0]) => {
    setModalTitle(item.title);
    setModalImages(item.imageUrls.map((p) => `${base}${encodeURI(p)}`));
    setFullscreenIndex(null);
  };

  const closeModal = () => {
    setModalImages([]);
    setModalTitle("");
    setFullscreenIndex(null);
  };

  const openFullscreen = (index: number) => setFullscreenIndex(index);
  const closeFullscreen = () => setFullscreenIndex(null);
  const goPrev = () =>
    setFullscreenIndex((i) => (i === null ? null : i > 0 ? i - 1 : modalImages.length - 1));
  const goNext = () =>
    setFullscreenIndex((i) => (i === null ? null : i < modalImages.length - 1 ? i + 1 : 0));

  return (
    <section id="activities" className="relative bg-palette-900 py-20 overflow-hidden">
      {/* Subtle background texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" style={{ pointerEvents: "none" }}>
        <defs>
          <pattern id="act-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8EA9C3" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#act-grid)"/>
      </svg>

      <div className="container-section relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ключевые направления деятельности
          </h2>
          <span className="text-palette-400 text-sm md:text-base max-w-xs">
            Полный комплекс буровых работ — от изысканий до обустройства скважин
          </span>
        </div>

        {/* Rows */}
        <div className="mt-8">
          {activities.map((item, i) => (
            <ActivityRow key={item.num} item={item} index={i} onTitleClick={handleTitleClick} />
          ))}
          {/* Last border */}
          <div className="border-t border-palette-800/30" />
        </div>
      </div>

      {/* Модальное окно для фото работ */}
      {modalTitle && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 overflow-y-auto"
          onClick={closeModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
        >
          <div
            className="relative max-w-5xl w-full bg-palette-900/95 rounded-lg p-6 md:p-8 text-center my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-xl font-bold mb-6">{modalTitle}</h3>
            {modalImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modalImages.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openFullscreen(i);
                    }}
                    className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-palette-400 rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`${modalTitle} — фото ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-palette-100 text-lg">Фото работ будут добавлены</p>
            )}
          </div>
        </div>
      )}

      {/* Полноэкранный просмотр изображения */}
      {fullscreenIndex !== null && modalImages[fullscreenIndex] && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 z-[101] flex items-center justify-center bg-black/95 p-4 outline-none"
          onClick={closeFullscreen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeFullscreen();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
          }}
        >
          <button
            type="button"
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {modalImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Предыдущее"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Следующее"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImages[fullscreenIndex]}
              alt={`${modalTitle} — фото ${fullscreenIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {fullscreenIndex + 1} / {modalImages.length}
          </span>
        </div>
      )}
    </section>
  );
}
