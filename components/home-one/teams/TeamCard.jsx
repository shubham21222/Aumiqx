import Image from "next/image";
import Link from "next/link";

function TeamCard({ team: { name, designation, img } }) {
  // Ensure `img` is always a valid object with `src`, `width`, and `height`
  const imageProps = typeof img === "string" ? { src: img, width: 200, height: 200 } : img;

  return (
    <div className="aximo-team-wrap">
      <div className="aximo-team-thumb">
        <Image 
          src={imageProps.src} 
          alt={name} 
          width={imageProps.width} 
          height={imageProps.height} 
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // Ensure responsiveness
        />
        <div className="aximo-social-icon team-social">
          <ul>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="icon-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://fb.com" target="_blank" rel="noopener noreferrer">
                <i className="icon-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="icon-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
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
