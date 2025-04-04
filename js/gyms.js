import { saveToLocalStorage, loadHeaderFooter } from "./utils.js";
import { gymsData } from "./data/datagym.js";

// Inicializar mapa
function initMap() {
    const map = L.map("map").setView([4.710989, -74.072092], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Agrega marcadores para cada gimnasio
    gymsData.forEach(gym => {
        const marker = L.marker(gym.coordinates)
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <img src="${gym.image}" alt="${gym.name}" width="100">
                    <h3>${gym.name}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${gym.address}</p>
                    <p><i class="fas fa-clock"></i> ${gym.schedule.replace(/\n/g, '<br>')}</p>
                    <button class="view-gym-btn" data-gym="${gym.id}">Ver detalles</button>
                </div>
            `);

        marker.on('popupopen', () => {
            document.querySelector(`.view-gym-btn[data-gym="${gym.id}"]`)
                .addEventListener('click', () => {
                    saveToLocalStorage("selectedGym", gym);
                    window.location.href = "../views/register.html";
                });
        });
    });

    return map;
}

// Cargar lista de gimnasios
function loadGyms() {
    const gymList = document.getElementById("gym-list");
    gymList.innerHTML = ""; // Limpiar lista

    gymsData.forEach(gym => {
        console.log("GymData", gym);
        const gymCard = document.createElement("div");
        gymCard.classList.add("gym-card");
        // Dentro de la función loadGyms(), actualiza el innerHTML de gymCard:
        gymCard.innerHTML = `
        <img src="${gym.image}" alt="${gym.name}" loading="lazy">
        <h2>${gym.name}</h2>
        <p><i class="fas fa-map-marker-alt"></i> ${gym.location}</p>
        <p><i class="fas fa-address-card"></i> ${gym.address}</p>

        <div class="plans-container">
            <h3 class="plans-title"><i class="fas fa-tags"></i> Planes Disponibles</h3>
            <div class="plans-grid">
                ${Object.entries(gym.prices).map(([plan, details]) => `
                    <div class="plan-option" data-plan="${plan}" data-gym="${gym.id}">
                        <span class="plan-name">${plan}</span>
                        <span class="plan-price">${details.price}</span>
                        <span class="plan-desc">${details.description}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <button class="register-btn" data-gym="${gym.id}">
            <i class="fas fa-user-plus"></i> Register
        </button>
        `;
        gymList.appendChild(gymCard);
    });

    // Eventos para botones de registro
    document.querySelectorAll(".register-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const gymId = e.currentTarget.dataset.gym;
            const selectedGym = gymsData.find(g => g.id === gymId);
            saveToLocalStorage("selectedGym", selectedGym);
            window.location.href = "../views/register.html";
        });
    });

    // Eventos para selección de planes
    document.querySelectorAll(".select-plan-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const planCard = e.currentTarget.closest(".plan-card");
            const gymId = planCard.dataset.gym;
            const plan = planCard.dataset.plan;

            const selectedGym = gymsData.find(g => g.id === gymId);
            const planInfo = selectedGym.prices[plan];

            saveToLocalStorage("selectedPlan", {
                name: plan.charAt(0).toUpperCase() + plan.slice(1),
                price: planInfo.price,
                description: planInfo.description
            });

            alert(`Has seleccionado el plan ${plan} en ${selectedGym.name}`);
        });
    });
}

// Geolocalización
function setupGeolocation(map) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 14);

                L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup("<b>¡Estás aquí!</b>")
                    .openPopup();
            },
            error => {
                console.log("Error obteniendo ubicación:", error);
            },
            { timeout: 10000 }
        );
    } else {
        console.log("Geolocalización no soportada");
    }
}

// Búsqueda de ubicación
function setupLocationSearch(map) {
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search");

    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (!query) return;

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    map.setView([lat, lon], 14);

                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`<b>${query}</b>`)
                        .openPopup();
                } else {
                    alert("Ubicación no encontrada");
                }
            })
            .catch(error => {
                console.error("Error en búsqueda:", error);
                alert("Error al buscar ubicación");
            });
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
    const map = initMap();
    loadGyms();
    setupGeolocation(map);
    setupLocationSearch(map);
});