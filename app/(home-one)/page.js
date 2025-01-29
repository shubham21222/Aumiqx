'use client'
import { useEffect, useState } from "react";
import About from "@/components/home-one/about";
import AutoSlider from "@/components/home-one/auto-slider";
import Hero from "@/components/home-one/hero";
import Projects from "@/components/home-one/projects";
import Services from "@/components/home-one/services";
import Teams from "@/components/home-one/teams";
import Testimonial from "@/components/home-one/testimonial";
import WhyChooseUs from "@/components/home-one/why-choose-us";

// Teams images
import Team1Img from "@/public/images/team/team1.png";
import Team2Img from "@/public/images/team/team2.png";
import Team3Img from "@/public/images/team/team3.png";
import Team4Img from "@/public/images/team/team4.png";

export default function HomeOne() {
	const [servicesData, setServicesData] = useState([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/services"); // Adjust API URL
				const data = await response.json();

				// Ensure each service has a default icon if missing
				const updatedServices = data.map(service => ({
					...service,
					icon: service.icon || "icon-design-tools", // Default icon if missing
				}));

				setServicesData(updatedServices);
			} catch (error) {
				console.error("Error fetching services:", error);
			}
		};

		fetchServices();
	}, []);

	const teamsData = [
		{
			id: crypto.randomUUID(),
			name: "Andrew Mark",
			designation: "Creative Director",
			img: Team1Img,
		},
		{
			id: crypto.randomUUID(),
			name: "Jack Taylor",
			designation: "Senior Designer",
			img: Team2Img,
		},
		{
			id: crypto.randomUUID(),
			name: "Martine Joy",
			designation: "Project Manager",
			img: Team3Img,
		},
		{
			id: crypto.randomUUID(),
			name: "Adam Straw",
			designation: "Web Developer",
			img: Team4Img,
		},
	];

	return (
		<>
			<Hero />
			<Services services={servicesData} />
			<About />
			<Projects />
			<WhyChooseUs />
			<Testimonial />
			<AutoSlider />
			<Teams teams={teamsData} />
		</>
	);
}
