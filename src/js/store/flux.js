const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [
				{
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
                    name: "Debbie Schmidt",
                    position: "Frontend Developer",
                    email: "debbie.schmidt@example.com",
                    id: 125
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar2.png",
                    name: "Simon Ryles",
                    position: "Backend Developer",
                    email: "simon.ryles@example.com",
                    id: 132
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar3.png",
                    name: "Marion Walker",
                    position: "UI/UX Designer",
                    email: "marion.walker@example.com",
                    id: 98
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar4.png",
                    name: "Frederick White",
                    position: "Project Manager",
                    email: "frederick.white@example.com",
                    id: 45
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar5.png",
                    name: "Janice Morgan",
                    position: "Full Stack Developer",
                    email: "janice.morgan@example.com",
                    id: 207
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar6.png",
                    name: "Patrick Petty",
                    position: "Data Scientist",
                    email: "patrick.petty@example.com",
                    id: 89
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
                    name: "Neal Womack",
                    position: "Machine Learning Engineer",
                    email: "neal.womack@example.com",
                    id: 53
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar8.png",
                    name: "Shanon Marvin",
                    position: "Cloud Architect",
                    email: "shanon.marvin@example.com",
                    id: 142
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar9.png",
                    name: "Mark Jones",
                    position: "Security Analyst",
                    email: "mark.jones@example.com",
                    id: 37
                },
                {
                    imageUrl: "https://bootdey.com/img/Content/avatar/avatar10.png",
                    name: "Marilyn Horton",
                    position: "DevOps Engineer",
                    email: "marilyn.horton@example.com",
                    id: 150
				}
			]
		},
		actions: {
			loadContacts: async () => {
                // Simplemente un mensaje de verificación para asegurar que la función exista
                console.log("Contacts loaded");
				try{
					const response = await fetch("https://playground.4geeks.com/contact/agendas");
					if (!response.ok) throw new Error("Error en la carga");
					const data = await response.json();
					setStore({contacts: data});
					console.log("Contacts cargados de la API correctamente", data);
				} catch (error) {
					console.error("Error fetching contacts", error);

				}

            },
            addContact: (newContact) => {
                const store = getStore();
                setStore({ contacts: [...store.contacts, newContact] });
            },
            deleteContact: (index) => {
                const store = getStore();
                const updatedContacts = store.contacts.filter((_, i) => i !== index);
                setStore({ contacts: updatedContacts });
            }

		}
	};
};

export default getState;
