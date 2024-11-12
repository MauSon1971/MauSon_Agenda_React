import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiTwotoneMail, AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import "../../styles/contactCard.css";

const ContactCard = ({ id, imageUrl, name, address, phone, email, borrarContacto, editarContacto }) => {
    return (
        <li className="contact-card list-group-item">
            <div className="contact-image-container">
                <img src={imageUrl} alt={name} className="contact-image" />
            </div>
            <div className="contact-info">
                <span className="contact-name">{name}</span><br />
                <FaMapMarkerAlt />
                <span className="contact-text"> {address}</span><br />
                <FaPhoneAlt />
                <span className="contact-text"> {phone}</span><br />
                <AiTwotoneMail />
                <span className="contact-text"> {email}</span>
            </div>
            <div className="contact-actions">
                <button className="btn btn-primary btn-sm me-2" onClick={() => editarContacto(id)}>
                    <AiTwotoneEdit /> Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => borrarContacto(id)}>
                    <AiOutlineDelete /> Borrar
                </button>
            </div>
        </li>
    );
};

export default ContactCard;