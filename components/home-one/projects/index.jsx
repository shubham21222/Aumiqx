"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Star2Img from "../../../public/images/v1/star2.png";
import ProjectCard from "./ProjectCard";
import Project1Img from "../../../public/images/v1/project1.png"; // Default image

const DEFAULT_IMAGE = Project1Img; // Set a default fallback image

const swiperSettings = {
	spaceBetween: 24,
	direction: "horizontal",
	pagination: { clickable: true },
	modules: [Pagination, Mousewheel],
	mousewheel: true,
	breakpoints: {
		640: { slidesPerView: 1 },
		900: { slidesPerView: 2 },
		1600: { slidesPerView: 3.5 },
	},
};

function Projects() {
	const [projectsData, setProjectsData] = useState([]);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/projects"); // Replace with your actual API URL
				const data = await response.json();
				const formattedData = data.map((project) => ({
					...project,
					img: project.img ? project.img : DEFAULT_IMAGE, // Use API image or fallback
				}));
				setProjectsData(formattedData);
			} catch (error) {
				console.error("Error fetching projects:", error);
			}
		};

		fetchProjects();
	}, []);

	return (
		<div className="section dark-bg aximo-section-padding">
			<div className="container">
				<div className="aximo-section-title center light">
					<h2>
						Have a wide range of
						<span className="aximo-title-animation">
							creative projects
							<span className="aximo-title-icon">
								<Image src={Star2Img} alt="Star Icon" />
							</span>
						</span>
					</h2>
				</div>
			</div>
			<div className="swiper aximo-project-slider">
				<Swiper {...swiperSettings}>
					{projectsData.map((project) => (
						<SwiperSlide key={project._id}>
							<ProjectCard project={project} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default Projects;
