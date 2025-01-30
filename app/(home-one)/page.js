"use client";
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
import Team1Img from "@/public/images/team/team1.png"; // Default image
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

  const [teamsData, setTeamsData] = useState([]);

  // Fetch teams data from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/teams"); // Replace with your API endpoint
        const data = await response.json();
        setTeamsData(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  // Function to handle image source
  const getImageSource = (img) => {
    if (!img) {
      return Team1Img; // Use default image if img is null
    }
    if (typeof img === "string" && img.startsWith("http")) {
      return img; // Use URL if img is a valid URL
    }
    return img; // Use local image if img is an imported image
  };

  return (
    <>
      <Hero />
      <Services services={servicesData} />
      <About />
      <Projects />
      <WhyChooseUs />
      <Testimonial />
      <AutoSlider />
      <Teams
        teams={teamsData.map((team) => ({
          ...team,
          img: getImageSource(team.img), // Handle image source
        }))}
      />
    </>
  );
}