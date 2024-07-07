import React, { useState, useRef } from 'react';
import { deletePost } from './api';
import axios from 'axios';

const PostList = ({ posts, onDelete }) => {
  const [deletingPostId, setDeletingPostId] = useState(null);
  const cancelTokenSourceRef = useRef(null);

  const handleDelete = async (id) => {
    setDeletingPostId(id);
    cancelTokenSourceRef.current = axios.CancelToken.source();
    
    try {
      await deletePost(id, cancelTokenSourceRef.current.token);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeletingPostId(null);
    }
  };

  const handleCancel = () => {
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel('Delete request canceled by user.');
    }
    setDeletingPostId(null);
  };

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => handleDelete(post.id)} disabled={deletingPostId === post.id}>
            {deletingPostId === post.id ? 'In progress...' : 'Delete'}
          </button>
          {deletingPostId === post.id && (
            <button onClick={handleCancel}>
              Cancel
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostList;