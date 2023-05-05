import React, {useState, useEffect, useCallback} from 'react';
import Model from '../Model';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore'
import'../views/StyledComment.css';

function PostDetails({ post }) {
    const model = new Model();
    const [comments, setComments] = useState([]);

    const fetchComments = useCallback(async () => {
        const allComments = await model.getAllComments(post.id, post.author);
        setComments(allComments);
        //console.log("Comments1:", comment[0]["comment"]["content"]);
    }, [model, post.id]);

    useEffect(() => {
        fetchComments();

        const intervalId = setInterval(() => {
            fetchComments();
        }, 100000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        // Get the content of the comment and trim any leading/trailing whitespace
        const content = event.target.content.value.trim();

        // If the comment is empty, show an error message and return without adding the comment
        if (!content) {
            alert('Please enter a comment before submitting.');
            return;
        }

        // Create the comment object
        const comment = {
            content,
            user: user.email,
            timestamp: serverTimestamp(),
        };

        // Add the comment to the database
        await model.addComment(post.id, comment, post.author);

        // Reset the form input
        event.target.content.value = '';
    };

    return (
        <div className="post-details">
            <h1 className="post-details__title">Comments</h1>
            {comments.length > 0 && (
                <ul className="post-details__list">
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id} className="post-details__comment">
                                <p className="post-details__comment-content">Comment: {comment.comment.content}</p>
                                <p className="post-details__comment-user">By: {comment.comment.user}</p>
                                <p className="post-details__comment-timestamp">
                                    Created: {Timestamp.fromMillis(comment.comment.timestamp.seconds * 1000)
                                    .toDate()
                                    .toLocaleString()}
                                </p>
                            </div>
                        );
                    })}
                </ul>
            )}
            <h1 className="post-details__title">Add Comment</h1>
            <form onSubmit={handleSubmit} className="post-details__form">
                <label className="post-details__label">
                    Comment:
                    <textarea name="content" className="post-details__textarea" />
                </label>
                <br />
                <button type="submit" className="post-details__button">Add Comment</button>
            </form>
        </div>
    );
}

export default PostDetails;