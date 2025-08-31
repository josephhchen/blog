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

import fs from 'fs';
import path from 'path';

function getPostContent(id: number): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'content', 'posts', `${id}.md`), 'utf-8');
  } catch {
    return '';
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "What I've learned from building Lift Card (and future plans)",
    excerpt: "Over 50,000 downloads, ~5,000+ daily active users and growing. Here's everything I've learned.",
    content: getPostContent(1),
    date: "May 4th, 2025",
    readTime: "5 min read",
    likes: 42,
    views: 1337,
    tags: ["startup", "mobile", "react-native", "fitness"]
  },
  {
    id: 2,
    title: "What does Success Truly Mean?",
    excerpt: "Growing up I always thought that success meant making X amount of money, getting X job, but I've recently been exploring that idea that success is so much more.",
    content: getPostContent(2),
    date: "August 31st, 2025",
    readTime: "5 min read",
    likes: 15,
    views: 892,
    tags: ["purpose", "success"]
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