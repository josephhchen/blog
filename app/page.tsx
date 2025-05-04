import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Lift Card",
    description: "Social Fitness App",
    date: "Dec 2022",
  },
  // Add more projects as needed
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight font-mono">Projects</h1>
      </section>

      <section className="space-y-6">
        {projects.map((project) => (
          <article key={project.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
            <Link href={`/project/${project.id}`}>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono">
                {project.title}
              </h2>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">
              <time dateTime={project.date.replace(/ /g, "-")}>
                {project.date}
              </time>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 font-mono">
              {project.description}
            </p>
            
            <Link 
              href={`/project/${project.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-mono"
            >
              View project →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}