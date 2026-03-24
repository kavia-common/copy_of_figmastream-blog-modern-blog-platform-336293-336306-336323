import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import styles from './BlogDetailPage.module.css';

/**
 * Formats a date string to a human-readable format
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Simple markdown renderer for post content
 */
function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/```[\w]*\n([\s\S]+?)```/gm, '<pre><code>$1</code></pre>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/gm, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');
}

/**
 * BlogDetailPage - Full blog post detail view
 * Shows complete post content with markdown rendering, author info, and interactions
 */
// PUBLIC_INTERFACE
function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, toggleLike, toggleBookmark, deletePost } = useBlog();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const post = getPostById(id);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundIcon}>🔍</div>
        <h1 className={styles.notFoundTitle}>Post Not Found</h1>
        <p className={styles.notFoundMessage}>
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className={styles.backHomeBtn}>← Back to Home</Link>
      </div>
    );
  }

  const handleLike = () => toggleLike(post.id);
  const handleBookmark = () => toggleBookmark(post.id);

  const handleDeleteConfirm = () => {
    deletePost(post.id);
    navigate('/');
  };

  return (
    <main className={styles.main}>
      {/* Back navigation */}
      <div className={styles.backNav}>
        <div className={styles.container}>
          <Link to="/" className={styles.backLink}>
            ← Back to all posts
          </Link>
        </div>
      </div>

      <article className={styles.article}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags} aria-label="Post tags">
                {post.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className={styles.title}>{post.title}</h1>

            {/* Description */}
            <p className={styles.description}>{post.description}</p>

            {/* Meta */}
            <div className={styles.meta}>
              <div className={styles.authorSection}>
                <div className={styles.authorAvatar} aria-hidden="true">
                  {post.authorAvatar || (post.author ? post.author.charAt(0).toUpperCase() : '?')}
                </div>
                <div>
                  <p className={styles.authorName}>{post.author || 'Anonymous'}</p>
                  <time className={styles.publishDate} dateTime={post.publishDate}>
                    {formatDate(post.publishDate)}
                  </time>
                </div>
              </div>

              {/* Post Actions */}
              <div className={styles.postActions}>
                <button
                  className={`${styles.actionBtn} ${post.likedByUser ? styles.liked : ''}`}
                  onClick={handleLike}
                  aria-label={post.likedByUser ? 'Unlike' : 'Like'}
                  aria-pressed={post.likedByUser}
                >
                  <span>{post.likedByUser ? '❤️' : '🤍'}</span>
                  <span>{post.likes}</span>
                </button>
                <button
                  className={`${styles.actionBtn} ${post.bookmarkedByUser ? styles.bookmarked : ''}`}
                  onClick={handleBookmark}
                  aria-label={post.bookmarkedByUser ? 'Remove bookmark' : 'Bookmark'}
                  aria-pressed={post.bookmarkedByUser}
                >
                  <span>{post.bookmarkedByUser ? '🔖' : '📄'}</span>
                  <span>{post.bookmarks}</span>
                </button>
                <Link
                  to={`/edit/${post.id}`}
                  className={styles.editLink}
                  aria-label="Edit post"
                >
                  ✏️ Edit
                </Link>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setShowDeleteModal(true)}
                  aria-label="Delete post"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.image && (
            <div className={styles.coverImageWrapper}>
              <img
                src={post.image}
                alt={`Cover for ${post.title}`}
                className={styles.coverImage}
              />
            </div>
          )}

          {/* Content */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            aria-label="Post content"
          />

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerTags}>
              <span className={styles.footerTagsLabel}>Tags:</span>
              {post.tags && post.tags.map(tag => (
                <span key={tag} className={styles.footerTag}>{tag}</span>
              ))}
            </div>
            <div className={styles.footerActions}>
              <button
                className={`${styles.footerActionBtn} ${post.likedByUser ? styles.liked : ''}`}
                onClick={handleLike}
                aria-label={post.likedByUser ? 'Unlike' : 'Like post'}
              >
                {post.likedByUser ? '❤️' : '🤍'} {post.likes} Likes
              </button>
              <button
                className={`${styles.footerActionBtn} ${post.bookmarkedByUser ? styles.bookmarked : ''}`}
                onClick={handleBookmark}
                aria-label={post.bookmarkedByUser ? 'Remove bookmark' : 'Bookmark post'}
              >
                {post.bookmarkedByUser ? '🔖' : '📄'} {post.bookmarks} Bookmarks
              </button>
            </div>
          </footer>
        </div>
      </article>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className={styles.modal}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalIcon}>🗑️</div>
            <h2 id="delete-title" className={styles.modalTitle}>Delete Post?</h2>
            <p className={styles.modalMessage}>
              This action cannot be undone. The post will be permanently removed.
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.modalCancelBtn}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.modalDeleteBtn}
                onClick={handleDeleteConfirm}
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

export default BlogDetailPage;
