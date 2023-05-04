import React, { useState } from 'react';
import Model from '../Model';
import { serverTimestamp } from 'firebase/firestore';

function AddCommentForm({ postId }) {
    const model = new Model();
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const comment = {
            content: content,
            author: author,
            timestamp: serverTimestamp(),
        };
        console.log('postId addComment:', postId)
        await model.addComment(postId, comment);

        setContent('');
        setAuthor('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </label>
            <br />
            <label>
                Comment:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Add Comment</button>
        </form>
    );
}

export default AddCommentForm;
