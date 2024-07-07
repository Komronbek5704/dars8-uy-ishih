import React, { useState } from 'react';
import { createPost } from './api';

const CreatePost = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const newPost = await createPost({ title, content });
            onCreate(newPost);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Post yuklanishida xatolik bor", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Kino nomi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Izoh"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Yuklanyapti...' : 'Izoh qoshish'}
            </button>
        </form>
    );
};

export default CreatePost;