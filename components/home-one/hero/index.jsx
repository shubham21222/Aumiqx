import HeroContent from "./HeroContent";
import HeroThumbs from "./HeroThumbs";

function Hero() {
	return (
		<div className="aximo-hero-section dark-bg">
			<div className="container position-relative">
				<div className="row">
					<div className="col-lg-8">
						<HeroContent />
					</div>
					<div className="col-lg-4">
						<HeroThumbs />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
