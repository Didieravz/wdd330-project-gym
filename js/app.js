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
