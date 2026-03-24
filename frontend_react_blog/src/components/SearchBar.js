import React from 'react';
import { useBlog } from '../context/BlogContext';
import styles from './SearchBar.module.css';

/**
 * SearchBar - Search and filter component for blog posts
 * Provides text search and tag-based filtering
 */
// PUBLIC_INTERFACE
function SearchBar() {
  const { searchQuery, setSearchQuery, getAllTags, selectedTags, toggleTagFilter, clearFilters } = useBlog();
  const allTags = getAllTags();
  const hasFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className={styles.searchContainer} role="search">
      {/* Search Input */}
      <div className={styles.inputWrapper}>
        <span className={styles.searchIcon} aria-hidden="true">🔍</span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search posts by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search blog posts"
        />
        {searchQuery && (
          <button
            className={styles.clearInputBtn}
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className={styles.tagsRow} aria-label="Filter by tags">
          <span className={styles.tagsLabel}>Filter:</span>
          <div className={styles.tagsList}>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`${styles.tagBtn} ${selectedTags.includes(tag) ? styles.tagBtnActive : ''}`}
                onClick={() => toggleTagFilter(tag)}
                aria-pressed={selectedTags.includes(tag)}
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
          {hasFilters && (
            <button
              className={styles.clearAllBtn}
              onClick={clearFilters}
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
