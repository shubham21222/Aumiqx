// app/blog/page.js
"use client";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import RecentPosts from "./RecentPosts";
import Search from "./Search";
import Tags from "./Tags";
import FadeInStagger from "../animation/FadeInStagger";
import BlogCard from "./BlogCard";
import Navigation from "./Navigation";

function Blog() {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/blogs");
                const data = await response.json();
                
                // Transform API data to match your existing structure
                const transformedData = data.map(blog => ({
                    id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    category: blog.category || "Uncategorized",
                    date: new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    img: blog.coverImage
                }));

                setBlogData(transformedData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="section aximo-section-padding2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        {blogData.map((blog, index) => (
                            <FadeInStagger className="single-post-item" key={blog.id} index={index}>
                                <BlogCard key={blog.id} blog={blog} />
                            </FadeInStagger>
                        ))}
                        <Navigation />
                    </div>
                    <div className="col-lg-4">
                        <div className="right-sidebar">
                            <Search />
                            <Categories />
                            <RecentPosts />
                            <Tags />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
