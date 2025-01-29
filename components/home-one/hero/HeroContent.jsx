// 'use client';

// import React, { useEffect, useState } from 'react';
// import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "@/components/animation/FadeInStaggerTwo";
// import Image from "next/image";
// import Link from "next/link";
// import ShapeImg from "../../../public/images/v1/shape1.png"; // Import the fallback image

// const HeroContent = () => {
//   const [content, setContent] = useState(null);

//   useEffect(() => {
//     const fetchHeroContent = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/hero-content');
//         const data = await response.json();
//         setContent(data);
//       } catch (error) {
//         console.error('Error fetching hero content:', error);
//       }
//     };

//     fetchHeroContent();
//   }, []);

//   if (!content) return null; // Render nothing until content is loaded

//   const { title = '', description = '', users = [], shapeImg = '' } = content; // Provide defaults for destructured values

//   return (
//     <FadeInStaggerTwo className="aximo-hero-content">
//       <FadeInStaggerTwoChildren>
//         <h1>
//           <span className="aximo-title-animation">
//             {title}
//           </span>
//         </h1>
//       </FadeInStaggerTwoChildren>
//       <FadeInStaggerTwoChildren>
//         <p>{description}</p>
//       </FadeInStaggerTwoChildren>
//       <FadeInStaggerTwoChildren>
//         <div className="aximo-hero-user-wrap">
//           <div className="aximo-hero-user-thumb">
//             {users.map((userImg, index) => (
//               <div key={index} className="aximo-hero-user-thumb-item">
//                 <Image 
//                   src={userImg || ShapeImg} // Use ShapeImg if userImg is not available
//                   alt={`User${index + 1}`} 
//                   width={50} 
//                   height={50} 
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="aximo-hero-user-data">
//             <p>Believed by more than a thousand people</p>
//           </div>
//         </div>
//       </FadeInStaggerTwoChildren>
//       <FadeInStaggerTwoChildren>
//         <Link className="aximo-call-btn" href="/contact-us">
//           Book a free consultation <i className="icon-call"></i>
//         </Link>
//         <div className="aximo-hero-shape">
//           <Image 
//             src={shapeImg || ShapeImg} // Use ShapeImg if shapeImg is not available
//             alt="ShapeImg" 
//             width={100} 
//             height={100} 
//           />
//         </div>
//       </FadeInStaggerTwoChildren>
//     </FadeInStaggerTwo>
//   );
// };

// export default HeroContent;


import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "@/components/animation/FadeInStaggerTwo";
import Image from "next/image";
import Link from "next/link";
import ShapeImg from "../../../public/images/v1/shape1.png";
import StarImg from "../../../public/images/v1/star.png";
import User1Img from "../../../public/images/v1/user1.png";
import User2Img from "../../../public/images/v1/user2.png";
import User3Img from "../../../public/images/v1/user3.png";
function HeroContent() {
	return (
		<FadeInStaggerTwo className="aximo-hero-content">
			<FadeInStaggerTwoChildren>
				<h1>
					<span className="aximo-title-animation">
						A creative
						<Image src={StarImg} alt="StarImg" />
					</span>{" "}
					design studio
				</h1>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren>
				<p>
					{`We're a creative design studio specializing in meeting the needs of the new generation.
								We offer innovative and cutting-edge design solutions to help our clients stand out in
								today&apos;s fast-paced.`}
				</p>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren>
				<div className="aximo-hero-user-wrap">
					<div className="aximo-hero-user-thumb">
						<div className="aximo-hero-user-thumb-item">
							<Image src={User1Img} alt="User1Img" />
						</div>
						<div className="aximo-hero-user-thumb-item">
							<Image src={User3Img} alt="User3Img" />
						</div>
						<div className="aximo-hero-user-thumb-item">
							<Image src={User2Img} alt="User2Img" />
						</div>
					</div>
					<div className="aximo-hero-user-data">
						<p>Believed by more than a thousand people</p>
					</div>
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren>
				<Link className="aximo-call-btn" href="/contact-us">
					Book a free consultation <i className="icon-call"></i>
				</Link>
				<div className="aximo-hero-shape">
					<Image src={ShapeImg} alt="ShapeImg" />
				</div>
			</FadeInStaggerTwoChildren>
		</FadeInStaggerTwo>
	);
}

export default HeroContent;
