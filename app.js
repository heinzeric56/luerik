// Konfiguration
const JSON_FILE_PATH = "public/whrbw_luerik.json"; // Pfad zu Ihrer JSON-Datei
const container = document.getElementById("content-container");
const PLACEHOLDER = '<span class="data-placeholder">---</span>';
/**
 * Erstellt eine Tabellenzelle mit Link, falls eine URL vorhanden ist.
 * Gibt einen Platzhalter zurück, wenn die URL fehlt oder "---" ist.
 */
function createLinkCell(url, linkText) {
    if (url && url !== "---" && url.trim() !== "") {
        return `<a href="${url}" target="_blank">${linkText}</a>`;
    }
    return PLACEHOLDER;
}
/**
 * Erstellt eine Tabellenzelle mit dem Datenwert.
 * Gibt einen Platzhalter zurück, wenn der Wert fehlt oder "---" ist.
 */
function createDataCell(value) {
    return value && value !== "---" && value.trim() !== "" ? value : PLACEHOLDER;
}
/**
 * Hauptfunktion: Lädt die JSON-Daten und rendert die Tabelle.
 */
async function loadAndRenderData() {
    if (!container)
        return;
    try {
        // Lade die JSON-Datei
        const response = await fetch(JSON_FILE_PATH);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        // Parsen der Daten als Array von LiedData
        const data = await response.json();
        container.innerHTML = ""; // Löscht den "Laden"-Text
        if (data.length === 0) {
            container.innerHTML = "<p>Keine Liederdaten in der Datei gefunden.</p>";
            return;
        }
        // Starte den Aufbau der Tabelle
        let tableHTML = `
            <div class="table-responsive">
                <table class="song-table">
                    <thead>
                        <tr>
                            <th>Opus</th>
                            <th>Titel</th>
                            <th>Autor / Komponist</th>
                            <th>Genre</th>
                            <th>Entstehung</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        // Fülle die Tabelle mit Datenreihen
        data.forEach((lied) => {
            tableHTML += `
                <tr>
                    <td>${createDataCell(lied.Opus)}</td>
                    <td>${createDataCell(lied.Titel_deutsch)}</td>
                    <td>
                        ${createDataCell(lied.Autor)}<br>
                        <small>Komponist: ${createDataCell(lied.Komponist)}</small>
                    </td>
                    <td>${createDataCell(lied.Genre)}</td>
                    <td>${createDataCell(lied.Entstehung)}</td>
                    <td>
                        ${createLinkCell(lied.YouTube, "▶️ Video")}<br>
                        ${createLinkCell(lied.TextuAkkorde_pdf, "📄 Text/Akkorde")}<br>
                        ${createLinkCell(lied.Aufnahme_mp3, "🎵 MP3-Aufnahme")}
                    </td>
                </tr>
            `;
        });
        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = tableHTML;
    }
    catch (error) {
        console.error("Fehler beim Laden oder Rendern der Daten:", error);
        container.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">
            Fehler beim Laden der Daten. Details: ${error instanceof Error ? error.message : "Unbekannter Fehler"}
        </p>`;
    }
}
// Starte den Prozess, sobald das DOM geladen ist
document.addEventListener("DOMContentLoaded", loadAndRenderData);
export {};
//# sourceMappingURL=app.js.map