"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FadeInUp from "@/components/animation/FadeInUp";
import Image from "next/image";
// import Blog3Img from "../../../../public/images/blog/blog-3.jpg";
import CommentForm from "@/components/blog/single-blog/CommentForm";
import CommentList from "@/components/blog/single-blog/CommentList";
import PostMeta from "@/components/blog/single-blog/PostMeta";
import PostTags from "@/components/blog/single-blog/PostTags";
import Categories from "@/components/blog/Categories";
import RecentPosts from "@/components/blog/RecentPosts";
import Search from "@/components/blog/Search";
import Tags from "@/components/blog/Tags";
import BreadCrumb from "@/components/common/Breadcrumb";
import Header from "@/components/home-one/header";
import Footer from "@/components/home-one/footer";
import "../../../../public/css/fontawesome.css";
import "../../../../public/css/mobile-nav.css";
import "../../../../public/css/app.css";
import "../../../../public/css/main.css";

function BlogDetails() {
    const params = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/blogs/${params.slug}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog details');
                }
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching blog details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchBlogDetails();
        }
    }, [params.slug]);

    const renderBlogContent = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error loading blog details: {error}</div>;
        }

        if (!blog) {
            return <div>Blog not found</div>;
        }

        return (
            <>
                <FadeInUp className="post-thumbnail">
                    <Image
                        src={blog.coverImage || ""}
                        alt={blog.title || "Blog image"}
                        sizes="100vw"
                        onError={(e) => {
                            e.currentTarget.src = Blog3Img.src;
                        }}
                        className="Single blog image"
                    />
                </FadeInUp>
                <div className="single-post-content-wrap ">
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
                        {blog.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('#')) {
                                return <span key={index}>{paragraph}</span>;
                            } else if (paragraph.startsWith('>')) {
                                return (
                                    <blockquote key={index}>
                                        {paragraph.substring(1).trim()}
                                    </blockquote>
                                );
                            }
                            return <p key={index}>{paragraph}</p>;
                        })}

                        <PostTags />
                        <CommentList />
                        <CommentForm />
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <Header />
            <BreadCrumb title="Blog Details" />
            <div className="section post-details-page  aximo-section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {renderBlogContent()}
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
            <Footer />
        </>
    );
}

export default BlogDetails;