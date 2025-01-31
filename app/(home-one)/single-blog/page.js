// 'use client'
// import { useRouter } from "next/navigation";
// import SingleBlog from "@/components/blog/single-blog";
// import BreadCrumb from "@/components/common/Breadcrumb";

// function SingleBlogPage() {
//   const router = useRouter();
//   const { id: blogId } = router.query; // Extract `blogId` from the URL

//   if (!blogId) {
//     return <div>Loading...</div>; // Handle loading state while `blogId` is not available
//   }

//   return (
//     <>
//       <BreadCrumb title="Blog Details" />
//       <SingleBlog blogId={blogId} /> {/* Pass `blogId` as a prop */}
//     </>
//   );
// }

// export default SingleBlogPage;