import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "@/components/animation/FadeInStaggerTwo";
import Image from "next/image";
import Story1Img from "../../../public/images/about/story1.png";
import Story2Img from "../../../public/images/about/story2.png";
import Story3Img from "../../../public/images/about/story3.png";
import Story4Img from "../../../public/images/about/story4.png";
function StoryPhotos() {
	return (
		<FadeInStaggerTwo className="row">
			<FadeInStaggerTwoChildren className="col-lg-8">
				<div className="aximo-story-thumb">
					<Image src={Story1Img} alt="Story1Img" sizes="100vw" />
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="col-lg-4">
				<div className="aximo-story-thumb">
					<Image src={Story2Img} alt="StroryIMg 2" sizes="100vw" />
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="col-lg-4">
				<div className="aximo-story-thumb">
					<Image src={Story3Img} alt="StoryImg 3" sizes="100vw" />
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="col-lg-8">
				<div className="aximo-story-thumb">
					<Image src={Story4Img} alt="Story4Img" sizes="100vw" />
				</div>
			</FadeInStaggerTwoChildren>
		</FadeInStaggerTwo>
	);
}

export default StoryPhotos;
