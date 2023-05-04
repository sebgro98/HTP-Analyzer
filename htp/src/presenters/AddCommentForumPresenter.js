import React, {useState, useEffect, useCallback} from 'react';
import Model from '../Model';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

        const comment = {
            content: event.target.content.value,
            user: user.email,
            timestamp: serverTimestamp(),
        };

        await model.addComment(post.id, comment, post.author);
        event.target.content.value = '';
    };

    return (
        <div>
            <h2>Comments</h2>
            {comments.length > 0 && (
                <ul>
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment.content}</p>
                                <p>By: {comment.comment.user}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
            <h2>Add Comment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Comment:
                    <textarea name="content" />
                </label>
                <br />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
}

export default PostDetails;