import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Eye, Share2 } from "lucide-react";
import { Metadata } from "next";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data";
import LikeButton from "@/components/LikeButton";
import ViewTracker from "@/components/ViewTracker";

// In Next.js 15, params is a Promise
type ParamsType = Promise<{ id: string }>;

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: ParamsType 
}): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(parseInt(id));
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    icons: {
      icon: '/eyeglasses.png',
    },
  };
}

// Markdown renderer component
function MarkdownRenderer({ content }: { content: string }) {
  // Handle links with [text](url) format
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">$1</a>');
  
  const elements = content.split('\n').map((line, index) => {
    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-3xl md:text-4xl font-bold mt-12 mb-6 first:mt-0">
          {line.substring(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-bold mt-10 mb-5">
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      return (
        <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4">
          {line.substring(4)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      return (
        <li key={index} className="ml-6 mb-3 list-disc text-gray-700 dark:text-gray-300 leading-relaxed">
          {line.substring(2)}
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      return (
        <li key={index} className="ml-6 mb-3 list-decimal text-gray-700 dark:text-gray-300 leading-relaxed">
          {line.substring(line.indexOf(' ') + 1)}
        </li>
      );
    } else if (line === '') {
      return <div key={index} className="h-4" />;
    } else {
      if (line.includes('<a href')) {
        return (
          <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg" 
             dangerouslySetInnerHTML={{ __html: line }} />
        );
      } else {
        return (
          <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {line}
          </p>
        );
      }
    }
  });

  return <div className="prose-custom max-w-none">{elements}</div>;
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: ParamsType 
}) {
  const { id } = await params;
  const post = getBlogPost(parseInt(id));
  const allPosts = getAllBlogPosts();
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-800 dark:text-gray-400 mb-8">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/devlogs"
          className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to Devlogs
        </Link>
      </div>
    );
  }

  // Get other posts for suggestions
  const otherPosts = allPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <>
      <ViewTracker postId={post.id} />
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/devlogs"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Back to Devlogs
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 animate-slide-up">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-500 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.date.replace(/ /g, "-")}>
                {post.date}
              </time>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="mb-16 animate-slide-up">
          <MarkdownRenderer content={post.content} />
        </div>
        
        {/* Engagement Section */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <LikeButton postId={post.id} initialLikes={post.likes} />
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105">
                <Share2 size={16} />
                <span className="text-sm">Share</span>
              </button>
            </div>
            
            <span className="text-gray-500 dark:text-gray-500 text-sm font-mono">
              Thanks for reading!
            </span>
          </div>
        </div>

        {/* Related Posts */}
        {otherPosts.length > 0 && (
          <section className="border-t border-gray-200/50 dark:border-gray-800/50 pt-16">
            <h2 className="text-2xl font-bold mb-8">More Posts</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {otherPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/devlogs/${relatedPost.id}`}
                  className="group block border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 font-mono">
                    <span>{relatedPost.date}</span>
                    <span>•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}