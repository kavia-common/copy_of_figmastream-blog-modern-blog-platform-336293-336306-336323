import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import Editor from '../components/Editor';
import styles from './CreatePostPage.module.css';

/**
 * CreatePostPage - Page for creating a new blog post
 * Uses the Editor component and integrates with BlogContext
 */
// PUBLIC_INTERFACE
function CreatePostPage() {
  const navigate = useNavigate();
  const { createPost } = useBlog();

  /**
   * Handle save: create post and navigate to homepage
   * @param {Object} postData - Form data from editor
   */
  const handleSave = (postData) => {
    const newPost = createPost(postData);
    navigate(`/post/${newPost.id}`);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Editor
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={false}
        />
      </div>
    </div>
  );
}

export default CreatePostPage;
