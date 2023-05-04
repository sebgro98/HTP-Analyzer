/*import { useState, useEffect } from 'react';
import Model from '../Model';

function PostWithComments({ post }) {
    const model = new Model();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            const allComments = await model.getAllComments(post.id);
            setComments(allComments);
        }

        fetchComments();
    }, [post]);

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.body}</p>
                        <p>By: {comment.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}*/