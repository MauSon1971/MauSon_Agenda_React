import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/contactTable.css";

const ContactTable = ({ contacts = [] }) => {
    //Obtengo la lista de contactos desde Store
    const { store } = useContext(Context);
    console.log("Contactos en el store:", store.contacts);

    // Verificación de existencia de contactos
    if (!store.contacts || store.contacts.length === 0) {
        return <p>No Hay Contactos Disponibles</p>;
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <h5 className="card-title">
                            Contact List <span className="text-muted fw-normal ms-2">({store.contacts.length})</span>
                        </h5>
                    </div>
                </div>
                {/* Estructura adicional para botones y opciones */}
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table project-list-table table-nowrap align-middle table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col" className="ps-4" style={{ width: "50px" }}>
                                        <div className="form-check font-size-16">
                                            <input type="checkbox" className="form-check-input" id="contactUserCheckAll" />
                                            <label className="form-check-label" htmlFor="contactUserCheckAll"></label>
                                        </div>
                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Projects</th>
                                    <th scope="col" style={{ width: "200px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.contacts.map((contact, index) => (
                                    <tr key={index}>
                                        <th scope="row" className="ps-4">
                                            <div className="form-check font-size-16">
                                                <input type="checkbox" className="form-check-input" id={`contactUserCheck${index}`} />
                                                <label className="form-check-label" htmlFor={`contactUserCheck${index}`}></label>
                                            </div>
                                        </th>
                                        <td>
                                            <img src={contact.imageUrl} alt={contact.name} className="avatar-sm rounded-circle me-2" />
                                            <a href="#" className="text-body">{contact.name}</a>
                                        </td>
                                        <td>
                                            <span className="badge badge-soft-info mb-0">{contact.position}</span>
                                        </td>
                                        <td>{contact.email}</td>
                                        <td>{contact.projects}</td>
                                        <td>
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item">
                                                    <a href="#" className="px-2 text-primary" data-bs-toggle="tooltip" title="Edit">
                                                        <i className="bx bx-pencil font-size-18"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#" className="px-2 text-danger" data-bs-toggle="tooltip" title="Delete">
                                                        <i className="bx bx-trash-alt font-size-18"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Paginación y pie de tabla */}
        </div>
    );
};

export default ContactTable;