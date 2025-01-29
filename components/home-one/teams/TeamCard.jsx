import Image from "next/image";
import Link from "next/link";
function TeamCard({ team: { name, designation, img } }) {
	return (
		<div className="aximo-team-wrap">
			<div className="aximo-team-thumb">
				<Image src={img} alt={name} sizes="100vw" />
				<div className="aximo-social-icon team-social">
					<ul>
						<li>
							<a href="https://twitter.com" target="_blank">
								<i className="icon-twitter"></i>
							</a>
						</li>
						<li>
							<a href="https://fb.com" target="_blank">
								<i className="icon-facebook"></i>
							</a>
						</li>
						<li>
							<a href="https://instagram.com" target="_blank">
								<i className="icon-instagram"></i>
							</a>
						</li>
						<li>
							<a href="https://linkedin.com" target="_blank">
								<i className="icon-linkedin"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="aximo-team-data">
				<Link href="/single-team">
					<h3>{name}</h3>
				</Link>
				<p>{designation}</p>
			</div>
		</div>
	);
}

export default TeamCard;
