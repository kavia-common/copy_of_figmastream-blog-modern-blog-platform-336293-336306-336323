import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * BlogContext - Central state management for the blog platform
 * Handles all blog post CRUD operations with localStorage persistence
 */

// Initial mock data for demonstration
const INITIAL_POSTS = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    description: 'A comprehensive guide to understanding and using React Hooks in your modern React applications.',
    content: `# Getting Started with React Hooks

React Hooks revolutionized how we write React components. Introduced in React 16.8, hooks allow you to use state and other React features without writing a class component.

## Why Hooks?

Hooks solve several problems in React:
- **Reusing stateful logic** between components was difficult before hooks
- **Complex components** became hard to understand with lifecycle methods
- **Classes confuse** both humans and machines

## useState Hook

The \`useState\` hook lets you add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components:

\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Conclusion

Hooks make React code more reusable and composable. Start using them today!`,
    author: 'Jane Smith',
    authorAvatar: 'JS',
    publishDate: '2024-01-15',
    tags: ['React', 'JavaScript', 'Hooks'],
    image: null,
    likes: 42,
    bookmarks: 18,
    likedByUser: false,
    bookmarkedByUser: false,
  },
  {
    id: '2',
    title: 'Building Responsive Layouts with CSS Grid',
    description: 'Learn how to create complex, responsive web layouts using the powerful CSS Grid system.',
    content: `# Building Responsive Layouts with CSS Grid

CSS Grid is a powerful layout system available in CSS. It's a 2-dimensional system, meaning it can handle both columns and rows.

## Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Responsive Design with Grid

Using auto-fill and minmax creates truly responsive layouts:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
\`\`\`

## Named Grid Areas

Grid areas make your layout more semantic and readable.

## Conclusion

CSS Grid has transformed front-end development by making complex layouts achievable with minimal code.`,
    author: 'John Doe',
    authorAvatar: 'JD',
    publishDate: '2024-01-20',
    tags: ['CSS', 'Web Design', 'Responsive'],
    image: null,
    likes: 31,
    bookmarks: 12,
    likedByUser: false,
    bookmarkedByUser: false,
  },
  {
    id: '3',
    title: 'TypeScript Best Practices for 2024',
    description: 'Explore the latest TypeScript features and best practices to write more type-safe and maintainable code.',
    content: `# TypeScript Best Practices for 2024

TypeScript continues to evolve, and keeping up with best practices helps you write better, more maintainable code.

## Use Strict Mode

Always enable strict mode in your tsconfig:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Prefer Interfaces for Object Types

Interfaces are generally preferred for defining object shapes because they can be extended.

## Use Generics Wisely

Generics make your code reusable and type-safe:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Conclusion

TypeScript is an invaluable tool for building large-scale applications. Follow these practices to get the most out of it.`,
    author: 'Alice Johnson',
    authorAvatar: 'AJ',
    publishDate: '2024-02-01',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    image: null,
    likes: 56,
    bookmarks: 24,
    likedByUser: false,
    bookmarkedByUser: false,
  },
  {
    id: '4',
    title: 'The Power of Node.js Streams',
    description: 'Understanding streams in Node.js and how they can help you handle large amounts of data efficiently.',
    content: `# The Power of Node.js Streams

Streams are one of the fundamental concepts in Node.js. They allow you to read or write data piece by piece, without having to load the entire data into memory.

## Types of Streams

1. **Readable** - for reading operations
2. **Writable** - for writing operations
3. **Duplex** - for both reading and writing
4. **Transform** - for modifying data during reading/writing

## Working with Readable Streams

\`\`\`javascript
const fs = require('fs');
const readStream = fs.createReadStream('large-file.txt');
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
});
\`\`\`

## Piping Streams

Piping is the most elegant way to work with streams.

## Conclusion

Streams are essential for building performant Node.js applications that handle large data sets.`,
    author: 'Bob Williams',
    authorAvatar: 'BW',
    publishDate: '2024-02-10',
    tags: ['Node.js', 'JavaScript', 'Performance'],
    image: null,
    likes: 28,
    bookmarks: 9,
    likedByUser: false,
    bookmarkedByUser: false,
  },
];

const STORAGE_KEY = 'modern_blog_posts';

// Create context
export const BlogContext = createContext(null);

/**
 * BlogProvider - Provides blog state and actions to the entire app
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
// PUBLIC_INTERFACE
export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Persist to localStorage whenever posts change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save posts to localStorage:', e);
    }
  }, [posts]);

  /**
   * Get all unique tags from all posts
   */
  // PUBLIC_INTERFACE
  const getAllTags = useCallback(() => {
    const tagSet = new Set();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  /**
   * Get filtered posts based on search query and selected tags
   */
  // PUBLIC_INTERFACE
  const getFilteredPosts = useCallback(() => {
    return posts.filter(post => {
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));

      const matchesTags = selectedTags.length === 0 ||
        (post.tags && selectedTags.every(tag => post.tags.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  /**
   * Get a single post by ID
   */
  // PUBLIC_INTERFACE
  const getPostById = useCallback((id) => {
    return posts.find(post => post.id === id) || null;
  }, [posts]);

  /**
   * Create a new blog post
   */
  // PUBLIC_INTERFACE
  const createPost = useCallback((postData) => {
    const newPost = {
      id: Date.now().toString(),
      publishDate: new Date().toISOString().split('T')[0],
      likes: 0,
      bookmarks: 0,
      likedByUser: false,
      bookmarkedByUser: false,
      ...postData,
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  }, []);

  /**
   * Update an existing blog post
   */
  // PUBLIC_INTERFACE
  const updatePost = useCallback((id, updatedData) => {
    setPosts(prev =>
      prev.map(post => post.id === id ? { ...post, ...updatedData } : post)
    );
  }, []);

  /**
   * Delete a blog post
   */
  // PUBLIC_INTERFACE
  const deletePost = useCallback((id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  }, []);

  /**
   * Toggle like on a post
   */
  // PUBLIC_INTERFACE
  const toggleLike = useCallback((id) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          return {
            ...post,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  }, []);

  /**
   * Toggle bookmark on a post
   */
  // PUBLIC_INTERFACE
  const toggleBookmark = useCallback((id) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          return {
            ...post,
            bookmarkedByUser: !post.bookmarkedByUser,
            bookmarks: post.bookmarkedByUser ? post.bookmarks - 1 : post.bookmarks + 1,
          };
        }
        return post;
      })
    );
  }, []);

  /**
   * Toggle a tag in the selected tags filter
   */
  // PUBLIC_INTERFACE
  const toggleTagFilter = useCallback((tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  /**
   * Clear all filters
   */
  // PUBLIC_INTERFACE
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
  }, []);

  const value = {
    posts,
    searchQuery,
    setSearchQuery,
    selectedTags,
    getAllTags,
    getFilteredPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    toggleBookmark,
    toggleTagFilter,
    clearFilters,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}

/**
 * useBlog - Custom hook to access the BlogContext
 * @returns {Object} Blog context value
 */
// PUBLIC_INTERFACE
export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
