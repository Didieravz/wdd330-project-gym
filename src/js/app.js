import { loadHeaderFooter } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    // Carga el header y footer dinámicamente
    loadHeaderFooter();

    // Crea el mapa en el contenedor con una vista inicial en Bogotá, Colombia
    const map = L.map("map").setView([4.710989, -74.072092], 12);

    // Agrega capa de mapa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Intenta obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            // Centra el mapa en la ubicación del usuario
            map.setView([latitude, longitude], 14);

            // Agregar marcador en la ubicación actual del usuario
            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup("You are here!")
                .openPopup();
        },
        () => {
            console.error("Location access denied."); // Manejar error si el usuario bloquea la geolocalización
        }
    );

    // Función para buscar una ciudad y actualizar el mapa
    document.getElementById("search-btn").addEventListener("click", () => {
        const city = document.getElementById("search").value.trim(); // Obtener el texto ingresado

        if (city) {
            // Hacer una solicitud a la API de Nominatim para obtener coordenadas de la ciudad
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        const { lat, lon } = data[0];
                        // Centrar el mapa en la ciudad encontrada
                        map.setView([lat, lon], 14);
                        // Agregar marcador en la nueva ubicación
                        L.marker([lat, lon])
                            .addTo(map)
                            .bindPopup(`${city}`)
                            .openPopup();
                    } else {
                        alert("City not found. Try again."); // Mostrar alerta si la ciudad no se encuentra
                    }
                })
                .catch((error) => console.error("Error fetching location:", error));
        } else {
            alert("Enter a city name."); // Si el usuario no ingresa nada, mostrar alerta
        }
    });
});
