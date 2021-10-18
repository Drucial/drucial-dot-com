import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import JournalPost from "./components/JournalPost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	const screenRef = useRef();
	const [isMobile, setIsMobile] = useState(null);
	const screenBreak = isMobile === true ? 860 : 1920;

	useEffect(() => {
		if (!screenRef.current) return;
		function mobileCheck() {
			window.innerWidth <= 860 ? setIsMobile(true) : setIsMobile(false);
		}
		mobileCheck();
		window.addEventListener("resize", mobileCheck);
		return function cleanupListener() {
			window.removeEventListener("resize", mobileCheck);
		};
	}, [isMobile]);
	return (
		<Router>
			<div ref={screenRef} className="screen">
				<Nav isMobile={isMobile} />

				<Switch>
					<Route path="/" exact>
						<Home isMobile={isMobile} screenBreak={screenBreak} />
					</Route>
					<Route path="/about">
						<About isMobile={isMobile} screenBreak={screenBreak} />
					</Route>
					<Route path="/contact">
						<Contact isMobile={isMobile} screenBreak={screenBreak} />
					</Route>
					<Route path="/:slug">
						<JournalPost isMobile={isMobile} screenBreak={screenBreak} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

function setViewPortHeight() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setViewPortHeight();
window.addEventListener("resize", setViewPortHeight);

export default App;
