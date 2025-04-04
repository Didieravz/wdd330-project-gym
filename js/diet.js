import { loadHeaderFooter } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("diet-form").addEventListener("submit", fetchDietPlan);
    loadHeaderFooter();
});



// Función para obtener recetas de TheMealDB según el objetivo del usuario
async function fetchDietPlan(event) {
    event.preventDefault();

    // Obtener el objetivo del usuario
    const goal = document.querySelector("select[name='goal']").value;

    // Definir la categoría de comida según el objetivo
    let category = goal === "weight_loss" ? "Seafood" : "Beef";

    try {
        // Consumir la API pública de TheMealDB
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo obtener la información.`);
        }

        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
            console.warn("⚠️ No se encontraron recetas.");
            document.getElementById("diet-results").innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        displayDietResults(data.meals);
    } catch (error) {
        console.error("❌ Error obteniendo plan de dieta:", error);
        document.getElementById("diet-results").innerHTML = "<p>Ocurrió un error al obtener los datos.</p>";
    }
}

// Función para mostrar recetas obtenidas de TheMealDB
function displayDietResults(results) {
    const resultsDiv = document.getElementById("diet-results");
    resultsDiv.innerHTML = ""; // Limpiar resultados anteriores

    results.forEach(meal => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">Ver Receta</a>
        `;

        resultsDiv.appendChild(recipeCard);
    });
}
