"use client";
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/common/Breadcrumb";
import Teams from "@/components/home-one/teams";
import Team11Img from "../../../public/images/team/team11.png"; // Default image

function Team() {
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
            return Team11Img; // Use default image if img is null
        }
        if (typeof img === "string" && img.startsWith("http")) {
            return img; // Use URL if img is a valid URL
        }
        return img; // Use local image if img is an imported image
    };

    return (
        <>
            <BreadCrumb title="Our Team" />
            <Teams
                teams={teamsData.map((team) => ({
                    ...team,
                    img: getImageSource(team.img), // Handle image source
                }))}
            />
        </>
    );
}

export default Team;