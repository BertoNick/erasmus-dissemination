let mappaLeaflet = null; // Memorizza l'istanza della mappa per controllarla tra le varie funzioni

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inizializzazione e Iniezione Dati da data.js
  initDataInjection();

  // 2. Setup Navigazione SPA (Gestione Tab sui 5 pannelli)
  initTabNavigation();

  // 3. Setup Interattività Diario di Bordo (Card Espandibili)
  initDiarioExpandableCards();

  // 4. Setup Interattività Timeline Iter Amministrativo (Accordion)
  initIterAccordion();

  // 5. Setup Menù Hamburger Mobile
  initMobileMenu();
});

/**
 * Inietta tutti i testi, i file PDF e i loghi di ERASMUS_DATA all'interno del DOM.
 */
function initDataInjection() {
  const data = ERASMUS_DATA;

  // ==========================================
  // METADATI GENERALI & INTESTAZIONI
  // ==========================================
  const siteTitle = document.getElementById("site-title");
  if (siteTitle) siteTitle.textContent = data.infoGenerali.titoloProgetto;

  const siteSubtitle = document.getElementById("site-subtitle");
  if (siteSubtitle) siteSubtitle.textContent = data.infoGenerali.scuola;

  const homeIntro = document.getElementById("home-intro-text");
  if (homeIntro) homeIntro.textContent = data.home.sintesi;

  const metaScuola = document.getElementById("meta-scuola");
  if (metaScuola) metaScuola.textContent = data.infoGenerali.scuola;

  const metaPeriodo = document.getElementById("meta-periodo");
  if (metaPeriodo) metaPeriodo.textContent = data.infoGenerali.periodo;

  const metaDestinazione = document.getElementById("meta-destinazione");
  if (metaDestinazione) metaDestinazione.textContent = data.infoGenerali.destinazione;

  // ==========================================
  // MENU 2: DIDATTICA & METODOLOGIA
  // ==========================================
  const didatticaTitolo = document.getElementById("didattica-titolo");
  if (didatticaTitolo) didatticaTitolo.textContent = data.didattica.titolo;

  const didatticaIntro = document.getElementById("didattica-intro");
  if (didatticaIntro) didatticaIntro.textContent = data.didattica.introduzione;

  // Blocco dinamico per il Carosello Didattica
  const didatticaMediaContainer = document.getElementById("didattica-media-container");
  if (didatticaMediaContainer && typeof ASSETS_REGISTRY !== 'undefined') {
    const fotoDidattica = ASSETS_REGISTRY.images.immaginiDidattica;
    let htmlContent = '';

    if (fotoDidattica && fotoDidattica.length > 0) {
      if (fotoDidattica.length === 1) {
        htmlContent = `
          <figure class="image-wrapper">
            <img src="${fotoDidattica[0]}" alt="Grafico didattica" class="diario-img">
            <figcaption>Fig 1. Strutturazione del tempo scuola ed approccio olistico.</figcaption>
          </figure>`;
      } else {
        htmlContent = `
          <div class="diario-carousel" data-current="0">
            <div class="carousel-track">
              ${fotoDidattica.map((img, idx) => `
                <img src="${img}" alt="Didattica - Foto ${idx + 1}" class="carousel-img ${idx === 0 ? 'active' : ''}" style="${idx !== 0 ? 'display:none;' : ''}">
              `).join("")}
            </div>
            <div class="carousel-controls">
              <button type="button" class="btn-carousel-prev" aria-label="Immagine precedente">◀</button>
              <span class="carousel-indicator">1 / ${fotoDidattica.length}</span>
              <button type="button" class="btn-carousel-next" aria-label="Immagine successiva">▶</button>
            </div>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-muted); text-align: center; margin-top: 0.5rem; font-style: italic;">
            Fig 1. Galleria immagini: Ambienti di apprendimento e modelli orari.
          </p>
        `;
      }
    }
    didatticaMediaContainer.innerHTML = htmlContent;
  }

  const listaMetodi = document.getElementById("didattica-lista-metodi");
  if (listaMetodi) {
    listaMetodi.innerHTML = data.didattica.keyPoints
      .map(punto => `<li>${punto}</li>`).join("");
  }

  // Iniezione Sezione PDF "Modelli a Confronto"
  const confrontoContainer = document.getElementById("didattica-confronto-container");
  if (confrontoContainer) {
    const comp = data.didattica.modelliConfronto;
    const finlandiaNome = comp.finlandia.nome || comp.finlandia.name || "National Core Curriculum";
    
    confrontoContainer.innerHTML = `
      <h3>${comp.titolo}</h3>
      <p class="narrative-text">${comp.descrizione}</p>
      <div class="docs-comparison-grid">
        <div class="doc-box-finlandia">
          <h4>Quadro Finlandese</h4>
          <a href="${comp.finlandia.url}" class="btn-document" target="_blank" rel="noopener noreferrer">
            ${finlandiaNome} <span class="sr-only">(apre in una nuova scheda)</span>
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
  }

  // ==========================================
  // MENU 3: DIARIO DI BORDO (Generazione Card & Caroselli)
  // ==========================================
  const diarioContainer = document.getElementById("diario-cards-container");
  if (diarioContainer) {
    diarioContainer.innerHTML = data.diarioBordo
      .map(item => {
        let mediaHtml = '';
        
        if (item.immagini && item.immagini.length > 0) {
          if (item.immagini.length === 1) {
            mediaHtml = `<img src="${item.immagini[0]}" alt="${item.titolo}" class="diario-img">`;
          } else {
            // Struttura dinamica del carosello d'immagini multiplo
            mediaHtml = `
              <div class="diario-carousel" data-current="0">
                <div class="carousel-track">
                  ${item.immagini.map((img, idx) => `
                    <img src="${img}" alt="${item.titolo} - Foto ${idx + 1}" class="carousel-img ${idx === 0 ? 'active' : ''}" style="${idx !== 0 ? 'display:none;' : ''}">
                  `).join("")}
                </div>
                <div class="carousel-controls">
                  <button type="button" class="btn-carousel-prev" aria-label="Immagine precedente">◀</button>
                  <span class="carousel-indicator">1 / ${item.immagini.length}</span>
                  <button type="button" class="btn-carousel-next" aria-label="Immagine successiva">▶</button>
                </div>
              </div>
            `;
          }
        }

        return `
          <article class="diario-card" id="card-${item.id}">
            <div class="diario-card-header">
              <span class="diario-tag">${item.giorno}</span>
              <h4>${item.titolo}</h4>
            </div>
            <div class="diario-card-body">
              <p class="diario-anteprima">${item.anteprima}</p>
              <div class="diario-content-expanded" hidden>
                <p class="narrative-text">${item.testoCompleto}</p>
                ${mediaHtml}
              </div>
              <button class="btn-toggle-diario" aria-expanded="false" aria-controls="expanded-${item.id}">
                Leggi tutto <span class="sr-only">il resoconto del ${item.giorno}</span>
              </button>
            </div>
          </article>
        `;
      }).join("");
  }

  // ==========================================
  // MENU 4: ITER AMMINISTRATIVO (Timeline Accordion)
  // ==========================================
  const iterTitolo = document.getElementById("iter-titolo");
  if (iterTitolo) iterTitolo.textContent = data.iterAmministrativo.titolo;
  
  const iterDescrizione = document.getElementById("iter-descrizione");
  if (iterDescrizione) iterDescrizione.innerHTML = data.iterAmministrativo.descrizione;

  const iterContainer = document.getElementById("iter-timeline-container");
  if (iterContainer) {
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
  }

  // ==========================================
  // MENU 5: PARTENARIATI
  // ==========================================
  const partTitolo = document.getElementById("partenariati-titolo");
  if (partTitolo) partTitolo.textContent = data.partenariati.titolo;
  
  const partDesc = document.getElementById("partenariati-descrizione");
  if (partDesc) partDesc.textContent = data.partenariati.descrizione;

  const partnerContainer = document.getElementById("partenariati-scuole-container");
  if (partnerContainer) {
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

  // ==========================================
  // AZIONI POST-INIEZIONE (Caroselli e KaTeX)
  // ==========================================
  
  // 1. Attiva l'ascolto dei click su tutti i caroselli generati (Didattica + Diario)
  initCarouselListeners();

  // 2. Forza la conversione dei simboli LaTeX in formule matematiche/chimiche
  if (typeof renderMathInElement !== 'undefined') {
    const configurazioneKatex = {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false
    };

    // Scansiona il contenitore del diario
    if (diarioContainer) {
      renderMathInElement(diarioContainer, configurazioneKatex);
    }
    // Scansiona il contenitore della didattica (in caso di formule presenti nelle introduzioni o didascalie)
    if (didatticaMediaContainer) {
      renderMathInElement(didatticaMediaContainer, configurazioneKatex);
    }
    const didatticaIntroEl = document.getElementById("didattica-intro");
    if (didatticaIntroEl) {
      renderMathInElement(didatticaIntroEl, configurazioneKatex);
    }
  }
}

/**
 * Gestisce lo scorrimento delle immagini nei caroselli del Diario di Bordo e della Didattica
 */
function initCarouselListeners() {
  document.querySelectorAll('.diario-carousel').forEach(carousel => {
    const prevBtn = carousel.querySelector('.btn-carousel-prev');
    const nextBtn = carousel.querySelector('.btn-carousel-next');
    const indicator = carousel.querySelector('.carousel-indicator');
    const imgs = carousel.querySelectorAll('.carousel-img');
    const total = imgs.length;

    const updateCarousel = (newIndex) => {
      carousel.setAttribute('data-current', newIndex);
      imgs.forEach((img, idx) => {
        img.style.display = idx === newIndex ? 'block' : 'none';
        img.classList.toggle('active', idx === newIndex);
      });
      indicator.textContent = `${newIndex + 1} / ${total}`;
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let current = parseInt(carousel.getAttribute('data-current'));
        let next = current === 0 ? total - 1 : current - 1;
        updateCarousel(next);
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let current = parseInt(carousel.getAttribute('data-current'));
        let next = current === total - 1 ? 0 : current + 1;
        updateCarousel(next);
      });
    }
  });
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
      if (targetPanel) {
        targetPanel.removeAttribute("hidden");
        targetPanel.classList.add("active");
      }

      // Ricalcola le dimensioni geometriche di Leaflet se si passa alla mappa dei partenariati
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
 * Gestisce l'espansione e la compressione delle card del Diario di Bordo
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

    if (contentPanel) {
      trigger.setAttribute("aria-expanded", !currentExpanded);
      if (currentExpanded) {
        contentPanel.setAttribute("hidden", "true");
      } else {
        contentPanel.removeAttribute("hidden");
      }
    }
  });
}

/**
 * Genera e istanzia la mappa interattiva europea usando i LOGHI delle scuole come marker puntuali puliti
 */
function initMappaInterattiva(scuole) {
  if (!document.getElementById('map')) return;

  // Istanzia la mappa centrata sull'Europa centro-settentrionale
  mappaLeaflet = L.map('map').setView([54.0, 14.0], 4);

  // Carica i tasselli stradali OpenStreetMap standard
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(mappaLeaflet);

  scuole.forEach(scuola => {
    if (scuola.coordinate && scuola.coordinate.lat && scuola.coordinate.lng) {
      
      // Iniezione di nodi divIcon personalizzati per mantenere le proporzioni native ed evitare distorsioni
      const logoIcon = L.divIcon({
        html: `<div style="background-color: white; border: 2px solid #002654; border-radius: 6px; height: 50px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); padding: 4px; box-sizing: border-box;">
                 <img src="${scuola.logo}" alt="Logo ${scuola.nome}" style="height: 100%; width: auto; object-fit: contain; display: block;">
               </div>`,
        className: '',
        iconSize: null,
        iconAnchor: [25, 25],
        popupAnchor: [0, -25]
      });

      // Configurazione pulita delle coordinate numeriche estratte
      const marker = L.marker([scuola.coordinate.lat, scuola.coordinate.lng], { icon: logoIcon }).addTo(mappaLeaflet);
      
      const popupContent = `
        <div style="font-family: var(--font-sans, sans-serif); max-width: 200px;">
          <h5 style="margin: 0 0 4px 0; color: #BD2A00; font-size: 1rem; font-weight:700;">${scuola.nome}</h5>
          <p style="margin: 0 0 6px 0; font-size: 0.85rem; font-style: italic; color: var(--text-muted);">${scuola.citta}</p>
          <p style="margin: 0; font-size: 0.8rem; line-height: 1.3; color: var(--text-dark);">${scuola.info}</p>
        </div>
      `;
      marker.bindPopup(popupContent);
    }
  });
}

/**
 * Gestisce l'apertura e la chiusura della tendina del menu su dispositivi Mobile
 */
function menuToggleAction(navTabs, menuToggle) {
  const isOpen = navTabs.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.innerHTML = isOpen ? '<span class="hamburger-icon" aria-hidden="true">✖</span>' : '<span class="hamburger-icon" aria-hidden="true">☰</span>';
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navTabs = document.getElementById("nav-tabs");

  if (!menuToggle || !navTabs) return;

  // 1. Click sul pulsante Hamburger: attiva/disattiva la classe .open
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menuToggleAction(navTabs, menuToggle);
  });

  // 2. Chiusura automatica a selezione avvenuta
  const tabs = navTabs.querySelectorAll('[role="tab"]');
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      if (navTabs.classList.contains("open")) {
        navTabs.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<span class="hamburger-icon" aria-hidden="true">☰</span>';
      }
    });
  });

  // 3. Chiusura resiliente se l'utente clicca un'area esterna della pagina
  document.addEventListener("click", (e) => {
    if (!navTabs.contains(e.target) && !menuToggle.contains(e.target)) {
      if (navTabs.classList.contains("open")) {
        navTabs.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<span class="hamburger-icon" aria-hidden="true">☰</span>';
      }
    }
  });
}