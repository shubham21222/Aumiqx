"use client";
import { useEffect, useState } from "react";
import FadeInStagger from "@/components/animation/FadeInStagger";
import Image from "next/image";
import Star2Img from "../../../public/images/v1/star2.png";
import TestimonialCard from "./TestimonialCard";
import Thumb2Img from "../../../public/images/v1/t_thumb2.png";

function Testimonial() {
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/testimonials");
				const result = await response.json();
	
				// Ensure result.data is an array before setting state
				if (result.success && Array.isArray(result.data)) {
					setTestimonials(result.data);
				} else {
					console.error("Invalid data format:", result);
					setTestimonials([]); // Default to empty array if data is not in expected format
				}
			} catch (error) {
				console.error("Error fetching testimonials:", error);
				setTestimonials([]); // Default to empty array in case of error
			}
		};
	
		fetchTestimonials();
	}, []);
	

	return (
		<div className="section aximo-section-padding3">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						Clients are always
						<span className="aximo-title-animation">
							satisfied with us
							<span className="aximo-title-icon">
								<Image src={Star2Img} alt="Star2Img" />
							</span>
						</span>
					</h2>
				</div>
				<div className="row">
					{testimonials.length > 0 ? (
						testimonials.map((testimonial, index) => (
							<FadeInStagger index={index} className="col-lg-6" key={testimonial.id}>
								<TestimonialCard
									testimonial={{
										...testimonial,
										img: testimonial.img || Thumb2Img, // Handle null images
									}}
								/>
							</FadeInStagger>
						))
					) : (
						<p className="text-center w-full">No testimonials available</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Testimonial;
