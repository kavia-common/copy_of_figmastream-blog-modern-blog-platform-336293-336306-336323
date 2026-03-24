import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Footer - Site footer with links and branding
 */
// PUBLIC_INTERFACE
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.brandLink}>
              <span className={styles.brandIcon}>✍️</span>
              <span className={styles.brandName}>ModernBlog</span>
            </Link>
            <p className={styles.brandTagline}>
              A modern platform for sharing ideas and stories.
            </p>
          </div>

          {/* Links */}
          <nav className={styles.nav} aria-label="Footer navigation">
            <div className={styles.navColumn}>
              <h3 className={styles.navTitle}>Navigation</h3>
              <ul className={styles.navList}>
                <li><Link to="/" className={styles.navLink}>Home</Link></li>
                <li><Link to="/bookmarks" className={styles.navLink}>Bookmarks</Link></li>
                <li><Link to="/create" className={styles.navLink}>Write a Post</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} ModernBlog. Built with React & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
