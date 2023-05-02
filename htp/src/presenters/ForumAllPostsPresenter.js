import React from 'react';

function AllPosts({ posts }) {
    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>{post.author}</p>
                    <p>{post.timestamp}</p>
                </div>
            ))}
        </div>
    );
}

export default AllPosts;