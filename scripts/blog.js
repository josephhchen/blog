#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');
const BLOG_DATA_FILE = path.join(__dirname, '../lib/blog-data.ts');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

function createPost(title, tags = []) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const template = `---
title: ${title}
excerpt: A brief description of your post
date: ${date}
tags: ${tags.join(', ')}
---

# ${title}

Your content goes here...

## Introduction

Start writing your thoughts...

## Main Content

Continue with your main points...

## Conclusion

Wrap up your thoughts...
`;

  const filename = `${slug}.md`;
  const filepath = path.join(POSTS_DIR, filename);
  
  if (fs.existsSync(filepath)) {
    console.error(`❌ Post "${filename}" already exists!`);
    return;
  }
  
  fs.writeFileSync(filepath, template);
  console.log(`✅ Created new post: ${filename}`);
  console.log(`📝 Edit at: ${filepath}`);
}

function listPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('📝 No posts directory found. Create your first post!');
    return;
  }
  
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('📝 No posts found. Create your first post!');
    return;
  }
  
  console.log('📚 Available posts:');
  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
}

function generateBlogData() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('📝 No posts directory found.');
    return;
  }
  
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  const posts = [];
  
  files.forEach((file, index) => {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const lines = content.split('\n');
    
    // Parse frontmatter
    if (lines[0] === '---') {
      const metaEndIndex = lines.slice(1).indexOf('---') + 1;
      if (metaEndIndex > 0) {
        const metaLines = lines.slice(1, metaEndIndex);
        const contentLines = lines.slice(metaEndIndex + 2);
        
        const meta = {};
        metaLines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim().replace(/['"]/g, '');
            if (key.trim() === 'tags') {
              meta[key.trim()] = value.split(',').map(tag => tag.trim());
            } else {
              meta[key.trim()] = value;
            }
          }
        });
        
        const wordsPerMinute = 200;
        const words = contentLines.join(' ').split(/\s+/).length;
        const readTime = Math.ceil(words / wordsPerMinute);
        
        posts.push({
          id: index + 1,
          title: meta.title || 'Untitled',
          excerpt: meta.excerpt || contentLines.find(line => line.trim())?.substring(0, 160) + '...' || '',
          content: contentLines.join('\n'),
          date: meta.date || new Date().toLocaleDateString('en-US'),
          readTime: `${readTime} min read`,
          likes: Math.floor(Math.random() * 100),
          views: Math.floor(Math.random() * 2000) + 100,
          tags: meta.tags || []
        });
      }
    }
  });
  
  console.log(`✅ Generated data for ${posts.length} posts`);
  console.log('📄 Update your blog-data.ts file with this data if needed.');
}

// CLI handling
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'create':
  case 'new':
    if (!args[0]) {
      console.error('❌ Please provide a title: npm run blog create "My Post Title"');
      process.exit(1);
    }
    const tags = args.slice(1);
    createPost(args[0], tags);
    break;
    
  case 'list':
  case 'ls':
    listPosts();
    break;
    
  case 'generate':
  case 'build':
    generateBlogData();
    break;
    
  default:
    console.log(`
📝 Blog Management CLI

Usage:
  npm run blog create "My Post Title" [tag1] [tag2]  - Create a new post
  npm run blog list                                  - List all posts  
  npm run blog generate                             - Generate blog data

Examples:
  npm run blog create "My First Post" startup tech
  npm run blog list
  npm run blog generate
    `);
}