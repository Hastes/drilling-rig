import { Phone, Mail, MapPin } from "lucide-react";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Contacts() {
  return (
    <section
      id="contacts"
      className="relative py-20 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 80%, transparent 100%), url('${base}/assets/contacts-bg-v2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-section relative z-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Контакты
          </h2>
          <p className="text-white/80 text-lg mb-12">
            Свяжитесь с нами для консультации
          </p>

          <div className="space-y-8 mb-12">
            <a href="tel:+79059020023" className="group flex items-start gap-4 hover:opacity-90 transition-opacity">
              <Phone size={24} strokeWidth={1.5} className="text-white/70 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-white/70 uppercase tracking-widest mb-1">Телефон</div>
                <div className="text-lg font-medium text-white">+7 (905) 902-00-23</div>
              </div>
            </a>

            <a href="mailto:ooo.promburservis@mail.ru" className="group flex items-start gap-4 hover:opacity-90 transition-opacity">
              <Mail size={24} strokeWidth={1.5} className="text-white/70 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-white/70 uppercase tracking-widest mb-1">Email</div>
                <div className="text-lg font-medium text-white break-all">ooo.promburservis@mail.ru</div>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <MapPin size={24} strokeWidth={1.5} className="text-white/70 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-white/70 uppercase tracking-widest mb-1">Адрес</div>
                <div className="text-lg text-white leading-relaxed">
                  г. Новосибирск, ул. Восход, д. 1А, офис 29
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="text-xs text-white/70 uppercase tracking-widest mb-3">Реквизиты</div>
            <p className="text-white font-medium mb-2">ООО «ПРОМБУРСЕРВИС»</p>
            <ul className="space-y-1 text-white/80 text-sm font-mono mb-4">
              <li>ОГРН: 1225400045420</li>
              <li>ИНН: 5405078491</li>
              <li>КПП: 540501001</li>
            </ul>
            <p className="text-white/80 text-sm">
              630102, Новосибирская область, г. Новосибирск, ул. Восход, д. 1А, офис 29
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
