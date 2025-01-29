import Image from "next/image";
import Link from "next/link";
import ErrorImg from "../../../public/images/about/404.png";
import ArrowRightImg from "../../../public/images/icon/arrow-right.svg";
import Star2Img from "../../../public/images/v1/star2.png";
export default function ErrorPage() {
	return (
		<div className="section">
			<div className="container">
				<div className="aximo-errors-wrap">
					<div className="aximo-errors-thumb">
						<Image src={ErrorImg} alt="Error" />
					</div>
					<div className="aximo-errors-title">
						<h2>
							We can’t find the page
							<span className="aximo-title-animation">
								you are looking for
								<span className="aximo-title-icon">
									<Image src={Star2Img} alt="" />
								</span>
							</span>
						</h2>
					</div>
					<Link className="aximo-errors-btn" href="/">
						Return to homepage
						<span>
							<Image src={ArrowRightImg} alt="arrow" />
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
