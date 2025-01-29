import Link from "next/link";
function HeaderButton() {
	return (
		<div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
			<Link className="aximo-default-btn pill aximo-header-btn" href="/contact-us">
				Contact Us
			</Link>
		</div>
	);
}

export default HeaderButton;
