import React, { useState, useEffect } from 'react';
import styles from './Editor.module.css';

/**
 * Editor - Rich text editor component for creating and editing blog posts
 * Supports title, content (with preview), tags, author info, and optional image URL
 * @param {Object} props - Component props
 * @param {Object} [props.initialData] - Initial post data for editing
 * @param {Function} props.onSave - Callback when post is saved
 * @param {Function} [props.onCancel] - Callback when editing is cancelled
 * @param {boolean} [props.isEditing] - Whether in edit mode
 */
// PUBLIC_INTERFACE
function Editor({ initialData, onSave, onCancel, isEditing = false }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setContent(initialData.content || '');
      setAuthor(initialData.author || '');
      setTagsInput(initialData.tags?.join(', ') || '');
      setImage(initialData.image || '');
    }
  }, [initialData]);

  /**
   * Validate form fields
   * @returns {boolean} True if valid
   */
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Short description is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!author.trim()) newErrors.author = 'Author name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Parse tags from comma-separated string
   * @returns {string[]} Array of tag strings
   */
  const parseTags = () => {
    return tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
  };

  /**
   * Simple markdown renderer for preview mode
   * @param {string} text - Markdown text
   * @returns {string} HTML string
   */
  const renderMarkdown = (text) => {
    return text
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/```[\w]*\n([\s\S]+?)```/gm, '<pre><code>$1</code></pre>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^([^<\n].+)$/gm, '$1')
      .replace(/\n/g, '<br/>');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = parseTags();
    const authorAvatar = author
      .split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');

    onSave({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      author: author.trim(),
      authorAvatar,
      tags,
      image: image.trim() || null,
    });
  };

  return (
    <div className={styles.editor} role="main">
      <div className={styles.editorHeader}>
        <h1 className={styles.editorTitle}>
          {isEditing ? '✏️ Edit Post' : '✍️ Create New Post'}
        </h1>
        <div className={styles.editorActions}>
          <button
            type="button"
            className={`${styles.previewToggle} ${previewMode ? styles.previewActive : ''}`}
            onClick={() => setPreviewMode(!previewMode)}
            aria-pressed={previewMode}
          >
            {previewMode ? '📝 Edit' : '👁️ Preview'}
          </button>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className={styles.fieldGroup}>
          <label htmlFor="post-title" className={styles.label}>
            Title <span className={styles.required}>*</span>
          </label>
          <input
            id="post-title"
            type="text"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            placeholder="Enter post title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <span id="title-error" className={styles.errorMsg} role="alert">{errors.title}</span>
          )}
        </div>

        {/* Description */}
        <div className={styles.fieldGroup}>
          <label htmlFor="post-description" className={styles.label}>
            Short Description <span className={styles.required}>*</span>
          </label>
          <textarea
            id="post-description"
            className={`${styles.textarea} ${styles.textareaShort} ${errors.description ? styles.inputError : ''}`}
            placeholder="Brief summary of the post..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            aria-describedby={errors.description ? 'desc-error' : undefined}
          />
          {errors.description && (
            <span id="desc-error" className={styles.errorMsg} role="alert">{errors.description}</span>
          )}
        </div>

        {/* Content */}
        <div className={styles.fieldGroup}>
          <label htmlFor="post-content" className={styles.label}>
            Content <span className={styles.required}>*</span>
            <span className={styles.labelHint}>(Markdown supported)</span>
          </label>
          {previewMode ? (
            <div
              className={styles.markdownPreview}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              aria-label="Content preview"
            />
          ) : (
            <textarea
              id="post-content"
              className={`${styles.textarea} ${styles.textareaLarge} ${errors.content ? styles.inputError : ''}`}
              placeholder="Write your post content here... (Markdown is supported)"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={16}
              aria-describedby={errors.content ? 'content-error' : undefined}
            />
          )}
          {errors.content && (
            <span id="content-error" className={styles.errorMsg} role="alert">{errors.content}</span>
          )}
        </div>

        {/* Two column layout for Author and Tags */}
        <div className={styles.twoCol}>
          {/* Author */}
          <div className={styles.fieldGroup}>
            <label htmlFor="post-author" className={styles.label}>
              Author <span className={styles.required}>*</span>
            </label>
            <input
              id="post-author"
              type="text"
              className={`${styles.input} ${errors.author ? styles.inputError : ''}`}
              placeholder="Your name..."
              value={author}
              onChange={e => setAuthor(e.target.value)}
              aria-describedby={errors.author ? 'author-error' : undefined}
            />
            {errors.author && (
              <span id="author-error" className={styles.errorMsg} role="alert">{errors.author}</span>
            )}
          </div>

          {/* Tags */}
          <div className={styles.fieldGroup}>
            <label htmlFor="post-tags" className={styles.label}>
              Tags
              <span className={styles.labelHint}>(comma-separated)</span>
            </label>
            <input
              id="post-tags"
              type="text"
              className={styles.input}
              placeholder="React, JavaScript, CSS..."
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
            />
          </div>
        </div>

        {/* Image URL (optional) */}
        <div className={styles.fieldGroup}>
          <label htmlFor="post-image" className={styles.label}>
            Cover Image URL
            <span className={styles.labelHint}>(optional)</span>
          </label>
          <input
            id="post-image"
            type="url"
            className={styles.input}
            placeholder="https://example.com/image.jpg"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          {image && (
            <div className={styles.imagePreview}>
              <img
                src={image}
                alt="Cover preview"
                className={styles.imagePreviewImg}
                onError={e => e.target.style.display = 'none'}
              />
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className={styles.submitRow}>
          {onCancel && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button type="submit" className={styles.submitBtn}>
            {isEditing ? '💾 Save Changes' : '🚀 Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editor;
