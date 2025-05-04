import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

// Sample devlog data - in a real app, this would come from a database or API
const devlogs = [
  {
    id: 1,
    title: "What I've learned from building Lift Card (and future plans)",
    excerpt: "Over 50,000 downloads, ~5,000+ daily active users and growing. Here's everything I've learned.",
    date: "May 4th, 2025",
    readTime: "5 min read",
  },
  
];

export default function DevlogsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight font-mono">Devlogs</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl font-mono">
        Things I've learned, written out.
        </p>
      </section>

      <section className="space-y-6">
        {devlogs.map((devlog) => (
          <article key={devlog.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
            <Link href={`/devlogs/${devlog.id}`}>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono">
                {devlog.title}
              </h2>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <time dateTime={devlog.date.replace(/ /g, "-")}>
                  {devlog.date}
                </time>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{devlog.readTime}</span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 font-mono">
              {devlog.excerpt}
            </p>
            
            <Link 
              href={`/devlogs/${devlog.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-mono"
            >
              Read more →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}