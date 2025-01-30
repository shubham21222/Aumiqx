
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../../public/images/icon/arrow-right.svg";

function BlogCard({ blog }) {
  const { title, category, content, date, img, id } = blog;

  return (
    <>
      <Link href={`/blog/${id}`}>
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
          <Link href={`/blog/${id}`}>
            <h3 className="entry-title">{title}</h3>
          </Link>
          <p>{content}...</p>
          <Link className="post-read-more" href={`/blog/${id}`}>
            read more <Image src={ArrowRight} alt="Arrow Right" />
          </Link>
        </div>
      </Link>
    </>
  );
}

export default BlogCard;