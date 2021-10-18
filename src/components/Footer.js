import React from "react";
import SocialNav from "./SocialNav";
import Logo from "../images/drucial_icon.svg";

export default function footer() {
	return (
		<footer>
			<a href="/" className="footer-link">
				<img
					src={Logo}
					width="52"
					height="52"
					alt="drucial.com logo"
					className="footer-logo"
				/>
			</a>
			<SocialNav
				position={"static"}
				invert={"invert(100%)"}
				row={"row"}
				transform={"none"}
				margin={0}
				justify={"space-evenly"}
			/>
			<div className="footer-info">
				<p className="copyright">©</p>
				<p className="copy-year">2021</p>
			</div>
		</footer>
	);
}
