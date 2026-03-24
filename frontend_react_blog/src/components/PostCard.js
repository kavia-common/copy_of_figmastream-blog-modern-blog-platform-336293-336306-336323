import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import styles from './PostCard.module.css';

/**
 * Formats a date string to a human-readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
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
 * PostCard - Displays a blog post summary in card format
 * Shows title, description, author, date, tags, and action buttons
 * @param {Object} props - Component props
 * @param {Object} props.post - The blog post data
 * @param {Function} [props.onDelete] - Optional delete callback
 */
// PUBLIC_INTERFACE
function PostCard({ post, onDelete }) {
  const { toggleLike, toggleBookmark } = useBlog();

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(post.id);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(post.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(post.id);
  };

  return (
    <article className={styles.card} aria-label={`Blog post: ${post.title}`}>
      {/* Post Image */}
      {post.image && (
        <div className={styles.imageWrapper}>
          <img src={post.image} alt={post.title} className={styles.image} loading="lazy" />
        </div>
      )}

      <div className={styles.cardBody}>
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags} aria-label="Tags">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
            {post.tags.length > 3 && (
              <span className={styles.tagMore}>+{post.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Title */}
        <Link to={`/post/${post.id}`} className={styles.titleLink}>
          <h2 className={styles.title}>{post.title}</h2>
        </Link>

        {/* Description */}
        <p className={styles.description}>{post.description}</p>

        {/* Author & Date */}
        <div className={styles.meta}>
          <div className={styles.author}>
            <div className={styles.authorAvatar} aria-hidden="true">
              {post.authorAvatar || (post.author ? post.author.charAt(0).toUpperCase() : '?')}
            </div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author || 'Anonymous'}</span>
              <span className={styles.publishDate}>
                <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.actionGroup}>
            {/* Like */}
            <button
              className={`${styles.actionBtn} ${post.likedByUser ? styles.liked : ''}`}
              onClick={handleLike}
              aria-label={post.likedByUser ? 'Unlike post' : 'Like post'}
              aria-pressed={post.likedByUser}
            >
              <span className={styles.actionIcon}>{post.likedByUser ? '❤️' : '🤍'}</span>
              <span className={styles.actionCount}>{post.likes}</span>
            </button>

            {/* Bookmark */}
            <button
              className={`${styles.actionBtn} ${post.bookmarkedByUser ? styles.bookmarked : ''}`}
              onClick={handleBookmark}
              aria-label={post.bookmarkedByUser ? 'Remove bookmark' : 'Bookmark post'}
              aria-pressed={post.bookmarkedByUser}
            >
              <span className={styles.actionIcon}>{post.bookmarkedByUser ? '🔖' : '📄'}</span>
              <span className={styles.actionCount}>{post.bookmarks}</span>
            </button>
          </div>

          <div className={styles.editGroup}>
            {/* Edit */}
            <Link
              to={`/edit/${post.id}`}
              className={styles.editBtn}
              aria-label="Edit post"
              onClick={e => e.stopPropagation()}
            >
              ✏️ Edit
            </Link>

            {/* Delete */}
            {onDelete && (
              <button
                className={styles.deleteBtn}
                onClick={handleDelete}
                aria-label="Delete post"
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
