import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { JSX } from "react";
import { Metadata } from "next";

// Define the type for devlog items
type Devlog = {
  id: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
};

// Sample devlog data - in a real app, this would likely come from a CMS or database
const devlogs: Devlog[] = [
  {
    id: 1,
    title: "What I've learned from building Lift Card (and future plans)",
    content: `
# Why did I build Lift Card?

In December of 2022, as a sophomore in college, I decided to learn mobile application development. At the time, I didn't have a MacBook, so I was forced to use React Native. 

Lift Card started out as a simple to-do list. I was heavily inspired by [Takuya Matsuyama](https://www.youtube.com/@devaslife), an indie developer based in Japan. 

After following a couple of his tutorials, I decided to build a simple workout tracker. At the time, I went to the gym basically everyday and I wanted to build something that I would use. Other fitness apps were charging a subscription fee, and I wanted to build something that was completely free.

## Mistakes I made, and what I've learned.

When Lift Card first started gaining traction in July 2023, I wasn’t ready.

Thousands of users poured in. I should’ve celebrated, but instead, I panicked. My inbox was filled with feedback—feature requests, bug reports, passionate messages from people who actually cared. But I didn’t know how to process it all. I didn’t prioritize the voices of my users. Instead, I doubled down on my own vision, thinking I knew best. That was my biggest mistake.
I remember seeing the user count slowly go up. 100, 1000, 15000, 30000. I was pulling my hairs out during my software engineering intership. I was working 9-5, and then coming home to work on Lift Card. I was exhausted, and I didn't know how to handle the influx of users

I rebuilt the app from the ground up in November of 2024, and took all of the previous feedback into account. After re-releasing (and a tiny bit of marketing), the app is in a pretty solid place. We're currently sitting at over 5,000 daily active users! Extremely proud of the work that has been put in, but I know there's so much more to do.

Here's the takeaway: You don’t build a great product alone, you build it with people who believe in your vision, even when you don’t yet know where it’s going.
## What's next?

I've asked one of my good friends, [Colin Hwang](https://www.colinhwang.dev/), to join me on this journey. Having a co-founder to bounce ideas off of allows us to keep iterating and building new features that users genuinely enjoy. He's currently focused on the diet tracking, workout automation side of the app, while I'm focused on the social aspect of the app.

After doing some thinking, I realized that the virality of the app came from the social aspect. There are a ton of workout trackers out there, so why did Lift Card blow up? The ability to meet people all over the world brought in new users. I believe health and fitness should be a social, and I wanted to bring that to the app.

So what's next? Revamping the social aspect of the app. I'm currently working on a new feature called "Clubs", and this is going to allow people who go to the same gym to connect with each other, see each other's workouts, and cheer each other on. I've always been fascinated by the concept of building a community, and I am so excited to bring this to the app.

I'm going to combine the "Discover Page" (which shows a list of gym goers who you can follow) with the "Clubs" feature, and have the previous Discover Page be a page where you can easily see your friends progress in the gym.

## The Challenges Ahead

Building a social app is difficult, but I think the hardest part is going to be the marketing. I have no experience marketing, and I don't know what works consistently yet. Once this is figured out, there's no way Lift Card doesn't become a household name, like Instagram / Tiktok.

If you're reading this, thank you for joining me on this adventure. I plan to update this devlog regularly with my progress, challenges, and insights.

Here's to building cool things!
    `,
    date: "May 4th, 2025",
    readTime: "3 min read",
  },
];

// In Next.js 15, params is a Promise
type ParamsType = Promise<{ id: string }>;

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: ParamsType 
}): Promise<Metadata> {
  const { id } = await params;
  const devlog = devlogs.find(d => d.id === parseInt(id));
  
  if (!devlog) {
    return {
      title: "Devlog Not Found",
    };
  }
  
  return {
    title: devlog.title,
    description: devlog.content.substring(0, 160) + "...",
    icons: {
      icon: '/eyeglasses.png',
    },
  };
}

// Server Component version - use this if your page doesn't need client interactivity
export default async function DevlogPage({ 
  params 
}: { 
  params: ParamsType 
}) {
  const { id } = await params;
  const devlog = devlogs.find(d => d.id === parseInt(id));
  
  if (!devlog) {
    return (
      <div className="flex flex-col items-center justify-center py-20 font-mono">
        <h1 className="text-2xl font-bold mb-4">Devlog Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The devlog you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/devlogs"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Devlogs
        </Link>
      </div>
    );
  }

  // Function to convert markdown to HTML
  const renderMarkdown = (content: string) => {
    // Handle links with [text](url) format
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');
    
    const headings = content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-6">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-5 mb-3">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2 list-disc">{line.substring(2)}</li>;
      } else if (line.match(/^\d+\. /)) {
        return <li key={index} className="ml-6 mb-2 list-decimal">{line.substring(line.indexOf(' ') + 1)}</li>;
      } else if (line === '') {
        return <br key={index} />;
      } else {
        if (line.includes('<a href')) {
          return <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: line }} />;
        } else {
          return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
        }
      }
    });

    // Group list items
    const elements: JSX.Element[] = [];
    let listItems: JSX.Element[] = [];
    let isOrderedList = false;

    headings.forEach((element, index) => {
      if (element.type === 'li') {
        const isOrdered = element.props.className.includes('list-decimal');
        
        if (listItems.length === 0 || isOrdered === isOrderedList) {
          listItems.push(element);
          isOrderedList = isOrdered;
        } else {
          // Add the previous list to elements
          elements.push(
            isOrderedList 
              ? <ol key={`ol-${index}`} className="mb-4">{listItems}</ol>
              : <ul key={`ul-${index}`} className="mb-4">{listItems}</ul>
          );
          
          // Start a new list
          listItems = [element];
          isOrderedList = isOrdered;
        }
      } else {
        // If we have list items, add them to elements before adding the non-list element
        if (listItems.length > 0) {
          elements.push(
            isOrderedList 
              ? <ol key={`ol-${index}`} className="mb-4">{listItems}</ol>
              : <ul key={`ul-${index}`} className="mb-4">{listItems}</ul>
          );
          listItems = [];
        }
        
        elements.push(element);
      }
    });

    // Add any remaining list items
    if (listItems.length > 0) {
      elements.push(
        isOrderedList 
          ? <ol key="ol-final" className="mb-4">{listItems}</ol>
          : <ul key="ul-final" className="mb-4">{listItems}</ul>
      );
    }

    return elements;
  };

  return (
    <article className="max-w-3xl mx-auto font-mono">
      <div className="mb-8">
        <Link
          href="/devlogs"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Devlogs
        </Link>
        
        <h1 className="text-3xl font-bold mb-3">{devlog.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
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
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {renderMarkdown(devlog.content)}
      </div>
      
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            Thanks for reading!
          </span>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
              Like
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* 
// Client Component version - uncomment and use "use client" directive if you need client-side interactivity
// "use client";

import { use } from "react";

export default function DevlogPageClient({ 
  params 
}: { 
  params: ParamsType 
}) {
  const { id } = use(params); // use() hook for client components
  const devlog = devlogs.find(d => d.id === parseInt(id));
  
  // Rest of the component implementation...
}
*/