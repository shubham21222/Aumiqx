import Image from "next/image";
import LogoWhiteImg from "../../../public/images/logo/1.png";
import Link from "next/link";
function FooterBottom() {
  return (
    <>
      <div className="col-lg-6">
        <div className="aximo-footer-logo">	
          <Link href="#">
            <Image src={LogoWhiteImg} alt="Logo" height={24} width={100} />
          </Link>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="aximo-copywright one">
          <p> &copy; Copyright 2024, All Rights Reserved by Mthemeus</p>
        </div>
      </div>
    </>
  );
}

export default FooterBottom;
