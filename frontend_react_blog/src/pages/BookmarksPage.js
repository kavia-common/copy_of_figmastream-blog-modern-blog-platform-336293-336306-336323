import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import styles from './BookmarksPage.module.css';

/**
 * BookmarksPage - Shows all bookmarked posts
 * Filters posts that have been bookmarked by the user
 */
// PUBLIC_INTERFACE
function BookmarksPage() {
  const { posts, deletePost } = useBlog();
  const bookmarkedPosts = posts.filter(post => post.bookmarkedByUser);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  };

  return (
    <main className={styles.main}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>
            🔖 Bookmarks
          </h1>
          <p className={styles.pageSubtitle}>
            {bookmarkedPosts.length > 0
              ? `You have ${bookmarkedPosts.length} bookmarked post${bookmarkedPosts.length !== 1 ? 's' : ''}`
              : 'No bookmarks yet'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className={styles.container}>
          {bookmarkedPosts.length > 0 ? (
            <div className={styles.postsGrid} role="list">
              {bookmarkedPosts.map(post => (
                <div key={post.id} role="listitem">
                  <PostCard
                    post={post}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState} role="status">
              <div className={styles.emptyIcon} aria-hidden="true">🔖</div>
              <h2 className={styles.emptyTitle}>No Bookmarks Yet</h2>
              <p className={styles.emptyMessage}>
                Start bookmarking posts you want to read later.
                Click the bookmark icon on any post to save it here.
              </p>
              <Link to="/" className={styles.exploreBtn}>
                Explore Posts →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default BookmarksPage;
