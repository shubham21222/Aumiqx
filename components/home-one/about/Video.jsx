"use client";
import FadeInUp from "@/components/animation/FadeInUp";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import PlayBtnImg from "../../../public/images/v1/play-btn.svg";
import VideoBg from "../../../public/images/v1/video-bg.png";

function Video() {
	const [isOpen, setOpen] = useState(false);

	return (
		<FadeInUp className="aximo-video-wrap">
			<Image src={VideoBg} alt="VideoBg" sizes="(max-width:768px) 100vw, 70vw" />
			<ModalVideo
				channel="youtube"
				youtube={{ autoplay: 0 }}
				isOpen={isOpen}
				videoId="Vx2aLNgGoAE"
				onClose={() => setOpen(false)}
			/>
			<button className="aximo-video-popup play-btn1 video-init" onClick={() => setOpen(true)}>
				<Image src={PlayBtnImg} alt="PlayBtnImg" />
			</button>
		</FadeInUp>
	);
}

export default Video;
