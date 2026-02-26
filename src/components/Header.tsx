const navItems = [
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#activities" },
  { label: "Проекты", href: "#projects" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container-section w-full py-5 flex items-center justify-between">
        <a href="#" className="text-sm font-bold tracking-widest uppercase text-white/90">
          ПРОМБУРСЕРВИС
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
