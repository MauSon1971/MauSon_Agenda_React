const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            agendas: [], // Inicializo vacío el arrray agendas
            contacts: [],//Inicializo vacio el array contacto
            // contactsDemo: [
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
            //         name: "Debbie Schmidt",
            //         position: "Frontend Developer",
            //         email: "debbie.schmidt@example.com",
            //         id: 125
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar2.png",
            //         name: "Simon Ryles",
            //         position: "Backend Developer",
            //         email: "simon.ryles@example.com",
            //         id: 132
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar3.png",
            //         name: "Marion Walker",
            //         position: "UI/UX Designer",
            //         email: "marion.walker@example.com",
            //         id: 98
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar4.png",
            //         name: "Frederick White",
            //         position: "Project Manager",
            //         email: "frederick.white@example.com",
            //         id: 45
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar5.png",
            //         name: "Janice Morgan",
            //         position: "Full Stack Developer",
            //         email: "janice.morgan@example.com",
            //         id: 207
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar6.png",
            //         name: "Patrick Petty",
            //         position: "Data Scientist",
            //         email: "patrick.petty@example.com",
            //         id: 89
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
            //         name: "Neal Womack",
            //         position: "Machine Learning Engineer",
            //         email: "neal.womack@example.com",
            //         id: 53
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar8.png",
            //         name: "Shanon Marvin",
            //         position: "Cloud Architect",
            //         email: "shanon.marvin@example.com",
            //         id: 142
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar9.png",
            //         name: "Mark Jones",
            //         position: "Security Analyst",
            //         email: "mark.jones@example.com",
            //         id: 37
            //     },
            //     {
            //         imageUrl: "https://bootdey.com/img/Content/avatar/avatar10.png",
            //         name: "Marilyn Horton",
            //         position: "DevOps Engineer",
            //         email: "marilyn.horton@example.com",
            //         id: 150
            //     }
            // ]
        },
        actions: {
            loadAgendas: async () => {
                //Carga las agendas desde la API
                console.log("Cargando agendas...");
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas");
                    if (!response.ok) throw new Error("Error en la carga de agendas");

                    const agendaData = await response.json();

                    // Accede a `agendaData.agendas` para obtener el array directamente
                    if (Array.isArray(agendaData.agendas)) {
                        setStore({ agendas: agendaData.agendas });
                        console.log("Agendas cargadas de la API correctamente:", agendaData.agendas);
                    } else {
                        console.error("Respuesta inesperada: `agendas` no es un array", agendaData);
                        setStore({ agendas: [] });
                    }
                } catch (error) {
                    console.error("Error al cargar agendas:", error);
                }
            },

            verifyMauSonAgenda: async () => {
                //Veifica que la agenda MauSon existe y si no está la crea
                const store = getStore();

                // Si la Agenda no está en el Store la trae desde la API
                if (!Array.isArray(store.agendas) || store.agendas.length === 0) {
                    console.log("Agendas no encontradas en el store, cargando desde la API...");
                    await getActions().loadAgendas();
                }

                // VerificO si `MauSon` existe en las agendas
                const mausonAgenda = getStore().agendas.find(agenda => agenda.slug === "MauSon");

                if (mausonAgenda) {
                    console.log("Agenda MauSon encontrada:", mausonAgenda);
                    await getActions().loadContacts(); //carga los contactos de la agenda
                } else {
                    console.log("Agenda MauSon no encontrada. Creando la agenda MauSon...");
                    await getActions().createMauSonAgenda();
                    await getActions().loadContacts(); //carga los contactos de la agenda
                }
            },
            createMauSonAgenda: async () => {
                //Crea la agenda MauSon
                try {
                    console.log("Intentando crear la agenda MauSon..."); // Agregar mensaje para verificar que la función se ejecuta
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/MauSon", {
                        method: "POST",
                        redirect: "follow"
                    });

                    if (response.ok) {
                        const newAgenda = await response.json();
                        console.log("Agenda MauSon creada exitosamente:", newAgenda);

                        // Agrega la nueva agenda al store
                        const store = getStore();
                        setStore({ agendas: [...store.agendas, newAgenda] });
                    } else {
                        console.error(`Error al crear la agenda MauSon. Código de estado: ${response.status}, Mensaje: ${response.statusText}`);
                        const errorDetails = await response.text();
                        console.error("Detalles adicionales del error:", errorDetails);
                    }
                } catch (error) {
                    console.error("Error en la solicitud para crear la agenda MauSon:", error);
                }
            },

            loadContacts: async () => {
                console.log("Cargando contactos de la agenda MauSon...");
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/MauSon/contacts", {
                        method: "GET",
                        redirect: "follow"
                    });
            
                    if (response.ok) {
                        const { contacts } = await response.json(); // Extrae el array de contactos
                        console.log("Contactos de MauSon cargados correctamente:", contacts);
            
                        // Guardar solo el array de contactos en el store
                        setStore({ contacts });
                    } else {
                        console.error(`Error al cargar contactos de MauSon. Código de estado: ${response.status}, Mensaje: ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error en la solicitud para cargar contactos de MauSon:", error);
                }
            },

            createContact: async (contactData) => {
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
            
                    const raw = JSON.stringify(contactData); // Serializa los datos del contacto para el body
            
                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };
            
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/MauSon/contacts", requestOptions);
            
                    if (response.ok) {
                        const newContact = await response.json();
                        console.log("Nuevo contacto creado exitosamente:", newContact);
            
                        // Agregar el nuevo contacto al store
                        const store = getStore();
                        setStore({ contacts: [...store.contacts, newContact] });
                    } else {
                        console.error(`Error al crear contacto. Código de estado: ${response.status}, Mensaje: ${response.statusText}`);
                        const errorDetails = await response.text();
                        console.error("Detalles adicionales del error:", errorDetails);
                    }
                } catch (error) {
                    console.error("Error en la solicitud para crear el contacto:", error);
                }
            },

            deleteContact: async (contactId) => {
                try {
                    const requestOptions = {
                        method: "DELETE",
                        redirect: "follow"
                    };

                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/MauSon/contacts/${contactId}`, requestOptions);
                    
                    if (response.ok) {
                        console.log(`Contacto con ID ${contactId} eliminado correctamente`);

                        // Filtra el contacto eliminado del store
                        const store = getStore();
                        const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                        setStore({ contacts: updatedContacts });
                    } else {
                        console.error(`Error al eliminar el contacto con ID ${contactId}. Código de estado: ${response.status}`);
                        const errorDetails = await response.text();
                        console.error("Detalles adicionales del error:", errorDetails);
                    }
                } catch (error) {
                    console.error("Error en la solicitud para eliminar el contacto:", error);
                }
            },

            deleteContact: async (contactId) => {
                try {
                    const requestOptions = {
                        method: "DELETE",
                        redirect: "follow"
                    };

                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/MauSon/contacts/${contactId}`, requestOptions);
                    
                    if (response.ok) {
                        console.log(`Contacto con ID ${contactId} eliminado correctamente`);

                        // Filtra el contacto eliminado del store
                        const store = getStore();
                        const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                        setStore({ contacts: updatedContacts });
                    } else {
                        console.error(`Error al eliminar el contacto con ID ${contactId}. Código de estado: ${response.status}`);
                        const errorDetails = await response.text();
                        console.error("Detalles adicionales del error:", errorDetails);
                    }
                } catch (error) {
                    console.error("Error en la solicitud para eliminar el contacto:", error);
                }
            },

            updateContact: async (id, updatedData) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    name: updatedData.name,
                    phone: updatedData.phone,
                    email: updatedData.email,
                    address: updatedData.address
                });

                const requestOptions = {
                    method: "PUT",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/MauSon/contacts/${id}`, requestOptions);

                    if (response.ok) {
                        const result = await response.json();
                        console.log("Contacto actualizado correctamente:", result);

                        // Actualizar el contacto en el estado local de contacts
                        const store = getStore();
                        const updatedContacts = store.contacts.map(contact =>
                            contact.id === id ? { ...contact, ...updatedData } : contact
                        );
                        setStore({ contacts: updatedContacts });
                    } else {
                        console.error("Error al actualizar el contacto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en la solicitud de actualización:", error);
                }
            }


           
        }
    };
};

export default getState;