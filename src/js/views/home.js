import React from "react";
import { ContactList } from "./contactList";


import "../../styles/home.css";
import { Link } from "react-router-dom";


export const Home = () => (
	<div className="text-center mt-5">
		<h1>MauSon Contact List</h1>
		
		<ContactList />

	</div>
);
