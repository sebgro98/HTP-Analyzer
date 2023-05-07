import React, {useEffect, useState} from 'react';
import './StyledForumView.css';
import AddPostForm from '../presenters/ForumAddPostPresenter';
import PostDetails from '../presenters/AddCommentForumPresenter';
import { Timestamp } from 'firebase/firestore';




function PostTitle({ title, post, handleCommentFormSubmit }) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(prevSelected => !prevSelected);
    };

    return (
        <div className="post-title-container">
            <h2
                onClick={handleClick}
                className="post-title"
            >
                {title}
            </h2>
            {selected && (
                <div>
                    <p className="post-content"><strong>Content:</strong> {post.content}</p>
                    <p className="post-details"><strong>Author:</strong> {post.author}</p>
                    {post.timestamp ? (
                        <p className="post-details">
                            {Timestamp.fromMillis(post.timestamp.seconds * 1000)
                                .toDate()
                                .toLocaleString()}
                        </p>
                    ) : (
                        <p className="post-details">No timestamp available</p>
                    )}
                    <PostDetails post={post} onSubmit={handleCommentFormSubmit} />
                </div>
            )}
        </div>
    );
}





function ForumView({
                       searchQuery,
                       onSearchChange,
                       handleAddPost,
                       handleAddComment,
                       filteredPosts,
                       handlePostClick,
                   }) {
    const [showCommentForm, setShowCommentForm] = useState(false);

    if (filteredPosts === null || filteredPosts === undefined) {
        return <p>Loading...</p>;
    }

    const handleCommentFormSubmit = async (post, comment) => {
        await handleAddComment(post, comment);
        setShowCommentForm(false);
    };

    return (
        <div className="forum-container">
            <h1 className="forum-title">Forum</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => {
                        onSearchChange(event);
                    }}
                    placeholder="Search by title"
                />
            </div>
            <div className="add-post-form-container1">
                <AddPostForm onAddPost={handleAddPost} />
            </div>
            <div className="post-list">
                {filteredPosts.map((post) => (
                    <div className="post-container" key={post.id}>
                        <PostTitle
                            title={post.title}
                            post={post}
                            onPostClick={() => handlePostClick(post)}
                            handleCommentFormSubmit={handleCommentFormSubmit}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForumView;