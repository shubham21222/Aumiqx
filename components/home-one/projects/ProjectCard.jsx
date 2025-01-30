import Image from "next/image";
import Link from "next/link";

function ProjectCard({ project: { title, description, img } }) {
	// Check if img is a URL or a local import
	const isRemoteImage = typeof img === "string" && img.startsWith("http");

	return (
		<div className="swiper-slide">
			<div className="aximo-project-thumb">
				{isRemoteImage ? (
					<Image 
						src={img} 
						alt={title} 
						width={500} // Adjust as needed
						height={300} 
						objectFit="cover"
					/>
				) : (
					<Image 
						src={img} 
						alt={title} 
						layout="intrinsic"
					/>
				)}
				
				<div className="aximo-project-wrap">
					<div className="aximo-project-data">
						<Link href="/single-portfolio">
							<h3>{title}</h3>
						</Link>
						<p>{description}</p>
					</div>
					<Link className="aximo-project-icon" href="/single-portfolio">
						<svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M19.9795 2C19.9795 2 20.5 8 25.9795 11.2C28.4887 12.6653 31.9795 14 31.9795 14M31.9795 14H2M31.9795 14C31.9795 14 28.5339 15.415 25.9795 16.8C19.9795 20.0533 19.9795 26 19.9795 26"
								stroke="#FDFDE1"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProjectCard;
