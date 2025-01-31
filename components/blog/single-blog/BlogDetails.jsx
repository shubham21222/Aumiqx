'use client'
import { useEffect, useState } from "react";
import FadeInUp from "@/components/animation/FadeInUp";
import Image from "next/image";
import Blog3Img from "../../../public/images/blog/blog3.png";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import PostMeta from "./PostMeta";
import PostTags from "./PostTags";

function BlogDetails({ blogId }) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blogs/${blogId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch blog");
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <>
            <FadeInUp className="post-thumbnail">
                <Image src={Blog3Img} alt="Single blog image" sizes="100vw" />
            </FadeInUp>
            <div className="single-post-content-wrap">
                <PostMeta />
                <div className="entry-content">
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>

                    {blog.sections.map((section, index) => (
                        <div key={index}>
                            <span>{section.title}</span>
                            <p>{section.content}</p>
                        </div>
                    ))}

                    <blockquote>{blog.quote}</blockquote>

                    <PostTags tags={blog.tags} />
                    <CommentList comments={blog.comments} />
                    <CommentForm blogId={blogId} />
                </div>
            </div>
        </>
    );
}

export default BlogDetails;