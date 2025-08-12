import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github, Linkedin, Instagram } from "lucide-react";

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
          
          <div className="flex items-center gap-4 mb-8 animate-slide-up">
            <Link 
              href="https://github.com/joehaiyuechen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </Link>
            <Link 
              href="https://linkedin.com/in/joehaiyuechen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>
            <Link 
              href="https://instagram.com/joehaiyuechen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link 
              href="https://tiktok.com/@joehaiyuechen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.432-1.884-1.664-3.047C16.003 1.103 16 .91 16 .71V.5c0-.276-.224-.5-.5-.5h-3c-.276 0-.5.224-.5.5v8.542c0 .86-.3 1.654-.8 2.282-.569.713-1.42 1.176-2.378 1.176-1.654 0-3-1.346-3-3s1.346-3 3-3c.338 0 .663.056.968.158.276.092.576-.057.668-.333.092-.276-.057-.576-.333-.668-.407-.136-.835-.206-1.303-.206-2.757 0-5 2.243-5 5s2.243 5 5 5c1.29 0 2.457-.491 3.341-1.297.96-.877 1.56-2.14 1.649-3.546L13 15.5V8.414c.581.206 1.213.352 1.877.414.748.07 1.481-.015 2.175-.236.276-.088.43-.381.342-.657-.088-.276-.381-.43-.657-.342-.555.177-1.142.245-1.746.188-.467-.044-.918-.148-1.336-.305L13 7.5V.5c0-.276-.224-.5-.5-.5h-3c-.276 0-.5.224-.5.5v8.542c0 .86-.3 1.654-.8 2.282-.569.713-1.42 1.176-2.378 1.176-1.654 0-3-1.346-3-3s1.346-3 3-3c.338 0 .663.056.968.158.276.092.576-.057.668-.333.092-.276-.057-.576-.333-.668-.407-.136-.835-.206-1.303-.206-2.757 0-5 2.243-5 5s2.243 5 5 5c1.29 0 2.457-.491 3.341-1.297.96-.877 1.56-2.14 1.649-3.546L13 15.5V8.414c.581.206 1.213.352 1.877.414.748.07 1.481-.015 2.175-.236.276-.088.43-.381.342-.657-.088-.276-.381-.43-.657-.342-.555.177-1.142.245-1.746.188-.467-.044-.918-.148-1.336-.305L13 7.5V.5c0-.276-.224-.5-.5-.5h-3c-.276 0-.5.224-.5.5v8.542c0 .86-.3 1.654-.8 2.282-.569.713-1.42 1.176-2.378 1.176-1.654 0-3-1.346-3-3s1.346-3 3-3c.338 0 .663.056.968.158.276.092.576-.057.668-.333.092-.276-.057-.576-.333-.668-.407-.136-.835-.206-1.303-.206-2.757 0-5 2.243-5 5s2.243 5 5 5c1.29 0 2.457-.491 3.341-1.297.96-.877 1.56-2.14 1.649-3.546L13 15.5V8.414c.581.206 1.213.352 1.877.414.748.07 1.481-.015 2.175-.236.276-.088.43-.381.342-.657-.088-.276-.381-.43-.657-.342-.555.177-1.142.245-1.746.188-.467-.044-.918-.148-1.336-.305L13 7.5V.5c0-.276-.224-.5-.5-.5h-3c-.276 0-.5.224-.5.5v8.542c0 .86-.3 1.654-.8 2.282-.569.713-1.42 1.176-2.378 1.176-1.654 0-3-1.346-3-3s1.346-3 3-3c.338 0 .663.056.968.158.276.092.576-.057.668-.333.092-.276-.057-.576-.333-.668-.407-.136-.835-.206-1.303-.206-2.757 0-5 2.243-5 5s2.243 5 5 5c1.29 0 2.457-.491 3.341-1.297.96-.877 1.56-2.14 1.649-3.546L13 15.5V8.414c.581.206 1.213.352 1.877.414.748.07 1.481-.015 2.175-.236.276-.088.43-.381.342-.657-.088-.276-.381-.43-.657-.342-.555.177-1.142.245-1.746.188-.467-.044-.918-.148-1.336-.305z"/>
              </svg>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Link 
              href="/devlogs"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Read my devlogs
              <ArrowUpRight size={16} />
            </Link>
            <Link 
              href="mailto:joehaiyuechen@gmail.com"
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
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
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
                    <h3 className="text-xl font-bold group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
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
                  {project.links.github && (
                    <Link 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Github size={14} />
                      Code
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
          <h2 className="text-2xl md:text-3xl font-bold">Latest Thoughts</h2>
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
            <h3 className="text-lg font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
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
            <h3 className="text-lg font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
              Coming up with a new app idea
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              I'm still working on Lift Card, but I want to start something new. Here's my thought process.
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