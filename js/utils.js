let headerLoaded = false;
let footerLoaded = false;

async function loadTemplate(path) {
    const res = await fetch(path);
    return await res.text();
}

function setupHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navbar = document.querySelector('.navbar');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    if (!hamburgerBtn || !navbar) return;

    // Estado inicial
    let menuOpen = false;

    // Función para alternar menú
    const toggleMenu = () => {
        menuOpen = !menuOpen;
        navbar.classList.toggle('active', menuOpen);
        hamburgerIcon.textContent = menuOpen ? '✕' : '☰';

        // Bloquear scroll cuando el menú está abierto
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    };

    // Evento de clic
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Cerrar al hacer clic en enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            navbar.classList.remove('active');
            hamburgerIcon.textContent = '☰';
            document.body.style.overflow = '';
        });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (menuOpen && !e.target.closest('.navbar') && !e.target.closest('.hamburger-btn')) {
            toggleMenu();
        }
    });

    // Cerrar al cambiar tamaño de pantalla
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });
}
// Funcion que carga el header y footer
export async function loadHeaderFooter() {
    if (!headerLoaded) {
        const headerTemplate = await loadTemplate("/partials/header.html");
        const headerElement = document.querySelector("#header");
        if (!headerElement.innerHTML.trim()) {
            headerElement.innerHTML = headerTemplate;
            // Configura el menú hamburguesa después de cargar el header
            // Usar requestAnimationFrame para asegurar que el DOM está listo
            setupHamburgerMenu();
        }
        headerLoaded = true;
    }

    if (!footerLoaded) {
        const footerTemplate = await loadTemplate("/partials/footer.html");
        const footerElement = document.querySelector("#footer");
        if (!footerElement.innerHTML.trim()) {
            footerElement.innerHTML = footerTemplate;
        }
        footerLoaded = true;
    }
}

/**
 * Función para redirigir a otra página.
 * @param {string} page - URL de la página a la que se desea navegar.
 */
export function navigateTo(page) {
    window.location.href = page;
}

// Guardar datos en localStorage
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Obtener datos desde localStorage
export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}
