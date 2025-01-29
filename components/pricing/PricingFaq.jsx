import Image from "next/image";
import Link from "next/link";
import ArrowRightImg from "../../public/images/icon/arrow-right.svg";
import QuestionImg from "../../public/images/icon/question.svg";
import StarImg from "../../public/images/v1/star2.png";
function PricingFaq() {
	return (
		<div className="section">
			<div className="container">
				<div className="aximo-pricing-border">
					<div className="row">
						<div className="col-lg-6">
							<div className="aximo-default-content">
								<h2>
									<span className="aximo-title-animation">
										Read our FAQ
										<span className="aximo-title-icon">
											<Image src={StarImg} alt="star" />
										</span>
									</span>
									for clarification
								</h2>
								<p>
									We understand that you considering our services, that&apos;s why we’ve curated a
									collection of frequently asked questions.
								</p>
							</div>
							<Link className="aximo-errors-btn contact-us" href="/contact-us">
								Contact us{" "}
								<span>
									<Image src={ArrowRightImg} alt="arrow right" />
								</span>
							</Link>
						</div>
						<div className="col-lg-6">
							<div className="aximo-accordion-normal-wrap m_top_responsive">
								<div className="aximo-accordion-normal-item">
									<div className="aximo-accordion-normal-icon">
										<Image src={QuestionImg} alt="question icon" />
									</div>
									<div className="aximo-accordion-normal-data">
										<h3>Can I buy multiple plans?</h3>
										<p>
											Yes, you can try us for free for 30 days. Our friendly team will work with
											you to get you up and running as soon as possible.
										</p>
									</div>
								</div>
								<div className="aximo-accordion-normal-item">
									<div className="aximo-accordion-normal-icon">
										<Image src={QuestionImg} alt="question icon" />
									</div>
									<div className="aximo-accordion-normal-data">
										<h3>What is the cancelation policy?</h3>
										<p>
											The cancellation policy refers to the rules and guidelines established by a
											business regarding the cancellation of services, products.
										</p>
									</div>
								</div>
								<div className="aximo-accordion-normal-item">
									<div className="aximo-accordion-normal-icon">
										<Image src={QuestionImg} alt="question icon" />
									</div>
									<div className="aximo-accordion-normal-data">
										<h3>How much does design work cost?</h3>
										<p>
											The cost of our design services varies depending on the scope of the
											project. We provide customized quotes after discussing requirements.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PricingFaq;
