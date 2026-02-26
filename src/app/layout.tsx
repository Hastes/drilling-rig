import type { Metadata } from "next";
import { Ubuntu, Manrope } from "next/font/google";
import { PageReadyProvider } from "@/context/PageReadyContext";
import { Preloader } from "@/components/Preloader";
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
  title: "ПРОМБУРСЕРВИС — Профессиональное бурение скважин",
  description:
    "Гидрогеология, геологические изыскания и тампонаж. Собственная техника, опытные специалисты. Новосибирск, Сибирь.",
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
        </PageReadyProvider>
      </body>
    </html>
  );
}
