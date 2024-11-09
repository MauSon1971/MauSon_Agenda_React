import React from "react";

import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<div className="text-center mt-5">
		<h1>Hello From Home</h1>

		<Link to="/agenda">
		<button className="btn btn-secondary">Agenda</button>
		</Link>



	</div>
);
