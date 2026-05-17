/**
 * ERASMUS_DATA - Single Source of Truth del progetto.
 * Mappa tutte le informazioni della SPA per facilitare la manutenzione.
 */

// ==========================================================================
// 1. REGISTRO CENTRALE DEGLI ASSETS (Mappatura file reali su GitHub)
// ==========================================================================
const ASSETS_REGISTRY = {
  logos: {
    manzoni: "assets/icons/logo-manzoni.png",
    erasmus: "assets/icons/logo-erasmus.jpg",
    leppavaara: "assets/icons/logo-leppavaaran_lukio.png",
    malaga: "assets/icons/logo-malaga.jpg",
    ourense: "assets/icons/logo-ourense.png",
    magonza: "assets/icons/logo-magonza.jpeg",
    monaco: "assets/icons/logo-monaco.jpg"
  },
  images: {
    graficoDidattica: "assets/img/grafico-scuole.jpg" 
  },
  documents: {
    // Didattica
    curriculumFinlandia: "assets/docs/finnish-high_school-core-curriculum-2019-english.pdf",
    inLinguistico: "assets/docs/in-liceo-linguistico.pdf",
    inMusicale: "assets/docs/in-liceo-musicale.pdf",
    inScienzeUmane: "assets/docs/in-scienze-umane.pdf",
    inLes: "assets/docs/in-les.pdf",
    // Iter Amministrativo
    participantReport: "assets/docs/erasmus-participant_report.pdf",
    relazioneInterna: "assets/docs/erasmus-realzione_interna.pdf"
  }
};

// ==========================================================================
// 2. IL CORE DEI DATI DELL'APPLICAZIONE (Struttura Unificata)
// ==========================================================================
const ERASMUS_DATA = {
  
  // DATI DI INTESTAZIONE GLOBALI
  infoGenerali: {
    titoloProgetto: "Job shadowing Espoo 2026",
    scuola: "ISS A. Manzoni - Varese, Italia",
    periodo: "Marzo 2026",
    destinazione: "Leppävaaran lukio - Espoo, Finlandia"
  },
  
  // MENU 1: HOME
  home: {
    titolo: "Mobilità Transnazionale e Job Shadowing",
    sintesi: "Il progetto di Job Shadowing del Liceo A. Manzoni offre ai docenti l'opportunità di immergersi nei sistemi educativi europei d'avanguardia. Attraverso l'osservazione diretta delle lezioni, il confronto con i colleghi stranieri e lo studio dei modelli organizzativi, il nostro istituto promuove l'innovazione didattica, l'internazionalizzazione e lo scambio di buone pratiche pedagogiche nell'ottica di una scuola sostenibile e proiettata nel futuro."
  },
  
  // MENU 2: DIDATTICA & METODOLOGIA
  didattica: {
    titolo: "Didattica & Metodologia",
    introduzione: "Il sistema scolastico finlandese si concentra sul benessere dell'individuo, sulla fiducia istituzionale e sull'autonomia pedagogica. Durante l'attività sul campo presso il Leppävaaran lukio, abbiamo osservato da vicino come l'apprendimento basato sui fenomeni (Phenomenon-based learning) venga integrato quotidianamente.",
    keyPoints: [
      "Phenomenon-Based Learning (Apprendimento transdisciplinare basato su problemi reali e co-progettazione STEM).",
      "Flessibilità oraria strutturata e personalizzazione profonda del piano di studi (curriculum non vincolato alla classe).",
      "Student-Centered Assessment: valutazione prevalentemente formativa, mirata all'auto-consapevolezza e priva di ansia da prestazione.",
      "Integrazione del benessere psicofisico: ritmi di apprendimento distesi con pause attive di 15 minuti ogni 45 di lezione in ambienti modulari e integrati."
    ],
    modelliConfronto: {
      titolo: "Modelli a Confronto",
      descrizione: "Cliccando sui link sottostanti è possibile consultare i documenti programmatici ufficiali che regolano la didattica in Finlandia e i quadri normativi (Indicazioni Nazionale) dei quattro indirizzi del Liceo Manzoni coinvolti nell'esperienza di Job Shadowing.",
      finlandia: {
        nome: "National Core Curriculum - Finlandia (High School)",
        url: ASSETS_REGISTRY.documents.curriculumFinlandia
      },
      italia: [
        { nome: "Indicazioni Nazionali - Liceo Linguistico", url: ASSETS_REGISTRY.documents.inLinguistico },
        { nome: "Indicazioni Nazionali - Liceo Musicale", url: ASSETS_REGISTRY.documents.inMusicale },
        { nome: "Indicazioni Nazionali - Liceo Scienze Umane", url: ASSETS_REGISTRY.documents.inScienzeUmane },
        { nome: "Indicazioni Nazionali - Liceo Economico-Sociale (LES)", url: ASSETS_REGISTRY.documents.inLes }
      ]
    }
  },
  
  // MENU 3: DIARIO DI BORDO (Predisposto per Card Espandibili)
  diarioBordo: [
    {
      id: "day1",
      giorno: "Giorno 1",
      titolo: "Accoglienza e immersione nella cultura 'Lukio'",
      anteprima: "Primo impatto con le scuole partner. Lezioni rigorosamente senza scarpe, ampi spazi aperti e un clima di profonda fiducia reciproca...",
      testoCompleto: "Primo impatto con la scuola Leppävaaran lukio a Espoo. Accolti dalla Dirigente, abbiamo compreso l'organizzazione degli spazi flessibili e assistito alle prime lezioni di lingua e laboratori scientifici, dove gli studenti gestiscono autonomamente i propri moduli di studio tramite la piattaforma digitale in un clima di totale fiducia. Focus speciale sulla sostenibilità: flussi cartacei azzerati grazie alla digitalizzazione.",
      img: ASSETS_REGISTRY.images.graficoDidattica // Sostituiremo con la foto del Giorno 1 appena la carichi
    },
    {
      id: "day3",
      giorno: "Giorno 3",
      titolo: "Laboratori di Co-progettazione",
      anteprima: "Sessione di programmazione congiunta sul potenziamento STEM. Abbiamo analizzato come la sostenibilità sia un pilastro di ogni disciplina...",
      testoCompleto: "Sessione di programmazione congiunta sul potenziamento STEM con i colleghi finlandesi. Abbiamo analizzato come la sostenibilità ambientale non sia considerata una materia a sé stante, ma un pilastro trasversale inserito in ogni disciplina scientifica, supportato da statistiche d'istituto sul tracciamento degli sprechi alimentari nelle mense.",
      img: ASSETS_REGISTRY.images.graficoDidattica // Sostituiremo con la foto del Giorno 3 appena la carichi
    }
  ],
  
  // MENU 4: ITER AMMINISTRATIVO (Timeline unificata)
  iterAmministrativo: {
    titolo: "Iter amministrativo",
    descrizione: "Come si passa da 'vorrei fare un job-shadowing' a 'ho fatto un job-shadowing'? <br> La transizione dall'ideazione del progetto alla sua rendicontazione finale segue un protocollo rigoroso. Di seguito sono riportati i passaggi chiave per la gestione della mobilità e i modelli documentali prodotti.",
    fasi: [
      {
        titolo: "Fase 1: Prima della partenza",
        incombenze: [
          {
            titoloTask: "Presentazione domanda di candidatura",
            descrizione: "Compilazione del form interno d'istituto, bando di selezione e allegato CV in formato Europass basato su competenze linguistiche e motivazione."
          },
          {
            titoloTask: "Firma del cotratto di mobilità e del learning-agreement",
            descrizione: "Sottoscrizione del contratto finanziario Erasmus+ ufficiale tra il Liceo Manzoni e il docente partecipante per l'assegnazione dei fondi."
          }
        ]
      },
      {
        titolo: "Fase 2: Durante la mobilità",
        incombenze: [
          {
            titoloTask: "Registro delle presenze e certificazione",
            descrizione: "Firma quotidiana presso il Leppävaaran lukio per attestare le ore di Job Shadowing e documentazione delle buone pratiche osservate, nell'ottica della 'disseminazione' finale."
          }
        ]
      },
      {
        titolo: "Fase 3: Dopo il rientro",
        incombenze: [
          {
            titoloTask: "Documentazione e tracciabilità Erasmus+",
            descrizione: "Trasparenza e valutazione dell'impatto sul nostro istituto garantite dalla compilazione dei report ufficiali, sia per Erasmus+ che per la documentazione interna all'Istituto. Compilazione e consegna di modulo di rendicontazione delle spese sostenute e fatture.",
            allegati: [
              { nome: "Erasmus+ Participant Report (Esempio)", url: ASSETS_REGISTRY.documents.participantReport },
              { nome: "Relazione Interna di Fine Mobilità", url: ASSETS_REGISTRY.documents.relazioneInterna }
            ]
          }
        ]
      }
    ]
  },
  
  // MENU 5: PARTENARIATI (Mobilità a.s. 2025/2026)
  partenariati: {
    titolo: "Collaborazioni attivate nell'a.s. 2025/2026",
    descrizione: "Nell'anno scolastico 2025/2026 il Liceo A. Manzoni ha ampliato i propri orizzonti istituzionali consolidando accordi di collaborazione e mobilità con partner strategici in tutta Europa:",
    scuole: [
      {
        nome: "Liceo A. Manzoni",
        citta: "Varese (Italia)",
        sitoWeb: "https://www.liceimanzoni.edu.it/",
        logo: ASSETS_REGISTRY.logos.manzoni,
        coordinate: { lat: 45.819621619547654, lng: 8.816547974297336 },
        info: "Il nostro istituto."
      },      
      {
        nome: "Leppävaaran lukio",
        citta: "Espoo (Finlandia)",
        sitoWeb: "https://www.espoo.fi/en/leppavaaran-lukio",
        logo: ASSETS_REGISTRY.logos.leppavaara,
        coordinate: { lat: 60.22391783279067, lng: 24.75843315805336 },
        info: "Scuola partner ospitante per il Job Shadowing focalizzato su metodologie didattiche innovative."
      },
      {
        nome: "IES Jardines de Puerta Oscura",
        citta: "Málaga (Spagna)",
        sitoWeb: "http://www.iespuertaoscura.net/html/",
        logo: ASSETS_REGISTRY.logos.malaga,
        coordinate: { lat: 36.73121848492112, lng: -4.439323530753544 },
        info: "Istituto partner per lo scambio di metodologie CLIL."
      },
      {
        nome: "Colegio Padre Feijóo Zorelle",
        citta: "Ourense (Spagna)",
        sitoWeb: "http://www.feijoozorelle.com/",
        logo: ASSETS_REGISTRY.logos.ourense,
        coordinate: { lat: 42.33755663248871, lng: -7.8676324611384665 },
        info: "Collaborazione incentrata sulle scienze umane e l'inclusione scolastica."
      },
      {
        nome: "Frauenlob-Gymnasium Mainz",
        citta: "Magonza (Germania)",
        sitoWeb: "https://www.frauenlob-gymnasium.de/",
        logo: ASSETS_REGISTRY.logos.magonza,
        coordinate: { lat: 50.00877563726241, lng: 8.265738416024849 }, 
        info: "Scambio focalizzato sul potenziamento linguistico e le competenze musicali."
      },
      {
        nome: "Gymnasium München Riem",
        citta: "Monaco di Baviera (Germania)",
        sitoWeb: "https://www.gymriem.de/",
        logo: ASSETS_REGISTRY.logos.monaco,
        coordinate: { lat: 48.1358130297783, lng: 11.683729475969196 },
        info: "Sinergia attivata per il confronto su un nuovo modello di scuola (rethinking school)."
      }
    ]
  }
};