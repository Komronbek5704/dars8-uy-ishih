import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from './Createpost';
import PostList from './PostList';
import SearchBar from './SearchBar';
import './index.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://server-film.onrender.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== deletedPostId));
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>Posts</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CreatePost onCreate={handleCreatePost} />
      <PostList posts={filteredPosts} onDelete={handleDeletePost} />
    </div>
  );
};

export default App;