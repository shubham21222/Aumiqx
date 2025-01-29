import Image from "next/image";
import CommentIcon from "../../../public/images/icon/comment.svg";
import LikeIcon from "../../../public/images/icon/like.svg";
function PostTags() {
	return (
		<div className="post-tag-wrap">
			<div className="post-tag">
				<h3>Tags:</h3>
				<div className="wp-block-tag-cloud">
					<a href="#">Business</a>
					<a href="#">Solutions</a>
				</div>
			</div>
			<div className="post-like-comment">
				<ul>
					<li>
						<a href="#">
							<Image src={LikeIcon} alt="like icon " />
							175
						</a>
					</li>
					<li>
						<a href="#">
							<Image src={CommentIcon} alt="comment icon" />
							23
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default PostTags;
