import Link from "next/link";
import { notFound } from "next/navigation";
import { newsItems } from "@/data/news";
import { NewsImageSlider } from "@/components/NewsImageSlider";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
            {(item.previewImages && item.previewImages.length > 0) || item.previewImage ? (
              <NewsImageSlider
                images={item.previewImages && item.previewImages.length > 0 ? item.previewImages : [item.previewImage as string]}
                alt={item.title}
              />
            ) : null}
          </div>

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

