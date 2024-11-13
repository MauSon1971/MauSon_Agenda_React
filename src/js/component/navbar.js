import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">MauSon Lab</span>
			</Link>

			<Link to="/contactList/contactView">
		<button className="btn btn-secondary">Agenda</button>
		</Link>

		</nav>
	);
};
