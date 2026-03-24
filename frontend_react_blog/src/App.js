import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import BookmarksPage from './pages/BookmarksPage';
import './App.css';

/**
 * App - Root component for the ModernBlog platform
 * Sets up routing and global state providers
 *
 * Routes:
 *   /            - HomePage: lists all blog posts
 *   /post/:id    - BlogDetailPage: full post view
 *   /create      - CreatePostPage: new post editor
 *   /edit/:id    - EditPostPage: edit existing post
 *   /bookmarks   - BookmarksPage: saved/bookmarked posts
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<BlogDetailPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            {/* 404 fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </BlogProvider>
  );
}

/**
 * NotFoundPage - 404 fallback page
 */
function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      gap: '16px',
      padding: '48px 24px',
      textAlign: 'center',
      background: '#f9fafb',
    }}>
      <span style={{ fontSize: '64px' }}>🌐</span>
      <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', margin: 0 }}>
        404 – Page Not Found
      </h1>
      <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '10px',
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '15px',
          marginTop: '8px',
        }}
      >
        ← Go Home
      </a>
    </div>
  );
}

export default App;
