import Logo from "@/public/images/logo/1.png";
import Image from "next/image";
import Link from "next/link";
function Header() {
	return (
		<div className="aximo-logo-section">
			<div className="container">
				<Link href="/">
					<Image src={Logo} alt="Logo" sizes="100vw" />
				</Link>
			</div>
		</div>
	);
}

export default Header;
	