import Image from "next/image";
import Link from "next/link";
import Blog1Img from "../../public/images/blog/blog1.png";
import Blog2Img from "../../public/images/blog/blog2.png";
import Blog3Img from "../../public/images/blog/blog3.png";
const recentPostData = [
	{
		id: crypto.randomUUID(),
		title: "7 businesses for easy money",
		date: "June 18, 2024",
		img: Blog1Img,
	},
	{
		id: crypto.randomUUID(),
		title: "My 3 tips for business ideas",
		date: "June 18, 2024",
		img: Blog2Img,
	},
	{
		id: crypto.randomUUID(),
		title: "12 Halloween costume ideas",
		date: "June 18, 2024",
		img: Blog3Img,
	},
];
function RecentPosts() {
	return (
		<div className="widget aximo_recent_posts_Widget">
			<h3 className="wp-block-heading">Recent Posts:</h3>

			{recentPostData.map((post) => (
				<div className="post-item" key={post.id}>
					<div className="post-thumb">
						<Link href="/single-blog">
							<Image src={post.img} alt={post.title} sizes="100vw" />
						</Link>
					</div>
					<div className="post-text">
						<div className="post-date">{post.date}</div>
						<Link className="post-title" href="/single-blog">
							{post.title}
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}

export default RecentPosts;
