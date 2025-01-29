import Link from "next/link";
function Categories() {
	return (
		<div className="widget">
			<h3 className="wp-block-heading">Categories:</h3>
			<ul>
				<li>
					<Link href="/">Business</Link>
				</li>
				<li>
					<Link href="/">Development</Link>
				</li>
				<li>
					<Link href="/">Technology</Link>
				</li>
				<li>
					<Link href="/">Creative Director</Link>
				</li>
				<li>
					<Link href="/">Uncategorized</Link>
				</li>
			</ul>
		</div>
	);
}

export default Categories;
