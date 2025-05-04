import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Lift Card",
    description: "Social Fitness App",
    image: "/liftcard.png",
    tag: "Mobile App",
    date: "Dec 2022",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight font-mono">Projects</h1>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id}>
            <article className="group flex flex-col h-full border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 overflow-hidden">
            <Image 
              src={project.image}
              alt={`${project.title} preview image`}
              fill
              className="object-cover"
              priority
            />
          </div>
                        
              <div className="flex-grow p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-mono">
                    {project.title}
                  </h2>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono">
                    {project.tag}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                  {project.description}
                </p>
                
                <div className="pt-2 text-xs text-gray-500 dark:text-gray-500 font-mono">
                  {project.date}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}