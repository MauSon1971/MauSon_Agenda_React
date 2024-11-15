import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">MonkeyLab</span>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarScroll"
						aria-controls="navbarScroll"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarScroll">
						<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
							<li className="nav-item">
								<Link to="/contactList/contactView">
									<span className="nav-link active" aria-current="page">
										Contacts
									</span>
								</Link>
							</li>
						</ul>
						
						{/* Contenedor para el campo de búsqueda e imagen de perfil */}
						<div className="d-flex align-items-center ms-auto">
							<form className="d-flex me-3" role="search">
								<input className="form-control" type="search" placeholder="Search" aria-label="Search" />
							</form>

							{/* Imagen de perfil con menú desplegable alineado a la derecha */}
							<div className="nav-item dropdown no-arrow">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<div className="profile-pic">
										<img
											src="https://media.licdn.com/dms/image/v2/C4E03AQFMbXw5ey6z7A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516351020284?e=1736985600&v=beta&t=S-RGD8-TNs0oRYDs4b81yARdP8c4mRd3arY1nkv61AY"
											alt="Profile"
											className="profile-image rounded-circle"
											style={{ width: "40px", height: "40px" }}
										/>
									</div>
								</a>
								<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
									<li>
										<a className="dropdown-item" href="#">
											<i className="fas fa-sliders-h fa-fw"></i> Account
										</a>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											<i className="fas fa-cog fa-fw"></i> Settings
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											<i className="fas fa-sign-out-alt fa-fw"></i> Log Out
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Línea divisoria debajo de la Navbar */}
			<hr className="m-0" />
		</>
	);
};