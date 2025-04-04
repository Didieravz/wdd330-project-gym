import { loadHeaderFooter, navigateTo } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();

    const findGymBtn = document.querySelector("#find-gym");
    const registerBtn = document.querySelector("#register");
    const getDietBtn = document.querySelector("#get-diet");

    if (findGymBtn) findGymBtn.addEventListener("click", () => navigateTo("../views/gyms.html"));
    if (registerBtn) registerBtn.addEventListener("click", () => navigateTo("../views/register.html"));
    if (getDietBtn) getDietBtn.addEventListener("click", () => navigateTo("../views/diet.html"));
});


// Estructura del proyecto:
// - index.html (Página principal)
// - views/
//    - gyms.html (Mapa y lista de gimnasios)
//    - register.html (Formulario de inscripción)
//    - diet.html (API de Edamam)
// - js/
//    - app.js (Carga dinámica y navegación)
//    - map.js (Manejo del mapa y gimnasios)
//    - register.js (Formulario de inscripción con Formspree)
//    - diet.js (Manejo de la API de Edamam)
//    - storage.js (Manejo de LocalStorage)
//    - utils.js (Funciones auxiliares y carga de header/footer)