// ContactCard.jsx
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";

const ContactCard = ({ imageUrl, name, address, phone, email }) => {
    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="col-xs-12 col-sm-3">
                <img src={imageUrl} alt={name} className="img-responsive img-circle" />
            </div>
            <div className="col-xs-12 col-sm-9">
                <span className="name">{name}</span><br/>
                <FaMapMarkerAlt />
                <span className="visible-xs"> <span className="text-muted">{address}</span><br/></span>
                <FaPhoneAlt />
                <span className="visible-xs"> <span className="text-muted">{phone}</span><br/></span>
                <AiTwotoneMail />
                <span className="visible-xs"> <span className="text-muted">{email}</span><br/></span>
            </div>
        </li>
    );
};

export default ContactCard;