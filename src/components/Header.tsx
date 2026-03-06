import Image from "next/image";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const navItems = [
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#activities" },
  { label: "Новости", href: "#news" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container-section w-full py-5 flex items-center justify-between">
        <a href="#" className="group flex items-center">
          <Image
            src={`${base}/assets/logo.svg`}
            alt="ПРОМБУРСЕРВИС"
            width={180}
            height={166}
            className="h-14 w-auto transition-all duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
          />
        </a>

        <nav className="flex gap-6 md:gap-8">
          <a
            href="#contacts"
            className="text-sm text-white/60 hover:text-white/90 transition-colors duration-300 md:hidden"
          >
            Контакты
          </a>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden md:block text-sm text-white/60 hover:text-white/90 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
