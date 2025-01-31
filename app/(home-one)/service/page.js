'use client'
import BreadCrumb from "@/components/common/Breadcrumb";
import TwoColumnFaq from "@/components/contact/TwoColumnFaq";
import AutoSlider from "@/components/home-one/auto-slider";
import Services from "@/components/home-one/services";
import WhyChooseUs from "@/components/home-one/why-choose-us";
import { useEffect, useState } from "react";



function ServicePage() {
	const [servicesData, setServicesData] = useState([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/services"); // Adjust API URL
				const data = await response.json();

				// Ensure each service has a default icon if missing
				const updatedServices = data.map((service) => ({
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
	return (
		<>
			<BreadCrumb title="Service" />
			<Services services={servicesData} />
			<AutoSlider />
			<WhyChooseUs />
			<TwoColumnFaq />
		</>
	);
}

export default ServicePage;
