import Link from "next/link";
import { notFound } from "next/navigation";
import { newsItems } from "@/data/news";
import { NewsImageSlider } from "@/components/NewsImageSlider";
import fs from "node:fs";
import path from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function listImagesFromAssetsDir(assetsDir: string): string[] {
  const normalized = `/${assetsDir}`.replace(/\/+/g, "/").replace(/\/$/, "");
  const diskDir = path.join(
    process.cwd(),
    "public",
    normalized.replace(/^\/+/, "")
  );

  try {
    const entries = fs.readdirSync(diskDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => {
        const ext = path.extname(name).toLowerCase();
        return [
          ".jpg",
          ".jpeg",
          ".png",
          ".webp",
          ".gif",
          ".avif",
          ".svg",
        ].includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, "ru", { numeric: true }))
      .map((name) => `${normalized}/${name}`);
  } catch {
    return [];
  }
}

function vkEmbedSrc(url: string): string | null {
  // Examples:
  // - https://vk.com/video-235359257_456239017
  // - https://vk.com/video235359257_456239017
  const m = url.match(/video(-?\d+)_([0-9]+)/i);
  if (!m) return null;
  const oid = m[1];
  const id = m[2];
  return `https://vk.com/video_ext.php?oid=${encodeURIComponent(oid)}&id=${encodeURIComponent(id)}&hd=2`;
}

export function generateStaticParams() {
  return newsItems
    .filter((n) => n.fullText)
    .map((n) => ({ slug: n.slug }));
}

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = newsItems.find((n) => n.slug === params.slug && n.fullText);

  if (!item) {
    notFound();
  }

  const imagesFromDir = item.assetsDir
    ? listImagesFromAssetsDir(item.assetsDir)
    : [];
  const sliderImages =
    item.previewImages && item.previewImages.length > 0
      ? item.previewImages
      : imagesFromDir.length > 0
        ? imagesFromDir
        : item.previewImage
          ? [item.previewImage]
          : [];

  const vkEmbeds =
    item.vkVideos?.map((url) => ({ url, embed: vkEmbedSrc(url) })) ?? [];

  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 md:py-16">
        <div className="container-section">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 mb-6 rounded-lg px-4 py-2 text-sm font-medium border border-palette-900/20 text-palette-900 hover:bg-palette-900 hover:text-white transition-colors"
          >
            Назад
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-palette-900 mb-4">
            {item.title}
          </h1>

          <div className="mb-8">
            {sliderImages.length > 0 ? (
              <NewsImageSlider
                images={sliderImages}
                alt={item.title}
              />
            ) : null}
          </div>

          {vkEmbeds.some((v) => v.embed) && (
            <div className="mb-8 space-y-4">
              {vkEmbeds.map((v, idx) =>
                v.embed ? (
                  <div
                    key={`${v.url}-${idx}`}
                    className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-palette-900/10 bg-black"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <iframe
                      src={v.embed}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`VK video ${idx + 1}`}
                    />
                  </div>
                ) : null
              )}
            </div>
          )}

          <article className="max-w-4xl text-palette-800 leading-relaxed whitespace-pre-line">
            {item.fullText}
          </article>

          {item.attachmentPdf && (
            <a
              href={`${base}${encodeURI(item.attachmentPdf)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 rounded-lg px-4 py-2 text-sm font-medium bg-palette-800 text-white hover:bg-palette-900 transition-colors"
            >
              Открыть PDF-вложение
            </a>
          )}
        </div>
      </section>
    </main>
  );
}

