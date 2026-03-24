import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import styles from './HomePage.module.css';

/**
 * HomePage - Main landing page displaying blog post grid
 * Shows search/filter bar, post count, and responsive post card grid
 */
// PUBLIC_INTERFACE
function HomePage() {
  const { getFilteredPosts, deletePost } = useBlog();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filteredPosts = getFilteredPosts();

  const handleDeleteRequest = (id) => {
    setConfirmDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (confirmDeleteId) {
      deletePost(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteId(null);
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Stories That
            <span className={styles.heroTitleAccent}> Matter</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Read, write, and explore articles on technology, programming, and beyond.
          </p>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className={styles.searchSection} aria-label="Search and filter">
        <div className={styles.container}>
          <SearchBar />
        </div>
      </section>

      {/* Posts Grid */}
      <section className={styles.postsSection} aria-label="Blog posts">
        <div className={styles.container}>
          {/* Post Count */}
          <div className={styles.postsHeader}>
            <p className={styles.postCount}>
              {filteredPosts.length === 0
                ? 'No posts found'
                : `${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Grid or Empty State */}
          {filteredPosts.length > 0 ? (
            <div className={styles.postsGrid} role="list">
              {filteredPosts.map(post => (
                <div key={post.id} role="listitem">
                  <PostCard
                    post={post}
                    onDelete={handleDeleteRequest}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState} role="status">
              <div className={styles.emptyIcon} aria-hidden="true">📭</div>
              <h2 className={styles.emptyTitle}>No posts found</h2>
              <p className={styles.emptyMessage}>
                Try adjusting your search terms or filters, or create the first post!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          onClick={handleDeleteCancel}
        >
          <div
            className={styles.modal}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalIcon} aria-hidden="true">🗑️</div>
            <h3 id="delete-modal-title" className={styles.modalTitle}>Delete Post?</h3>
            <p className={styles.modalMessage}>
              This action cannot be undone. The post will be permanently removed.
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.modalCancelBtn}
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                className={styles.modalDeleteBtn}
                onClick={handleDeleteConfirm}
                autoFocus
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default HomePage;
