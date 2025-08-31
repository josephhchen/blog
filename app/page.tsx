import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Lift Card",
    description: "A social fitness app with 5k+ daily active users, built with React Native. Features include workout tracking, social feed, and community features.",
    date: "Dec 2022 - Present",
    status: "Live",
    links: {
      live: "https://liftcard.app",
      github: null
    },
    tags: ["React Native", "Node.js", "PostgreSQL", "Social"]
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="mb-24 animate-fade-in">
        <div className="max-w-3xl">
          <h1 className="theme-text text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
           Hello!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-8 leading-relaxed animate-slide-up">
            I'm Joe, a Software Development Engineer at Amazon.
            <br />
            Currently building <Link href="/devlogs" className="theme-text font-medium hover:underline decoration-black dark:decoration-white">Lift Card</Link>, 
            a social fitness app with thousands of daily users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Link 
              href="/devlogs"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Read my devlogs
              <ArrowUpRight size={16} />
            </Link>
            <Link 
              href="mailto:joe@example.com"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="theme-text text-2xl md:text-3xl font-bold">Featured Projects</h2>
          <Link 
            href="/projects" 
            className="text-sm font-medium text-black dark:text-gray-400 hover:opacity-70 dark:hover:text-white transition-all"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <article 
              key={project.id} 
              className="group border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="theme-text text-xl font-bold group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-500 font-mono">
                    {project.date}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {project.links.live && (
                    <Link 
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      View Live
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-12">
          <h2 className="theme-text text-2xl md:text-3xl font-bold">Latest Thoughts</h2>
          <Link 
            href="/devlogs" 
            className="text-sm font-medium text-black dark:text-gray-400 hover:opacity-70 dark:hover:text-white transition-all"
          >
            Read all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link 
            href="/devlogs/1"
            className="group block border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
          >
            <h3 className="theme-text text-lg font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
              What I've learned from building Lift Card
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              Over 50,000 downloads, ~5,000+ daily active users and growing. Here's everything I've learned.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 font-mono">
              <span>May 4, 2025</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </Link>

          <Link 
            href="/devlogs/2"
            className="group block border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
          >
            <h3 className="theme-text text-lg font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
              What does Success Truly Mean?
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              Growing up I always thought that success meant making X amount of money, getting X job, but I've recently been exploring that idea that success is so much more.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 font-mono">
              <span>May 4, 2025</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}