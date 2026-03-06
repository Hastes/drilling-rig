const capabilities = [
  "Роторное бурение для твёрдых пород",
  "Ударно-канатное бурение для рыхлых грунтов",
  "Колонковое бурение с отбором керна",
  "Шнековое бурение малого диаметра",
];

export function TechnicalBase() {
  const assetPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/drilling-car.PNG`;
  return (
    <section
      className="relative min-h-[500px] md:min-h-[600px] flex items-center py-20 overflow-hidden tech-base-bg"
      style={{ "--tech-bg-url": `url(${assetPath})` } as React.CSSProperties}
    >
      {/* Текст справа, машина слева, затемнение справа */}
      <div className="container-section relative z-10 flex justify-end w-full">
        <div className="w-full max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Техническая база
          </h2>

          <p className="text-lg leading-relaxed text-white/95 mb-4 drop-shadow-md">
            Располагаем современным парком бурового оборудования, способного
            выполнять работы любой сложности диаметром до 1000 мм и глубиной до 250
            м/п.
          </p>
          <p className="text-lg leading-relaxed text-white/95 mb-8 drop-shadow-md">
            Наша техника позволяет работать в сложных грунтовых условиях и на
            удалённых объектах.
          </p>

          <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">
            Возможности:
          </h3>
          <ul className="space-y-3">
            {capabilities.map((cap, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-white/95 text-lg drop-shadow-md"
              >
                <span className="text-white mt-0.5 font-bold">✓</span>
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
