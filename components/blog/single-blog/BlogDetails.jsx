"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FadeInUp from "@/components/animation/FadeInUp";
import Image from "next/image";
import Blog3Img from "../../../public/images/blog/blog3.png";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import PostMeta from "./PostMeta";
import PostTags from "./PostTags";

function BlogDetails() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog details');
                }
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching blog details:", err);
            }
        };

        if (id) {
            fetchBlogDetails();
        }
    }, [id]);

    if (error) {
        return <div>Error loading blog details</div>;
    }

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FadeInUp className="post-thumbnail">
                <Image 
                    src={blog.coverImage || Blog3Img} 
                    alt={blog.title || "Blog image"}
                    sizes="100vw"
                    onError={(e) => {
                        e.currentTarget.src = Blog3Img.src;
                    }}
                />
            </FadeInUp>
            <div className="single-post-content-wrap">
                <PostMeta 
                    category={blog.category}
                    date={new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    author={blog.author}
                />
                <div className="entry-content">
                    <h3>{blog.title}</h3>
                    {/* Split content by paragraphs and render */}
                    {blog.content.split('\n\n').map((paragraph, index) => {
                        // Check if paragraph starts with #
                        if (paragraph.startsWith('#')) {
                            return <span key={index}>{paragraph}</span>;
                        }
                        // Check if paragraph is a quote (starts with >)
                        else if (paragraph.startsWith('>')) {
                            return (
                                <blockquote key={index}>
                                    {paragraph.substring(1).trim()}
                                </blockquote>
                            );
                        }
                        // Regular paragraph
                        return <p key={index}>{paragraph}</p>;
                    })}
                    
                    <PostTags tags={blog.tags} />
                    <CommentList comments={blog.comments} />
                    <CommentForm blogId={blog._id} />
                </div>
            </div>
        </>
    );
}

export default BlogDetails;