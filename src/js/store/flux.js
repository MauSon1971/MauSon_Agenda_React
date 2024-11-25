const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            agendas: [], // Inicializo vacío el arrray agendas
            contacts: [],//Inicializo vacio el array contacto
            randomUsers: [], // inicializo el array de usuarios aleatorios
            UserImages: [], //inicializo el array de imagenes aleatorias

        },
        actions: {
            loadAgendas: async () => {
                //Carga las agendas desde la API
                console.log("Cargando agendas...");
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas");
                    if (!response.ok) throw new Error("Error en la carga de agendas");

                    const agendaData = await response.json();

                    if (Array.isArray(agendaData.agendas)) {
                        setStore({ agendas: agendaData.agendas });
                        console.log("Agendas cargadas de la API correctamente:", agendaData.agendas);

                        // busco la agenda MauSon
                        const mausonAgenda = getStore().agendas.find(agenda => agenda.slug === "MauSon");

                        if (mausonAgenda) {
                            console.log("Agenda MauSon encontrada:", mausonAgenda);
                            await getActions().loadContacts(); //carga los contactos de la agenda

                        } else {
                            console.log("Agenda MauSon no encontrada.");
                            await getActions().createMauSonAgenda(); //crea la agenda MauSon
                            await getActions().loadContacts(); //carga los contactos de la agenda

                        }

                    } else {
                        console.error("Respuesta inesperada: `agendas` no es un array", agendaData);
                        setStore({ agendas: [] });
                    }
                } catch (error) {
                    console.error("Error al cargar agendas:", error);
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
                const store = getStore();

                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/MauSon/contacts", {
                        method: "GET",
                        redirect: "follow"
                    });

                    if (response.ok) {
                        const { contacts } = await response.json(); // Extrae el array de contactos
                        console.log("Contactos de MauSon cargados correctamente:", contacts);

                        // Llama a assignRandomImages para asignar imágenes a los contactos
                        const updatedContacts = getActions().assignRandomImages(contacts);
                        setStore({ contacts: updatedContacts });
                        console.log("Contactos actualizados con imágenes:", updatedContacts);
                    } else {
                        console.error(`Error al cargar contactos de MauSon. Código de estado: ${response.status}, Mensaje: ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error en la solicitud para cargar contactos de MauSon:", error);
                }
            },

            createContact: async (contactData) => {
                console.log("Creando el nuevo contacto...");
                const store = getStore();
            
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
                        let newContact = await response.json();
                        console.log("Nuevo contacto creado exitosamente:", newContact);
            
                        // Asigna una imagen aleatoria al nuevo contacto usando una variable auxiliar
                        const [contactWithImage] = getActions().assignRandomImages([newContact]);
            
                        setStore({ contacts: [...store.contacts, contactWithImage] });
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
            },

            loadRandomUsers: async () => {
                console.log("Intentando cargar usuarios aleatorios...");
                try {
                    const response = await fetch("https://randomuser.me/api/?inc=name,location,phone,email,picture&results=3");
            
                    console.log("Estado de la respuesta:", response.status);
                    if (!response.ok) throw new Error("Error en la carga de usuarios aleatorios");
            
                    const userData = await response.json();
                    console.log("Datos obtenidos de la API:", userData);
            
                    if (Array.isArray(userData.results)) {
                        setStore({ randomUsers: userData.results });
                        console.log("Usuarios aleatorios cargados correctamente:", userData.results);
                        // Llama a uploadRandomUserApi solo cuando randomUsers está lleno
                        await getActions().uploadRandomUserApi();
                    } else {
                        console.error("Respuesta inesperada: `results` no es un array", userData);
                        setStore({ randomUsers: [] });
                    }
                } catch (error) {
                    console.error("Error al cargar usuarios aleatorios:", error);
                }
            },

            loadRandomImgs: async () => {
                console.log("Intentando cargar imagenes aleatorias...");

                try {
                    const response = await fetch("https://randomuser.me/api/?inc=picture&results=100");

                    console.log("Estado de la respuesta:", response.status);
                    if (!response.ok) throw new Error("Error en la carga de imágenes aleatoria");
                    const randomImgData = await response.json();

                    if (Array.isArray(randomImgData.results)) {
                        setStore({ UserImages: randomImgData.results })
                        console.log("Imagenes Aleatorias cargadas correctamente", randomImgData.results);

                    } else {
                        console.error("Respuesta inesperada: `results` no es un array", randomImgData);
                        setStore({ UserImages: [] });
                    }
                } catch (error) {
                    console.error("Error al cargar usuarios aleatorios:", error);
                }

            },

            //Subir los contactatos aleatorios a la API Contact lis
            uploadRandomUserApi: async () => {
                const store = getStore();
                const randomUsers = store.randomUsers;
            
                if (!Array.isArray(randomUsers) || randomUsers.length === 0) {
                    console.error("No hay usuarios en randomUsers para enviar a la API");
                    return;
                }
            
                for (const user of randomUsers) {
                    const address = `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.postcode}, ${user.location.state}, ${user.location.country}`;
            
                    const contactData = {
                        name: `${user.name.first} ${user.name.last}`,
                        phone: user.phone,
                        email: user.email,
                        address: address,
                        imageUrl: user.picture.large // Incluye la imagen del usuario
                    };
            
                    try {
                        const response = await fetch("https://playground.4geeks.com/contact/agendas/MauSon/contacts", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(contactData),
                            redirect: "follow"
                        });
            
                        if (response.ok) {
                            const newContact = await response.json();
                            console.log(`Contacto ${contactData.name} enviado correctamente a la API`);
            
                            // Añadir el nuevo contacto al store
                            const updatedContacts = [...store.contacts, { ...contactData, id: newContact.id }];
                            setStore({ contacts: updatedContacts });
                        } else {
                            console.error(`Error al enviar el contacto ${contactData.name}. Código de estado: ${response.status}`);
                        }
                    } catch (error) {
                        console.error(`Error en la solicitud para enviar el contacto ${contactData.name}:`, error);
                    }
                }
            },

            assignRandomImages: (contacts) => {
                const store = getStore();
                // Asigna una imagen aleatoria de UserImages a cada contacto en el array de contactos
                return contacts.map(contact => {
                    const randomImage = store.UserImages[Math.floor(Math.random() * store.UserImages.length)];
                    return {
                        ...contact,
                        imageUrl: randomImage?.picture?.large || "https://via.placeholder.com/50"
                    };
                });
            }

        }
    };
};

export default getState;