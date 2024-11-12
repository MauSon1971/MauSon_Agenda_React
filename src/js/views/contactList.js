import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContactForm from "../component/ContactForm.jsx";
import ContactTable from "../component/ContactTable.jsx";
import ContactCard from "../component/ContactCard.jsx";
import ConfirmationModal from "../component/ConfirmationModal.jsx";
import "../../styles/contactList.css";
import { Context } from "../store/appContext.js";

const ContactList = () => {
    const { contactView } = useParams();
    const { actions, store } = useContext(Context);

    const [isEditing, setIsEditing] = useState(false); //Estado para el modo editar y crear
    const [currentContact, setCurrentContact] = useState(null); //Estado del contacto actual del user
    const [contactToDelete, setContactToDelete] = useState(null); // Estado para el ID del contacto a borrar
    const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el modal de confirmación

    useEffect(() => {
        actions.verifyMauSonAgenda();
    }, []);

    useEffect(() => {
        console.log("Contactos cargados desde el store:", store.contacts);
    }, [store.contacts]);


    useEffect(() => {
        if (showConfirmation) {
            const modal = new bootstrap.Modal(document.getElementById("confirmationModal"));
            modal.show();
        }
    }, [showConfirmation]);

    const borrarContacto = (id) => {
        setContactToDelete(id); // Almacena el contacto que se desea borrar
        setShowConfirmation(true); // Muestra el modal de confirmación
    };

    const handleDeleteContact = () => {
        if (contactToDelete !== null) {
            actions.deleteContact(contactToDelete); // Llama a la acción de borrar
            setContactToDelete(null);
            setShowConfirmation(false); // Cierra el modal
        }
    };

    const cancelDelete = () => {
        setContactToDelete(null);
        setShowConfirmation(false); // Cierra el modal de confirmación
    };

    const editarContacto = (contact) => {
        setCurrentContact(contact);
        setIsEditing(true);
        const modal = new bootstrap.Modal(document.getElementById("contactModal"));
        modal.show();
    };

    const handleFormSubmit = (contactData) => {
        if (isEditing) {
            actions.updateContact(currentContact.id, contactData);
        } else {
            actions.createContact(contactData);
        }
        setCurrentContact(null);
        setIsEditing(true);
    };

    return (
        <div>
            <h1>Contact List MauSon</h1>
            <button type="button" className="btn btn-primary" onClick={() => {
                setCurrentContact(null);
                setIsEditing(false);
                const modal = new bootstrap.Modal(document.getElementById("contactModal"));
                modal.show();
            }}>
                Crear Nuevo Contacto
            </button>

            {contactView === "contactForm" ? (
                <ContactForm />
            ) : contactView === "contactTable" ? (
                <ContactTable contacts={store.contacts} />
            ) : (
                <ul className="list-group mt-3">
                    {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                        store.contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                id={contact.id}
                                imageUrl={contact.imageUrl || "https://via.placeholder.com/50"}
                                name={contact.name}
                                address={contact.address}
                                phone={contact.phone}
                                email={contact.email}
                                borrarContacto={() => borrarContacto(contact.id)} // Muestra la confirmación de borrado
                                editarContacto={() => editarContacto(contact)}
                            />
                        ))
                    ) : (
                        <p>No hay contactos disponibles</p>
                    )}
                </ul>
            )}

            {/* Modal Formulario */}
            <ContactForm
                contact={currentContact}
                onSave={handleFormSubmit}
                isEditing={isEditing}
            />

            {/* Modal de Confirmación de Borrado */}
            {showConfirmation && (
                <ConfirmationModal
                    title="Confirmar Borrado"
                    message="¿Estás seguro de que deseas borrar este contacto?"
                    onConfirm={handleDeleteContact}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

export { ContactList };