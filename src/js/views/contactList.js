import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ContactForm from "../component/ContactForm.jsx";
import ContactTable from "../component/ContactTable.jsx";
import ContactCard from "../component/ContactCard.jsx";
import "../../styles/contactList.css";

const ContactList = () => {
    const { contactView } = useParams() //Captura el parámetro de la URL

    // Estado inicial para manejar la lista de contactos
    const [contacts, setContacts] = useState([
        {
            imageUrl: "http://api.randomuser.me/portraits/women/56.jpg",
            name: "Debbie Schmidt",
            address: "3903 W Alexander Rd",
            phone: "(867) 322-1852",
            email: "debbie.schmidt@example.com"
        }
    ]);

    return (
        <div>
            <h1>Contact List MauSon</h1>
            {contactView === "contactForm" ? (
                <ContactForm />
            ) : contactView === "contactTable" ? (
                <ContactTable contact={contacts} />
            ) : (
                <ul className="list-group">
                    {contacts.map((contact, index) => (
                        <ContactCard
                            key={index}
                            imageUrl={contact.imageUrl}
                            name={contact.name}
                            address={contact.address}
                            phone={contact.phone}
                            email={contact.email}
                        />
                    ))}
                </ul>


            )}
        </div>
    );
};

export { ContactList };