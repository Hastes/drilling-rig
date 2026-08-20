import type { Metadata } from "next";
import { Ubuntu, Manrope } from "next/font/google";
import { PageReadyProvider } from "@/context/PageReadyContext";
import { Preloader } from "@/components/Preloader";
import { YandexMetrika } from "@/components/YandexMetrika";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-ubuntu",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Бурение скважин на воду, геологические изыскания в Новокузнецке",
  description:
    "Бурение скважин (колонковое, разведочное, шнековое, ударно-канатное). Восстановление скважин. Ликвидация скважин. Инженерно-геологические изыскания для строительства. ООО ПРОМБУРСЕРВИС: +7 (905) 902-00-23.",
  verification: {
    yandex: "af63f2b70aa90998",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${ubuntu.variable} ${manrope.variable} font-sans antialiased preloader-active`}>
        <PageReadyProvider>
          <Preloader />
          {children}
          <YandexMetrika />
          <Script
          src="//izvonok.com/callback_api?key=8d17171dfa7c47bdbff10f2578738b94"
          strategy="afterInteractive" // или "lazyOnload"
        />
        </PageReadyProvider>
      </body>
    </html>
  );
}
