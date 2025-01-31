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
import Team1Img from "@/public/images/team/team1.png";

export default function HomeOne() {
  const [servicesData, setServicesData] = useState([]);
  const [teamsData, setTeamsData] = useState([]); // ✅ Default to empty array

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        const data = await response.json();
        setServicesData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesData([]);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/teams");
        const data = await response.json();
        console.log("Fetched teams data:", data); // ✅ Debugging log

        setTeamsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeamsData([]); // Handle error gracefully
      }
    };

    fetchTeams();
  }, []);

  const getImageSource = (img) => {
    if (!img) return Team1Img;
    if (typeof img === "string" && img.startsWith("http")) return img;
    return img;
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
        teams={(teamsData || []).map((team) => ({
          ...team,
          img: getImageSource(team.img),
        }))}
      />
    </>
  );
}
