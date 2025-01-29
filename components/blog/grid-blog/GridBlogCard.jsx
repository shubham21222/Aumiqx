import Image from "next/image";
import Link from "next/link";
import ArrayRightImg from "../../../public/images/icon/arrow-right.svg";
function GridBlogCard({ blog: { img, title, date, category } }) {
	return (
		<div className="single-post-item">
			<div className="post-thumbnail">
				<Image src={img} alt={title} sizes="100vw" />
			</div>
			<div className="post-content">
				<div className="post-meta">
					<div className="post-category">
						<a href="#">{category}</a>
					</div>
					<div className="post-date">{date}</div>
				</div>
				<Link href="/single-blog">
					<h3 className="entry-title">{title}</h3>
				</Link>
				<Link className="post-read-more" href="/single-blog">
					read more <Image src={ArrayRightImg} alt="Arrow" />
				</Link>
			</div>
		</div>
	);
}

export default GridBlogCard;
