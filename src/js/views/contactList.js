import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContactForm from "../component/ContactForm.jsx";
import ContactTable from "../component/ContactTable.jsx";
import ContactCard from "../component/ContactCard.jsx";
import "../../styles/contactList.css";
import { Context } from "../store/appContext.js";

const ContactList = () => {
    const { contactView } = useParams();
    const { actions, store } = useContext(Context);

    const [isEditing, setIsEditing] = useState(false); 
    const [currentContact, setCurrentContact] = useState(null);

    useEffect(() => {
        actions.verifyMauSonAgenda();
    }, []);

    useEffect(() => {
        console.log("Contactos cargados desde el store:", store.contacts);//utilizo el mensaje en la consola para confirmar que se ha mofificado el store
    }, [store.contacts]);

    const borrarConctacto = (id) => {
        actions.deleteContact(id); //llamo a la función para borrar el contacto
    };

    const editarContacto = (contact) => {
        setCurrentContact(contact); // Establece el contacto a editar
        setIsEditing(true); // Cambia a modo edición
        const modal = new bootstrap.Modal(document.getElementById("contactModal")); //abro un nuevo modal y lo muestro
        modal.show();
    };
    //función que controla la actualización o creación de contactos
    const handleFormSubmit = (contactData) => {
        if (isEditing) {
            actions.updateContact(currentContact.id, contactData);
        } else {
            actions.createContact(contactData);
        }
        setCurrentContact(null); //pongo a cero los valores de contactos
        setIsEditing(true); // modo de crear
    };


    return (
        <div>
            <div className="d-flex justify-content-between">
            <h1>Contact List MauSon</h1>
            {/* en el onclic cambio estado, inicializo el array y abro un nuevo modal */}
            <button type="button" className="btn btn-primary" onClick={ () => {
                setCurrentContact(null); //inicializo en cero contacto actual
                setIsEditing(false); //modo crear
                const modal = new bootstrap.Modal(document.getElementById("contactModal"));
                modal.show(); // muestro modal
            }}
            >
                Crear Nuevo Contacto
            </button>

            </div>
            
            {contactView === "contactForm" ? (
                <ContactForm />
            ) : contactView === "contactTable" ? (
                <ContactTable contacts={store.contacts} />
            ) : (
                <ul className="list-group mt-3">
                    {/* //verifico que los datos que vienen sean array y no estén vacíos */}
                    {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                        store.contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                id={contact.id}
                                imageUrl={contact.imageUrl || "https://via.placeholder.com/50"} // si no tengo imagen muestro una por defecto
                                name={contact.name}
                                address={contact.address}
                                phone={contact.phone}
                                email={contact.email}
                                borrarContacto={() => borrarConctacto(contact.id)} // paso la función para borrar el contacto
                                editarContacto={ () => editarContacto(contact)} //paso funcion editar al componente Card
                            />
                        ))
                    ) : (
                        <p>No hay contactos disponibles</p>
                    )}
                </ul>
            )}
            
            {/* Modal Formulario */}
            <ContactForm
            contact= {currentContact}
            onSave= {handleFormSubmit}
            isEditing={isEditing}
            />
        </div>
    );
};

export { ContactList };