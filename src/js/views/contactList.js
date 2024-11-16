import React, { useContext, useEffect, useState } from "react";
import { FaUserPlus, FaDownload, FaTable, FaAddressCard } from "react-icons/fa6";
import ContactForm from "../component/ContactForm.jsx";
import ContactTable from "../component/ContactTable.jsx";
import ContactCard from "../component/ContactCard.jsx";
import ConfirmationModal from "../component/ConfirmationModal.jsx";
import "../../styles/contactList.css";
import { Context } from "../store/appContext.js";

const ContactList = () => {
    const { actions, store } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar modo eidtar y crear.
    const [currentContact, setCurrentContact] = useState(null); // estado para traer el contacto actual al modo editar
    const [contactToDelete, setContactToDelete] = useState(null); // Estado para borrar el contacto
    const [activeTab, setActiveTab] = useState("card"); // estado para cambiar de vistas

    // Cargar contactos al montar el componente
    useEffect(() => {
        actions.loadContacts();
    }, []);

    // Verificación de existencia de contactos
    if (!store.contacts || store.contacts.length === 0) {
        return <p>No Hay Contactos Disponibles</p>;
    }

    // Abrir modal para editar contacto
    const openEditModal = (contact) => {
        setCurrentContact(contact);
        setIsEditing(true);
        new bootstrap.Modal(document.getElementById("contactModal")).show(); // llamada para abrir el modal del formulario
    };

    // Abrir modal para crear nuevo contacto
    const openCreateModal = () => {
        setCurrentContact(null);
        setIsEditing(false);
        new bootstrap.Modal(document.getElementById("contactModal")).show();
    };

    // Manejar la confirmación de eliminación
    const handleDeleteContact = () => {
        if (contactToDelete) {
            actions.deleteContact(contactToDelete).then(() => {
                setContactToDelete(null); // Limpiar el estado después de borrar
            });
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-3">
                <h1 className="mb-0">Contactos</h1>
                {/* Toggle de vistas */}
                <ul className="nav nav-tabs mx-auto">
                    {["table", "card"].map((view) => (
                        <li key={view} className="nav-item">
                            <button
                                className={`nav-link ${activeTab === view ? "active" : ""}`}
                                onClick={() => setActiveTab(view)}
                            >
                                {view === "table" ? <FaTable /> : <FaAddressCard />} {view}
                            </button>
                        </li>
                    ))}
                </ul>
                {/* Botones de acción */}
                <div className="d-flex gap-2">
                    <button className="circle-button circle-button-blue" onClick={actions.loadRandomUsers}>
                        <FaDownload />
                    </button>
                    <button className="circle-button circle-button-green" onClick={openCreateModal}>
                        <FaUserPlus />
                    </button>
                </div>
            </div>

            {/* Contenido dinámico */}
            <div className="mt-3">
                {activeTab === "table" ? (
                    <ContactTable
                        contacts={store.contacts}
                        editarContacto={openEditModal}
                        borrarContacto={setContactToDelete} // Actualiza el estado al hacer clic
                    />
                ) : (
                    <div className="row">
                        {store.contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                {...contact}
                                editarContacto={() => openEditModal(contact)}
                                borrarContacto={() => setContactToDelete(contact.id)} // Actualiza el estado al hacer clic
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Formulario */}
            <ContactForm
                contact={currentContact}
                onSave={(data) => {
                    if (isEditing) {
                        actions.updateContact(currentContact.id, data);
                    } else {
                        actions.createContact(data);
                    }
                    setCurrentContact(null);
                }}
                isEditing={isEditing}
            />

            {/* Modal de Confirmación de Borrado */}
            {contactToDelete && (
                <ConfirmationModal
                    title="Confirmar Borrado"
                    message="¿Estás seguro de que deseas borrar este contacto?"
                    onConfirm={handleDeleteContact}
                    onCancel={() => setContactToDelete(null)}
                />
            )}
        </div>
    );
};

export { ContactList };