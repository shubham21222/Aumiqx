import Image from "next/image";
import Link from "next/link";
import ArrowRightImg from "../../../public/images/icon/arrow-right.svg";

function ServiceCard({ service }) {
  const { title, description, icon = "/images/default-icon.png" } = service; // ✅ Default icon

  const isImageUrl = icon && typeof icon === "string" && icon.startsWith("http"); // ✅ Safe check

  return (
    <div className="aximo-iconbox-wrap">
      <div className="aximo-iconbox-icon">
        {isImageUrl ? (
          <img src={icon} alt={title} width={80} height={80} />
        ) : (
          <i className={`${icon}`}></i>
        )}
      </div>
      <div className="aximo-iconbox-data">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href="/single-service" className="aximo-icon">
          <Image src={ArrowRightImg} alt="arrow right" />
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
