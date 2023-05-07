import React, { useState } from 'react';
import Model from '../Model';
import'../views/StyledAddPost.css';

function AddPostForm() {
    const model = new Model();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            alert("Please enter a title.");
            return;
        }

        if (!content) {
            alert("Please enter content.");
            return;
        }

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
                    <label className="add-post-label add-post-label-wide">
                        Title:
                        <textarea
                            className="add-post-input add-post-input-wide"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <br />
                    <label className="add-post-label add-post-label-wide">
                        Content:
                        <textarea
                            className="add-post-input add-post-input-wide"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <br />
                    <button className="add-post-submit" type="submit">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default AddPostForm;