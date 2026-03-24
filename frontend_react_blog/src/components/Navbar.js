import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

/**
 * Navbar - Top navigation bar for the blog platform
 * Provides navigation links and a create post button
 */
// PUBLIC_INTERFACE
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = () => {
    setMenuOpen(false);
    navigate('/create');
  };

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.container}>
        {/* Logo / Brand */}
        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.brandIcon}>✍️</span>
          <span className={styles.brandName}>ModernBlog</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/bookmarks" className={styles.navLink}>Bookmarks</Link>
        </div>

        {/* Create Post Button - Desktop */}
        <div className={styles.navActions}>
          <button
            className={styles.createBtn}
            onClick={handleCreatePost}
            aria-label="Create new post"
          >
            <span className={styles.createBtnIcon}>+</span>
            New Post
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon}>
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="menu">
          <Link
            to="/"
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            Home
          </Link>
          <Link
            to="/bookmarks"
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            Bookmarks
          </Link>
          <button
            className={styles.mobileCreateBtn}
            onClick={handleCreatePost}
            role="menuitem"
          >
            + New Post
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
