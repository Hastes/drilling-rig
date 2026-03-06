import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Contacts() {
  return (
    <section id="contacts" className="py-20 bg-palette-900 text-white">
      <div className="container-section">
        <a href="#" className="group flex justify-center mb-8">
          <Image
            src={`${base}/assets/logo.svg`}
            alt="ПРОМБУРСЕРВИС"
            width={160}
            height={148}
            className="h-16 w-auto transition-all duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
          />
        </a>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Контакты
        </h2>
        <p className="text-palette-400 text-center text-lg mb-16 max-w-xl mx-auto">
          Свяжитесь с нами для консультации и расчёта стоимости работ
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-palette-800/30 mb-16">
          <a
            href="tel:+79059020023"
            className="group flex flex-col gap-4 p-8 bg-palette-900 hover:bg-palette-800/40 transition-colors duration-300"
          >
            <Phone size={24} strokeWidth={1.5} className="text-palette-400 group-hover:text-white transition-colors" />
            <div>
              <div className="text-xs text-palette-400 uppercase tracking-widest mb-2">Телефон</div>
              <div className="text-lg font-medium text-white">+7 (905) 902-00-23</div>
            </div>
          </a>

          <a
            href="mailto:ooo.promburservis@mail.ru"
            className="group flex flex-col gap-4 p-8 bg-palette-900 hover:bg-palette-800/40 transition-colors duration-300"
          >
            <Mail size={24} strokeWidth={1.5} className="text-palette-400 group-hover:text-white transition-colors" />
            <div>
              <div className="text-xs text-palette-400 uppercase tracking-widest mb-2">Email</div>
              <div className="text-lg font-medium text-white break-all">ooo.promburservis@mail.ru</div>
            </div>
          </a>

          <div className="group flex flex-col gap-4 p-8 bg-palette-900">
            <MapPin size={24} strokeWidth={1.5} className="text-palette-400" />
            <div>
              <div className="text-xs text-palette-400 uppercase tracking-widest mb-2">Адрес</div>
              <div className="text-base text-white leading-relaxed">
                г. Новосибирск,<br />ул. Восход, д. 1А, офис 29
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-palette-800/50 pt-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="text-xs text-palette-400 uppercase tracking-widest mb-4">Реквизиты</div>
              <p className="text-white font-medium mb-4">
                ООО «ПРОМБУРСЕРВИС»
              </p>
              <ul className="space-y-1 text-palette-400 text-sm font-mono">
                <li>ОГРН: 1225400045420</li>
                <li>ИНН: 5405078491</li>
                <li>КПП: 540501001</li>
              </ul>
            </div>
            <div className="text-palette-400 text-sm md:text-right">
              <p>630102, Новосибирская область,</p>
              <p>г. Новосибирск, ул. Восход, д. 1А, офис 29</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
