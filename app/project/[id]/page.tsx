import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";

// In Next.js 15, params is a Promise
interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Record<string, string | string[] | undefined>;
}

// Sample project data - in a real app, this would come from a database or API
const projects = [
  {
    id: 1,
    title: "Lift Card",
    description: "A Social Fitness App.",
    longDescription: `I love going to the gym, so I wanted to create a social fitness app that allows users to share their workouts, track their progress, and connect with friends. The app features a clean and intuitive interface, allowing users to easily log their workouts, set goals, and view their progress over time.
    `,
    image: "/liftcard.png",
    tag: "Game",
    date: "Dec 2022",
    technologies: ["React Native", "TypeScript", "Firebase", "Golang", "AWS"],
    liveUrl: "https://apps.apple.com/us/app/lift-card-social-fitness-app/id6449883528",
  },
  // You can add other projects without githubUrl
  {
    id: 2,
    title: "Private Project",
    description: "A confidential project with no public code.",
    longDescription: `This is a project where the code is proprietary and not available on GitHub.`,
    image: "/placeholder-project2.jpg",
    tag: "Web App",
    date: "May 2025",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/indiedev/pixel-adventure",
    liveUrl: "https://private-project.demo.dev",
  },
];

export default async function ProjectPage({ params }: PageProps) {
  // In Next.js 15, we need to await the params
  const resolvedParams = await params;
  
  // In a real app, you would fetch the project from an API or database
  const project = projects.find(p => p.id === parseInt(resolvedParams.id));
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 font-mono">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto font-mono">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
        
        <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
        
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            {project.tag}
          </span>
          <span>•</span>
          <time dateTime={project.date.replace(/ /g, "-")}>
            {project.date}
          </time>
        </div>
      </div>
      
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8">
        {/* Replace with actual project image in production */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
          <span className="font-mono text-sm">{project.title} Preview</span>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {project.longDescription}
          </p>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Links</h2>
          <div className="flex flex-wrap gap-4">
            {/* Conditionally render GitHub link only if githubUrl exists */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Github size={18} />
                View Source
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
            >
              <Globe size={18} />
              App is Live!
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}