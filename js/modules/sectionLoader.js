// js/modules/sectionLoader.js

export async function loadSections() {
    const sectionContainers = document.querySelectorAll('[data-section]');
    const loadPromises = []; 

    for (const container of sectionContainers) {
        const sectionName = container.dataset.section;
        if (sectionName) {
            const promise = fetch(`sections/${sectionName}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Fehler beim Laden der Sektion ${sectionName}: ${response.status} ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(html => {
                    container.innerHTML = html;
                })
                .catch(error => {
                    console.error(error);
                    container.innerHTML = `<p style="color: var(--color-error); text-align: center;">Konnte Sektion ${sectionName} nicht laden.</p>`;
                });
            loadPromises.push(promise);
        }
    }
    await Promise.all(loadPromises);

}