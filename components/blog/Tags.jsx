import Link from "next/link";
const tagsData = ["Marketing", "Business", "Solutions", "Studio", "Brand"];
function Tags() {
	return (
		<div className="widget">
			<h3 className="wp-block-heading">Tags:</h3>
			<div className="wp-block-tag-cloud">
				{tagsData.map((tag) => (
					<Link key={crypto.randomUUID()} href="/">
						{tag}
					</Link>
				))}
			</div>
		</div>
	);
}

export default Tags;
