export interface BlogPostMeta {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export function parseMarkdownFile(content: string): {
  meta: BlogPostMeta;
  content: string;
} {
  const lines = content.split('\n');
  
  // Extract frontmatter if present
  if (lines[0] === '---') {
    const metaEndIndex = lines.slice(1).indexOf('---') + 1;
    if (metaEndIndex > 0) {
      const metaLines = lines.slice(1, metaEndIndex);
      const contentLines = lines.slice(metaEndIndex + 2);
      
      const meta: Partial<BlogPostMeta> = {};
      
      metaLines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim();
          const cleanKey = key.trim();
          
          if (cleanKey === 'tags') {
            meta.tags = value.split(',').map(tag => tag.trim());
          } else if (cleanKey === 'title') {
            meta.title = value.replace(/['"]/g, '');
          } else if (cleanKey === 'excerpt') {
            meta.excerpt = value.replace(/['"]/g, '');
          } else if (cleanKey === 'date') {
            meta.date = value.replace(/['"]/g, '');
          } else if (cleanKey === 'readTime') {
            meta.readTime = value.replace(/['"]/g, '');
          }
        }
      });
      
      return {
        meta: meta as BlogPostMeta,
        content: contentLines.join('\n')
      };
    }
  }
  
  // Fallback: extract from content structure
  const title = lines.find(line => line.startsWith('# '))?.substring(2) || 'Untitled';
  const firstParagraph = lines.find(line => line.trim() && !line.startsWith('#'))?.substring(0, 160) + '...' || '';
  
  return {
    meta: {
      title,
      excerpt: firstParagraph,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: estimateReadTime(content),
      tags: []
    },
    content
  };
}

export function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function createMarkdownTemplate(title: string, tags: string[] = []): string {
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `---
title: ${title}
excerpt: A brief description of your post
date: ${date}
tags: ${tags.join(', ')}
---

# ${title}

Your content goes here...

## Section 1

Write your thoughts...

## Section 2

More content...

## Conclusion

Wrap up your thoughts...
`;
}

// Helper to format markdown for better readability
export function formatMarkdown(content: string): string {
  return content
    // Ensure proper spacing around headers
    .replace(/^(#{1,6})\s*(.+)$/gm, (_, hashes, title) => {
      return `\n${hashes} ${title.trim()}\n`;
    })
    // Ensure proper spacing around paragraphs
    .replace(/\n{3,}/g, '\n\n')
    // Clean up extra spaces
    .replace(/[ \t]+$/gm, '')
    .trim();
}