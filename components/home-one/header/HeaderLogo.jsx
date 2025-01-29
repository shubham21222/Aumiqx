import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/logo/1.png";
function HeaderLogo() {
	return (
		<div className="brand-logo">
			<Link href="/">
				<Image src={Logo} alt="Logo" className="light-version-logo" />
			</Link>
		</div>
	);
}

export default HeaderLogo;
