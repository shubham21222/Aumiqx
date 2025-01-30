import FadeInStagger from "@/components/animation/FadeInStagger";
import Image from "next/image";
import Star2Img from "../../../public/images/v1/star2.png";
import TeamCard from "./TeamCard";
import Team1Img from "@/public/images/team/team1.png"; // Default image

function Teams({ teams }) {
  // Function to handle image source
  const getImageSource = (img) => {
	if (!img) {
	  return Team1Img; // Use default local image
	}
	if (typeof img === "string" && img.startsWith("http")) {
	  return { src: img, width: 200, height: 200 }; // Ensure dimensions for external images
	}
	return { src: img.src, width: img.width || 200, height: img.height || 200 }; // Handle local images
  };
  
  

  return (
    <div className="section aximo-section-padding3">
      <div className="container">
        <div className="aximo-section-title center">
          <h2>
            We have a team of
            <span className="aximo-title-animation">
              creative people
              <span className="aximo-title-icon">
                <Image src={Star2Img} alt="Star2Img" />
              </span>
            </span>
          </h2>
        </div>
        <div className="row">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <FadeInStagger key={team.id} index={index} className="col-xl-3 col-md-6">
                <TeamCard
                  team={{
                    ...team,
                    img: getImageSource(team.img), // Ensure valid image source
                  }}
                />
              </FadeInStagger>
            ))
          ) : (
            <p className="text-center text-gray-600">No team members found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;