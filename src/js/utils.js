let headerLoaded = false;
let footerLoaded = false;

async function loadTemplate(path) {
    const res = await fetch(path);
    return await res.text();
}

export async function loadHeaderFooter() {
    // console.log("Probando...");
    if (!headerLoaded) {
        const headerTemplate = await loadTemplate("/src/partials/header.html");
        const headerElement = document.querySelector("#header");
        if (!headerElement.innerHTML.trim()) {
            headerElement.innerHTML = headerTemplate;
        }
        headerLoaded = true;
    }

    if (!footerLoaded) {
        const footerTemplate = await loadTemplate("/src/partials/footer.html");
        const footerElement = document.querySelector("#footer");
        if (!footerElement.innerHTML.trim()) {
            footerElement.innerHTML = footerTemplate;
        }
        footerLoaded = true;
    }
}
