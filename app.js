let mappaLeaflet = null; // Memorizza l'istanza della mappa per controllarla tra le varie funzioni

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inizializzazione e Iniezione Dati da data.js
  initDataInjection();

  // 2. Setup Navigazione SPA (Gestione Tab sui 5 nuovi pannelli)
  initTabNavigation();

  // 3. Setup Interattività Diario di Bordo (Card Espandibili)
  initDiarioExpandableCards();

  // 4. Setup Interattività Timeline Iter Amministrativo (Accordion)
  initIterAccordion();
});

/**
 * Inietta tutti i testi, i file PDF e i loghi di ERASMUS_DATA all'interno del DOM.
 */
function initDataInjection() {
  const data = ERASMUS_DATA;

  // ==========================================
  // METADATI GENERALI & INTESTAZIONI
  // ==========================================
  document.getElementById("site-title").textContent = data.infoGenerali.titoloProgetto;
  document.getElementById("site-subtitle").textContent = data.infoGenerali.scuola;
  document.getElementById("home-intro-text").textContent = data.home.sintesi;
  document.getElementById("meta-scuola").textContent = data.infoGenerali.scuola;
  document.getElementById("meta-periodo").textContent = data.infoGenerali.periodo;
  document.getElementById("meta-destinazione").textContent = data.infoGenerali.destinazione;

  // ==========================================
  // MENU 2: DIDATTICA & METODOLOGIA
  // ==========================================
  document.getElementById("didattica-titolo").textContent = data.didattica.titolo;
  document.getElementById("didattica-intro").textContent = data.didattica.introduzione;
  document.getElementById("didattica-grafico").src = ASSETS_REGISTRY.images.graficoDidattica;

  const listaMetodi = document.getElementById("didattica-lista-metodi");
  listaMetodi.innerHTML = data.didattica.keyPoints
    .map(punto => `<li>${punto}</li>`).join("");

  // Iniezione Sezione PDF "Modelli a Confronto"
  const confrontoContainer = document.getElementById("didattica-confronto-container");
  const comp = data.didattica.modelliConfronto;
  
  confrontoContainer.innerHTML = `
    <h3>${comp.titolo}</h3>
    <p class="narrative-text">${comp.descrizione}</p>
    <div class="docs-comparison-grid">
      <div class="doc-box-finlandia">
        <h4>Quadro Finlandese</h4>
        <a href="${comp.finlandia.url}" class="btn-document" target="_blank" rel="noopener noreferrer">
          ${comp.finlandia.name || comp.finlandia.nome} <span class="sr-only">(apre in una nuova scheda)</span>
        </a>
      </div>
      <div class="doc-box-italia">
        <h4>Indicazioni Nazionali Italiane</h4>
        <ul class="docs-pdf-list">
          ${comp.italia.map(pdf => `
            <li>
              <a href="${pdf.url}" target="_blank" rel="noopener noreferrer">
                ${pdf.nome} <span class="sr-only">(apre in una nuova scheda)</span>
              </a>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>
  `;

  // ==========================================
  // MENU 3: DIARIO DI BORDO (Generazione Card)
  // ==========================================
  const diarioContainer = document.getElementById("diario-cards-container");
  diarioContainer.innerHTML = data.diarioBordo
    .map(item => `
      <article class="diario-card" id="card-${item.id}">
        <div class="diario-card-header">
          <span class="diario-tag">${item.giorno}</span>
          <h4>${item.titolo}</h4>
        </div>
        <div class="diario-card-body">
          <p class="diario-anteprima">${item.anteprima}</p>
          <div class="diario-content-expanded" hidden>
            <p class="narrative-text">${item.testoCompleto}</p>
            ${item.img ? `<img src="${item.img}" alt="${item.titolo}" class="diario-img">` : ''}
          </div>
          <button class="btn-toggle-diario" aria-expanded="false" aria-controls="expanded-${item.id}">
            Leggi tutto <span class="sr-only">il resoconto del ${item.giorno}</span>
          </button>
        </div>
      </article>
    `).join("");

  // ==========================================
  // MENU 4: ITER AMMINISTRATIVO (Timeline)
  // ==========================================
  document.getElementById("iter-titolo").textContent = data.iterAmministrativo.titolo;
  document.getElementById("iter-descrizione").innerHTML = data.iterAmministrativo.descrizione;

  const iterContainer = document.getElementById("iter-timeline-container");
  iterContainer.innerHTML = data.iterAmministrativo.fasi
    .map((fase, idx) => {
      const faseId = `fase-${idx}`;
      return `
        <div class="timeline-item" id="${faseId}">
          <button class="timeline-trigger" aria-expanded="${idx === 0}" aria-controls="content-${faseId}">
            <span class="timeline-icon" aria-hidden="true"></span>
            <span class="timeline-title-text">${fase.titolo}</span>
          </button>
          <div id="content-${faseId}" class="timeline-content" role="region" ${idx === 0 ? '' : 'hidden'}>
            
            ${fase.testo ? `<p class="fase-descrizione">${fase.testo}</p>` : ''}
            
            ${fase.incombenze ? `
              <ul class="task-list">
                ${fase.incombenze.map(task => `
                  <li>
                    <h5>${task.titoloTask}</h5>
                    <p>${task.descrizione}</p>
                    ${task.allegati ? `
                      <div class="task-attachments">
                        ${task.allegati.map(all => `
                          <a href="${all.url}" class="task-link" target="_blank" rel="noopener noreferrer">
                            ${all.nome} <span class="sr-only">(apre in una nuova scheda)</span>
                          </a>
                        `).join("")}
                      </div>
                    ` : ''}
                  </li>
                `).join("")}
              </ul>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");

  // ==========================================
  // MENU 5: PARTENARIATI
  // ==========================================
  document.getElementById("partenariati-titolo").textContent = data.partenariati.titolo;
  document.getElementById("partenariati-descrizione").textContent = data.partenariati.descrizione;

  const partnerContainer = document.getElementById("partenariati-scuole-container");
  partnerContainer.innerHTML = data.partenariati.scuole
    .map(scuola => `
      <div class="partner-school-card">
        <div class="partner-logo-wrapper">
          <img src="${scuola.logo}" alt="Logo ${scuola.nome}" class="partner-logo">
        </div>
        <div class="partner-details">
          <h4>
            <a href="${scuola.sitoWeb}" target="_blank" rel="noopener noreferrer">
              ${scuola.nome} <span class="sr-only">(apre in una nuova scheda il sito ufficiale dell'istituto)</span>
            </a>
          </h4>
          <p class="partner-location"><strong>Sede:</strong> ${scuola.citta}</p>
          <p class="partner-info">${scuola.info}</p>
        </div>
      </div>
    `).join("");
}

/**
 * Gestisce lo switch dei pannelli della SPA tramite pattern ARIA Tablist standard.
 */
function initTabNavigation() {
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetPanelId = tab.getAttribute("aria-controls");

      tabs.forEach(t => {
        t.setAttribute("aria-selected", "false");
        t.classList.remove("active");
        t.setAttribute("tabindex", "-1");
      });

      panels.forEach(p => {
        p.setAttribute("hidden", "true");
        p.classList.remove("active");
      });

      tab.setAttribute("aria-selected", "true");
      tab.classList.add("active");
      tab.removeAttribute("tabindex");

      const targetPanel = document.getElementById(targetPanelId);
      targetPanel.removeAttribute("hidden");
      targetPanel.classList.add("active");

      // ==========================================================================
      // FIX MAPPA: Sveglia Leaflet e ricalcola le dimensioni della mappa visibile
      // ==========================================================================
      if (targetPanelId === "panel-partenariati" && typeof L !== 'undefined') {
        if (!mappaLeaflet) {
          initMappaInterattiva(ERASMUS_DATA.partenariati.scuole);
        } else {
          setTimeout(() => {
            mappaLeaflet.invalidateSize();
          }, 100);
        }
      }
    });

    tab.addEventListener("keydown", (e) => {
      const tabsArray = Array.from(tabs);
      const index = tabsArray.indexOf(tab);
      let nextTab;

      if (e.key === "ArrowRight") {
        nextTab = tabsArray[index + 1] || tabsArray[0];
      } else if (e.key === "ArrowLeft") {
        nextTab = tabsArray[index - 1] || tabsArray[tabsArray.length - 1];
      }

      if (nextTab) {
        nextTab.focus();
        nextTab.click();
      }
    });
  });
}

/**
 * Gestisce l'espansione e la compressione delle card del Diario di Bordo (Fisarmonica/Accordion)
 */
function initDiarioExpandableCards() {
  const container = document.getElementById("diario-cards-container");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-toggle-diario");
    if (!btn) return;

    const body = btn.closest(".diario-card-body");
    const expandedContent = body.querySelector(".diario-content-expanded");
    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = `Leggi tutto <span class="sr-only">${btn.querySelector('.sr-only').innerHTML}</span>`;
      expandedContent.setAttribute("hidden", "true");
    } else {
      btn.setAttribute("aria-expanded", "true");
      btn.innerHTML = `Chiudi <span class="sr-only">${btn.querySelector('.sr-only').innerHTML}</span>`;
      expandedContent.removeAttribute("hidden");
    }
  });
}

/**
 * Gestisce l'apertura e chiusura in stile Accordion dei blocchi della Timeline dell'Iter Amministrativo.
 */
function initIterAccordion() {
  const container = document.getElementById("iter-timeline-container");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const trigger = e.target.closest(".timeline-trigger");
    if (!trigger) return;

    const currentExpanded = trigger.getAttribute("aria-expanded") === "true";
    const contentId = trigger.getAttribute("aria-controls");
    const contentPanel = document.getElementById(contentId);

    trigger.setAttribute("aria-expanded", !currentExpanded);
    if (currentExpanded) {
      contentPanel.setAttribute("hidden", "true");
    } else {
      contentPanel.removeAttribute("hidden");
    }
  });
}

/**
 * Genera e istanzia la mappa interattiva europea usando i LOGHI delle scuole come marker
 */
function initMappaInterattiva(scuole) {
  if (!document.getElementById('map')) return;

  // FIX DEFINITIVO: Assegniamo l'istanza alla variabile globale mappaLeaflet
  mappaLeaflet = L.map('map').setView([50.0, 4.0], 4);

  // Carica i tasselli OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(mappaLeaflet);

// Cicla i dati delle scuole per stampare i marker con i rispettivi loghi proporzionali
  scuole.forEach(scuola => {
    if (scuola.coordinate) {
      
      // SOLUZIONE LOGHI PROPORZIONALI: 
      // Blocchiamo l'altezza a 50px e lasciamo la larghezza automatica (auto) per non deformare il logo.
      const logoIcon = L.divIcon({
        html: `<div style="background-color: white; border: 2px solid #002654; border-radius: 6px; height: 50px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); padding: 4px; box-sizing: border-box;">
                 <img src="${scuola.logo}" alt="Logo ${scuola.nome}" style="height: 100%; width: auto; object-fit: contain; display: block;">
               </div>`,
        className: '',          // Svuota le classi di default per evitare sfondi di disturbo
        iconSize: null,         // Rimuovendo il valore fisso, Leaflet permette all'HTML di espandersi in larghezza
        iconAnchor: [25, 25],   // Ancoraggio centrale approssimativo (metà dell'altezza di 50px)
        popupAnchor: [0, -25]   // Aggancia il fumetto informativo appena sopra il logo
      });

      // Crea il marker usando l'icona proporzionale
      const marker = L.marker([scuola.coordinate.lat, scuola.coordinate.lng], { icon: logoIcon }).addTo(mappaLeaflet);
      
      // Contenuto del popup al clic sul logo
      const popupContent = `
        <div style="font-family: var(--font-sans, sans-serif); max-width: 200px;">
          <h5 style="margin: 0 0 4px 0; color: #002654; font-size: 1rem;">${scuola.nome}</h5>
          <p style="margin: 0 0 6px 0; font-size: 0.85rem; font-style: italic; color: var(--text-muted);">${scuola.citta}</p>
          <p style="margin: 0; font-size: 0.8rem; line-height: 1.3; color: var(--text-dark);">${scuola.info}</p>
        </div>
      `;
      marker.bindPopup(popupContent);
    }
  });