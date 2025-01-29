import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../../public/images/icon/arrow-right.svg";

function BlogCard({ blog: { title, category, content, date, img } }) {
	return (
		<>
			<div className="post-thumbnail">
				<Image src={img} alt={title} sizes="100vw" />
			</div>
			<div className="post-content">
				<div className="post-meta">
					<div className="post-category">
						<Link href="/">{category}</Link>
					</div>
					<div className="post-date">{date}</div>
				</div>
				<Link href="/single-blog">
					<h3 className="entry-title">{title}</h3>
				</Link>
				<p>{content}...</p>
				<Link className="post-read-more" href="/single-blog">
					read more <Image src={ArrowRight} alt="Arrow Right" />
				</Link>
			</div>
		</>
	);
}

export default BlogCard;
