export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  likes: number;
  views: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "What I've learned from building Lift Card (and future plans)",
    excerpt: "Over 50,000 downloads, ~5,000+ daily active users and growing. Here's everything I've learned.",
    content: `
# Why did I build Lift Card?

In December of 2022, as a sophomore in college, I decided to learn mobile application development. At the time, I didn't have a MacBook, so I was forced to use React Native. 

Lift Card started out as a simple to-do list. I was heavily inspired by [Takuya Matsuyama](https://www.youtube.com/@devaslife), an indie developer based in Japan. 

After following a couple of his tutorials, I decided to build a simple workout tracker. At the time, I went to the gym basically everyday and I wanted to build something that I would use. Other fitness apps were charging a subscription fee, and I wanted to build something that was completely free.

## Mistakes I made, and what I've learned.

When Lift Card first started gaining traction in July 2023, I wasn't ready.

Thousands of users poured in. I should've celebrated, but instead, I panicked. My inbox was filled with feedback—feature requests, bug reports, passionate messages from people who actually cared. But I didn't know how to process it all. I didn't prioritize the voices of my users. Instead, I doubled down on my own vision, thinking I knew best. That was my biggest mistake.
I remember seeing the user count slowly go up. 100, 1000, 15000, 30000. I was pulling my hairs out during my software engineering intership. I was working 9-5, and then coming home to work on Lift Card. I was exhausted, and I didn't know how to handle the influx of users

I rebuilt the app from the ground up in November of 2024, and took all of the previous feedback into account. After re-releasing (and a tiny bit of marketing), the app is in a pretty solid place. We're currently sitting at over 5,000 daily active users! Extremely proud of the work that has been put in, but I know there's so much more to do.

Here's the takeaway: You don't build a great product alone, you build it with people who believe in your vision, even when you don't yet know where it's going.
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
    readTime: "5 min read",
    likes: 42,
    views: 1337,
    tags: ["startup", "mobile", "react-native", "fitness"]
  },
  {
    id: 2,
    title: "Coming up with a new app idea",
    excerpt: "I'm still working on Lift Card, but I want to start something new. Here's my thought process.",
    content: `
    This devlog is a brain dump, you'll be able to see my thought process on how I come up with a new app idea.

    ## Market Research

    With Lift Card, I got lucky. I didn't do any market research, and I just built something that I wanted to use (and luckily others wanted to use). But now, I want to be more strategic about it.

    I'm looking for problems that affect a large number of people, but haven't been solved well yet. I want to build something that people will actually use and pay for.

    ## Current Ideas

    Here are a few ideas I'm considering:

    1. **Personal Finance Tracker** - There are tons of these, but most are either too complex or don't sync well with banks
    2. **Study Companion** - Something to help students stay focused and track their progress
    3. **Local Event Discovery** - Finding interesting events happening near you
    
    I'm leaning towards the study companion idea because I think there's a real need for better study tools, especially for college students.

    ## Next Steps

    I'm going to start by talking to potential users to understand their pain points better. No point in building something nobody wants.

    Stay tuned for updates on this journey!
    `,
    date: "May 4th, 2025",
    readTime: "3 min read",
    likes: 15,
    views: 892,
    tags: ["ideation", "startup", "research"]
  },
];

// In a real app, these would be stored in a database
const blogStats = new Map<number, { likes: number; views: number }>();

// Initialize with default values
blogPosts.forEach(post => {
  blogStats.set(post.id, { likes: post.likes, views: post.views });
});

export function getBlogPost(id: number): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.map(post => ({
    ...post,
    likes: blogStats.get(post.id)?.likes ?? post.likes,
    views: blogStats.get(post.id)?.views ?? post.views,
  }));
}

export function incrementViews(id: number): number {
  const current = blogStats.get(id) ?? { likes: 0, views: 0 };
  const newViews = current.views + 1;
  blogStats.set(id, { ...current, views: newViews });
  return newViews;
}

export function toggleLike(id: number): { likes: number; isLiked: boolean } {
  const current = blogStats.get(id) ?? { likes: 0, views: 0 };
  // In a real app, you'd track which users liked which posts
  // For now, we'll just increment/decrement
  const newLikes = current.likes + 1; // Simplified - always increment
  blogStats.set(id, { ...current, likes: newLikes });
  return { likes: newLikes, isLiked: true };
}