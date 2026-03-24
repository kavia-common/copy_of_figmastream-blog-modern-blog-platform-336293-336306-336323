import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import Editor from '../components/Editor';
import styles from './EditPostPage.module.css';

/**
 * EditPostPage - Page for editing an existing blog post
 * Pre-populates editor with post data and handles save/cancel navigation
 */
// PUBLIC_INTERFACE
function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, updatePost } = useBlog();

  const post = getPostById(id);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundIcon}>🔍</div>
        <h1 className={styles.notFoundTitle}>Post Not Found</h1>
        <p className={styles.notFoundMessage}>
          The post you're trying to edit doesn't exist.
        </p>
        <button
          className={styles.backBtn}
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  /**
   * Handle save: update post and navigate to post detail
   * @param {Object} postData - Updated form data from editor
   */
  const handleSave = (postData) => {
    updatePost(id, postData);
    navigate(`/post/${id}`);
  };

  const handleCancel = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Editor
          initialData={post}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={true}
        />
      </div>
    </div>
  );
}

export default EditPostPage;
