import React, { useState } from 'react';
import Model from "../Model";

function AddPostForm() {
    const model = new Model();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        await model.addPost(title, content, author);
        setTitle('');
        setContent('');
        setAuthor('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br />
            <label>
                Content:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Add Post</button>
        </form>
    );
}

export default AddPostForm