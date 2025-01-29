import Logo from "@/public/images/logo/logo-white.svg";
import Image from "next/image";
import Link from "next/link";
function Footer() {
	return (
		<footer className="aximo-footer-section dark-bg">
			<div className="container">
				<div className="aximo-footer-bottom">
					<div className="row">
						<div className="col-lg-6">
							<div className="aximo-footer-logo">
								<Link href="/">
									<Image src={Logo} alt="logo" sizes="100vw" />
								</Link>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="aximo-copywright one">
								<p> &copy; Copyright 2024, All Rights Reserved by Mthemeus</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
