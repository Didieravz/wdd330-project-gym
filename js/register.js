import { getFromLocalStorage, saveToLocalStorage, loadHeaderFooter } from "./utils.js";
import { gymsData, membershipPlans } from "./data/dataGym.js";

// Llena selectores
function populateSelectors() {
    const gymSelect = document.getElementById("gym-select");
    const planSelect = document.getElementById("plan");

    // Limpia selects
    gymSelect.innerHTML = '<option value="" disabled selected>Selecciona un gimnasio</option>';
    planSelect.innerHTML = '<option value="" disabled selected>Selecciona un plan</option>';

    // fill list gimnasios
    gymsData.forEach(gym => {
        const option = document.createElement("option");
        option.value = gym.id;
        option.textContent = `${gym.name} - ${gym.location}`;
        gymSelect.appendChild(option);
    });

    // Llena selector planes
    membershipPlans.forEach(plan => {
        const option = document.createElement("option");
        option.value = plan.id;
        option.textContent = `${plan.name} (${plan.features[0]})`;
        option.title = plan.features.join("\n");
        planSelect.appendChild(option);
    });

    // Selección previa si existe en localStorage
    const selectedGym = getFromLocalStorage("selectedGym");
    if (selectedGym) {
        gymSelect.value = selectedGym.id;
    }
}

// Mostrar detalles del plan
function setupPlanDetails() {
    const planSelect = document.getElementById("plan");
    const planDetails = document.getElementById("plan-details");

    planSelect.addEventListener("change", () => {
        const selectedPlan = membershipPlans.find(p => p.id === planSelect.value);
        if (selectedPlan) {
            planDetails.innerHTML = `
                <h3>${selectedPlan.name}</h3>
                <ul>
                    ${selectedPlan.features.map(f => `<li>${f}</li>`).join("")}
                </ul>
            `;
            planDetails.style.display = "block";
        } else {
            planDetails.style.display = "none";
        }
    });
}

// Validación de formulario
function setupFormValidation() {
    const form = document.getElementById("register-form");
    const termsCheckbox = document.getElementById("terms");
    const termsError = document.getElementById("terms-error");

    form.addEventListener("submit", (e) => {
        if (!termsCheckbox.checked) {
            e.preventDefault();
            termsError.style.display = "block";
            termsCheckbox.focus();
        }
    });

    termsCheckbox.addEventListener("change", () => {
        termsError.style.display = "none";
    });
}

// Manejar envío del formulario
function handleFormSubmission() {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {
            gym: gymsData.find(g => g.id === form.elements["gym"].value),
            plan: membershipPlans.find(p => p.id === form.elements["plan"].value),
            user: {
                name: form.elements["name"].value,
                email: form.elements["email"].value,
                phone: form.elements["phone"].value
            },
            date: new Date().toISOString(),
            acceptedTerms: true
        };

        saveToLocalStorage("registrationData", formData);

        // Mostrar ventana confirmación
        Swal.fire({
            title: "¡Registro exitoso!",
            html: `
                <p>Te has registrado en <strong>${formData.gym.name}</strong></p>
                <p>Plan: <strong>${formData.plan.name}</strong></p>
                <p>Recibirás un correo de confirmación en <strong>${formData.user.email}</strong></p>
            `,
            icon: "success",
            confirmButtonText: "Entendido"
        }).then(() => {
            // redirect to the home page
            window.location.href = "../index.html";
        });
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
    populateSelectors();
    setupPlanDetails();
    setupFormValidation();
    handleFormSubmission();

    // Muestra gimnasio seleccionado si viene de la página de gimnasios
    const selectedGym = getFromLocalStorage("selectedGym");
    if (selectedGym) {
        document.getElementById("gym-select").value = selectedGym.id;
    }
});