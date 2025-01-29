import FadeInRight from "@/components/animation/FadeInRight";
import Image from "next/image";
import HeroThumbImg from "../../../public/images/v1/hero-thumb.png";
function HeroThumbs() {
	return (
		<FadeInRight className="aximo-hero-thumb">
			<Image src={HeroThumbImg} alt="Hero thumb" sizes="100vw" priority />
		</FadeInRight>
	);
}

export default HeroThumbs;
