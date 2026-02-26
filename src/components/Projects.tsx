import Image from "next/image";

const projects = [
  {
    title: "Проект №1 — [Название объекта — запросить]",
    type: "Инженерно-геологические изыскания",
    volume: "[запросить]",
    depth: "[запросить]",
    timeline: "[запросить]",
  },
  {
    title: "Проект №2 — [Название объекта — запросить]",
    type: "Бурение под свайные фундаменты",
    volume: "[запросить]",
    depth: "[запросить]",
    timeline: "[запросить]",
  },
  {
    title: "Проект №3 — [Название объекта — запросить]",
    type: "Гидрогеологические изыскания",
    volume: "[запросить]",
    depth: "[запросить]",
    timeline: "[запросить]",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-palette-100">
      <div className="container-section">
        <h2 className="text-3xl md:text-4xl font-bold text-palette-900 mb-16 text-center">
          Реализованные проекты
        </h2>

        <div className="relative aspect-video rounded-xl overflow-hidden mb-12 max-w-4xl mx-auto">
          <Image
            src="/assets/projects.svg"
            alt="Реализованные проекты"
            fill
            className="object-cover"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-palette-900 mb-4">
                {project.title}
              </h3>
              <ul className="space-y-2 text-palette-800 text-sm">
                <li>
                  <span className="font-medium">Тип работ:</span> {project.type}
                </li>
                <li>
                  <span className="font-medium">Объём:</span> {project.volume}
                </li>
                <li>
                  <span className="font-medium">Глубина:</span> {project.depth}
                </li>
                <li>
                  <span className="font-medium">Сроки:</span> {project.timeline}
                </li>
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-palette-800 text-sm">
          Фото проектов: [запросить]
        </p>
      </div>
    </section>
  );
}
