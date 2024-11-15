import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactTableDinamica from "../component/ContactTableDinamica.jsx";

export const Demo = () => {
    const { store } = useContext(Context);

    return (
        <div className="container">
            {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                <ContactTableDinamica contacts={store.contacts} />
            ) : (
                <p>No hay contactos disponibles</p>
            )}
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};