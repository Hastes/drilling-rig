import { ParallaxMap } from "./InteractiveMap";

export function Geography() {
  return (
    <section className="relative bg-palette-900 overflow-hidden">
      {/* Text content floats on top of the map */}
      <div className="relative z-10 pt-20">
        <div className="container-section">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            География и объекты
          </h2>

          <div className="max-w-3xl mx-auto text-white/70 mb-4">
            <p className="text-lg leading-relaxed mb-4 text-center">
              Работаем по всей Сибири, в данный момент в Хакасии и Новосибирске.
              Выполняем как локальные проекты для частных застройщиков, так и
              масштабные изыскания для промышленных и инфраструктурных объектов.
            </p>
            <p className="text-lg leading-relaxed text-center">
              Наша мобильная техника позволяет оперативно выехать на площадку любой
              удалённости и организовать буровые работы в сжатые сроки.
            </p>
          </div>
        </div>
      </div>

      {/* Map bleeds seamlessly under/around the text */}
      <div className="relative z-0 -mt-8">
        <ParallaxMap />
      </div>
    </section>
  );
}
