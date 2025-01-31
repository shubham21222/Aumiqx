"use client";

import { useParams } from "next/navigation";
import SingleBlog from "@/components/blog/single-blog";
import BreadCrumb from "@/components/common/Breadcrumb";

function SingleBlogPage() {
  const { id: blogId } = useParams(); // Use `useParams()` to get the dynamic ID

  if (!blogId) {
    return <div>Loading...</div>; // Handle loading state while `blogId` is not available
  }

  return (
    <>
      <BreadCrumb title="Blog Details" />
      <SingleBlog blogId={blogId} />
    </>
  );
}

export default SingleBlogPage;
