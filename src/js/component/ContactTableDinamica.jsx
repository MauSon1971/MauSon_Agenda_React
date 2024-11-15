import React from "react";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import "../../styles/ContactTableDinamica.css";

const ContactTableDinamica = ({ contacts, borrarContacto, editarContacto }) => {
    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Contact List<b> MauSon</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
                                <a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="selectAll" />
                                        <label htmlFor="selectAll"></label>
                                    </span>
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id={`checkbox${contact.id}`} name="options[]" value="1" />
                                            <label htmlFor={`checkbox${contact.id}`}></label>
                                        </span>
                                    </td>
                                    <td className="contact-image-container"><img src={contact.imageUrl} alt={contact.name} className="contact-image" /></td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.address}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <div className="contact-actions">
                                            <AiTwotoneEdit
                                                className="AiTwotoneEdit-icon"
                                                onClick={() => editarContacto(contact.id)}
                                            />
                                            <AiOutlineDelete
                                                style={{ color: "red", cursor: "pointer", fontSize: "1.2em" }}
                                                onClick={() => borrarContacto(contact.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="clearfix">
                        <div className="hint-text">Showing <b>{contacts.length}</b> out of <b>25</b> entries</div>
                        <ul className="pagination">
                            <li className="page-item disabled"><a href="#">Previous</a></li>
                            <li className="page-item"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item active"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactTableDinamica;