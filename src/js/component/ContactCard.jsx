import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { FaTrashCan, FaMarker } from "react-icons/fa6";
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
                <FaMarker
                    className="FaMarker-icon"
                    onClick={() => editarContacto(id)}
                />
                <FaTrashCan
                    className="FaTrashCan-icon"
                    onClick={() => borrarContacto(id)}
                />
            </div>
        </li>
    );
};

export default ContactCard;