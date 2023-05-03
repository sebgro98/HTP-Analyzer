import React, { useState } from 'react';
import './Styled.css';
import AddPostForm from '../presenters/ForumAddPostPresenter';
import AddCommentForm from '../presenters/AddCommentForumPresenter';
import { Timestamp } from 'firebase/firestore';

function PostTitle({ title, onPostClick, postId, handleCommentFormSubmit,  }) {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div>
            <h2
                onClick={onPostClick}
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onMouseOver={(e) => (e.target.style.color = "#007bff")}
                onMouseLeave={(e) => (e.target.style.color = "#000000")}
            >
                {title}
            </h2>
            <button onClick={() => setSelectedPost(postId)} disabled={!postId}>
                Comment
            </button>
            {selectedPost === postId && (
                <div>
                    <AddCommentForm postId={postId} onSubmit={handleCommentFormSubmit} />
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
    const [postId, setPostId] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    if (filteredPosts === null || filteredPosts === undefined) {
        return <p>Loading...</p>;
    }

    const handleCommentFormSubmit = async (comment) => {
        await handleAddComment(selectedPost.id, comment);
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
                            onPostClick={() => handlePostClick(post)}
                            onCommentClick={() => {
                                setSelectedPost(post);
                                setPostId(post.id);
                                setShowCommentForm(true);
                            }}
                            postId={post.id}
                        />
                        {post.showDetails && (
                            <div className="post-details">
                                <p>{post.content}</p>
                                <p>{post.author}</p>
                                {post.timestamp ? (
                                    <p>
                                        {Timestamp.fromMillis(post.timestamp.seconds * 1000)
                                            .toDate()
                                            .toLocaleString()}
                                    </p>
                                ) : (
                                    <p>No timestamp available</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showCommentForm && (
                <div className="add-comment-form-container1">
                    <AddCommentForm
                        postId={postId}
                        selectedPost={selectedPost}
                        onSubmit={handleCommentFormSubmit}
                    />
                </div>
            )}
        </div>
    );
}

export default ForumView;