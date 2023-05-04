import React, { useState, useEffect, useCallback } from 'react';
import Model from '../Model';
import ForumView from '../views/ForumView';

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
            setFilteredPosts(allPosts); // update filtered posts state
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [model]);

    const handleAddComment = useCallback(async (postId, comment) => {
        try {
            const post = await model.getPostById(postId);
            const updatedPosts = await model.addComment(postId, comment, post.author);
            setPosts(updatedPosts);
            console.log("helo")
        } catch (error) {
            console.error(error);
        }
    }, [model]);

    useEffect(() => {
        fetchPosts();

        const intervalId = setInterval(() => {
            fetchPosts();
        }, 100000);

        return () => clearInterval(intervalId);
    }, []);

    const handleAddPost = async (title, content) => {
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

    return (
        <ForumView
            searchQuery={searchQuery}
            handleAddComment={handleAddComment}
            onSearchChange={handleSearchChange}
            handleAddPost={handleAddPost}
            filteredPosts={filteredPosts}
            selectedPost={selectedPost}
            handlePostClick={handlePostClick}
        >
        </ForumView>
    );
}

export default Forum;