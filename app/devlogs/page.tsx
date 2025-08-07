import Link from "next/link";
import { Calendar, Clock, Eye, Heart } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog-data";

export default function DevlogsPage() {
  const devlogs = getAllBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <section className="mb-16 animate-fade-in">
        <h1 className="text-black dark:gradient-text text-3xl md:text-5xl font-bold mb-4">
          Developer Logs
        </h1>
        <p className="text-lg text-gray-800 dark:text-gray-400 max-w-2xl">
          Insights, lessons, and thoughts from building products that people actually use.
        </p>
      </section>

      <section className="space-y-8">
        {devlogs.map((devlog, index) => (
          <article 
            key={devlog.id} 
            className="group border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {devlog.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <Link href={`/devlogs/${devlog.id}`}>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                {devlog.title}
              </h2>
            </Link>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-500 mb-4 font-mono">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={devlog.date.replace(/ /g, "-")}>
                  {devlog.date}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{devlog.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{devlog.views.toLocaleString()} views</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span>{devlog.likes} likes</span>
              </div>
            </div>
            
            <p className="text-gray-800 dark:text-gray-400 mb-6 leading-relaxed">
              {devlog.excerpt}
            </p>
            
            <Link 
              href={`/devlogs/${devlog.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white hover:opacity-70 transition-opacity"
            >
              Continue reading
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}