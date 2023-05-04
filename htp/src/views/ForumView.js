import React, {useEffect, useState} from 'react';
import './Styled.css';
import AddPostForm from '../presenters/ForumAddPostPresenter';
import PostDetails from '../presenters/AddCommentForumPresenter';
import { Timestamp } from 'firebase/firestore';

function PostTitle({ title, post, onPostClick, handleCommentFormSubmit }) {
    const [selected, setSelected] = useState(false);
    const [selectedPost, setSelectedPost] = useState(false);

    const handleClick = () => {
        setSelected((prevSelected) => !prevSelected);
    };

    useEffect(() => {
        if (selected) {
            setSelectedPost(post);
        } else {
            setSelectedPost(null);
        }
    }, [selected, post]);

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
            <button onClick={handleClick} disabled={!post.id} className={selected ? "active" : ""}>
                {selected ? "Comment" : "Comment"}
            </button>
            {selected && (
                <div>
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
    const [postId, setPostId] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

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
                        {post.showDetails && (
                            <div className="post-details">
                                <p><strong>Content:</strong> {post.content}</p>
                                <p><strong>Author:</strong> {post.author}</p>
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
                    <PostDetails
                        postId={selectedPost}
                        selectedPost={selectedPost}
                        onSubmit={handleCommentFormSubmit}
                    />
                </div>
            )}
        </div>
    );
}

export default ForumView;