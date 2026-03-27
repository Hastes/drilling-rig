"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageFullscreenViewer } from "@/components/ImageFullscreenViewer";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function NewsImageSlider({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const canSlide = images.length > 1;

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full">
      <div className="relative w-full h-72 md:h-[28rem] rounded-xl overflow-hidden border border-palette-900/10 bg-palette-100">
        <Image
          src={`${base}${encodeURI(images[index])}`}
          alt=""
          fill
          className="object-cover object-center scale-110 blur-xl opacity-40"
          sizes="(max-width: 768px) 100vw, 64rem"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden />
        <Image
          src={`${base}${encodeURI(images[index])}`}
          alt={alt}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 64rem"
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute inset-0"
          aria-label="Открыть изображение"
        />

        {canSlide && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 text-white hover:bg-black/60 transition-colors"
              aria-label="Предыдущее изображение"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 text-white hover:bg-black/60 transition-colors"
              aria-label="Следующее изображение"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {canSlide && (
        <div className="flex items-center justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? "bg-palette-900" : "bg-palette-400/50"
              }`}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      )}

      {isOpen && (
        <ImageFullscreenViewer
          images={images.map((img) => `${base}${encodeURI(img)}`)}
          title={alt}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

