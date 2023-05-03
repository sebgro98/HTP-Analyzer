import React, { useState } from 'react';
import Model from '../Model';
import'../views/Styled.css';

function AddPostForm() {
    const model = new Model();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await model.addPost(title, content, author);
        setTitle('');
        setContent('');
        setAuthor('');
    };

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className="add-post-container">
            <button className="add-post-toggle" onClick={handleToggleForm}>
                {isFormVisible ? 'Close Form' : 'Add Post'}
            </button>
            {isFormVisible && (
                <form className="add-post-form" onSubmit={handleSubmit}>
                    <label className="add-post-label">
                        Title:
                        <input
                            className="add-post-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <br />
                    <label className="add-post-label">
                        Content:
                        <textarea
                            className="add-post-input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <br />
                    <button className="add-post-submit" type="submit">Add Post</button>
                </form>
            )}
        </div>
    );
}

export default AddPostForm;