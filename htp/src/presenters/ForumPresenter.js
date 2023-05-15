import React, { useState, useEffect, useCallback } from 'react';
import Model from '../Model';
import ForumView from '../views/ForumView';
import {serverTimestamp} from "firebase/firestore";

function Forum() {
    const model = new Model();
    const [posts, setPosts] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = useCallback(async () => {
        console.log("Fetching posts...");
        try {
            const allPosts = await model.getAllPosts();
            console.log("Fetched posts successfully:", allPosts);
            setPosts(allPosts);
            setFilteredPosts(allPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [model]);

    useEffect(() => {
        fetchPosts();
    }, []);


    const handleAddPost = async (content, title) => {
        console.log("title", title)
        console.log("content ", content.title)
        await model.addPost(title, content);
        fetchPosts();
    };

    const handleSearchChange = (event) => {
        console.log('handleSearchChange called with event:', event);
        const query = event.target.value;
        setSearchQuery(query);
        filterPosts(query);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        const updatedFilteredPosts = filteredPosts.map((p) =>
            p.id === post.id ? { ...p, showDetails: !p.showDetails } : p
        );
        setFilteredPosts(updatedFilteredPosts);
    };

    const filterPosts = (query) => {
        if (!query) {
            setFilteredPosts(posts);
            return;
        }
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
        );
        console.log('Filtered Posts:', filtered);
        setFilteredPosts(filtered);
    };

    const handleAddComment = async (postId, author, content) => {
        const comment = {
            content: content,
            author: author,
            timestamp: serverTimestamp(),
        };
        console.log('postId', postId)
        await model.addComment(postId, comment);
    };

    return (
        <div>
        <ForumView
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            handleAddPost={handleAddPost}
            filteredPosts={filteredPosts}
            selectedPost={selectedPost}
            handlePostClick={handlePostClick}
            handleAddComment ={handleAddComment }
        />
        </div>
    );
}

export default Forum;