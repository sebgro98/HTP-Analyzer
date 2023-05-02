import React, { useState, useEffect } from 'react';
import Model from '../Model';
import AddPostForm from "./ForumAddPostPresenter";
import ForumView from "../views/ForumView";

function AllPosts({ posts }) {
    if (posts.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>{post.author}</p>
                    {post.timestamp ? (
                        <p>{new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
                    ) : (
                        <p>No timestamp available</p>
                    )}
                </div>
            ))}
        </div>
    );
}

function Forum() {
    const model = new Model();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            async function fetchPosts() {
                const allPosts = await model.getAllPosts();
                setPosts(allPosts);
            }
            fetchPosts();
        }, 10000);
        return () => clearInterval(intervalId);
    }, [model, setPosts]);

    const handleAddPost = async (title, content) => {
        await model.addPost(title, content);
        const allPosts = await model.getPostsForUser();
        setPosts(allPosts);
    };

    return (
        <div>
            <ForumView>
            <AddPostForm onAddPost={handleAddPost} />
            <AllPosts posts={posts} />
            </ForumView>
        </div>
    );
}

export default Forum;