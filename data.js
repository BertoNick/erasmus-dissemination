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
    immaginiDidattica: ["assets/img/grafico-didattica.jpg"] 
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
      "Phenomenon-Based Learning (apprendimento transdisciplinare basato su problemi reali e co-progettazione STEM).",
      "Flessibilità oraria strutturata e personalizzazione profonda del piano di studi (curriculum non vincolato alla classe).",
      "Student-centered assessment: valutazione prevalentemente formativa, mirata all'auto-consapevolezza e priva di ansia da prestazione.",
      "Integrazione del benessere psicofisico: ritmi di apprendimento distesi lezioni da 75' e pause attive di 15 minuti in ambienti modulari e integrati."
    ],
    modelliConfronto: {
      titolo: "Modelli a confronto",
      descrizione: "Cliccando sui link sottostanti è possibile consultare i documenti programmatici ufficiali che regolano la didattica in Finlandia (<i>core curriculum</i>) e le Indicazioni Nazionali dei quattro indirizzi del Liceo Manzoni.",
      finlandia: {
        nome: "National core curriculum - Finlandia (inglese)",
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
  
  // MENU 3: DIARIO DI BORDO (Nuova struttura ad oggetti per Tabella Trasparente)
  diarioBordo: [
    {
      id: "day1",
      giorno: "01/03/2026",
      titolo: "Viaggio di andata e arrivo a Helsinki",
      anteprima: "Partenza da Milano Malpensa e arrivo nella capitale finlandese. Avvio della mobilità transnazionale.",
      programma: [
        { info: "10:55 - VOLO DI ANDATA", dettagli: "Partenza da <strong>Milano Malpensa (MXP)</strong> con arrivo all'aeroporto di <strong>Helsinki-Vantaa (HEL)</strong> alle ore 15:00." },
        { info: "16:30 - TRASFERIMENTO", dettagli: "Trasferimento dall'aeroporto verso la struttura alberghiera per il <strong>check-in</strong> e la sistemazione." }
      ],
      immagini: []
    },
    {
      id: "day2",
      giorno: "02/03/2026",
      titolo: "Didattica digitale, danze tipiche e centro storico",
      anteprima: "Primo impatto con l'insegnamento senza libri cartacei, i laboratori di musica folk e la fisica del moto armonico.",
      programma: [
        { info: "09:45 - INGLESE (Grammatica)", dettagli: "Stile di insegnamento classico con un uso intenso della <strong>tecnologia</strong> (<strong>assenza di libri cartacei</strong>, uso esclusivo di laptop). Utilizzo di <strong>Google Classroom</strong> per l'assegnazione di compiti e attività. Gestione della disciplina flessibile mirata all'<strong>autonomia scolastica</strong> e alla responsabilizzazione dello studente." },
        { info: "11:45 - MUSICA (Cultura folk)", dettagli: "Focus sul <strong>ballo di gruppo folk</strong> in tempo 4/4 (passo Base, Crossing e Teardrop). Ascolto, analisi del <em>vibe</em> e degli <strong>strumenti tradizionali</strong> su brani moderni di Vilma Jää, Hohka e Värttinä." },
        { info: "13:15 - FISICA (Forza elastica)", dettagli: "Focus sulla <em>Jousivoima</em> (<strong>forza elastica</strong>) e sul <strong>moto armonico</strong>." },
        { info: "15:30 - ATTIVITÀ CULTURALI", dettagli: "Visita guidata del centro storico di Helsinki: zona del porto, mercato storico <strong>Vanha kauppahalli</strong>, Cattedrale luterana e Piazza del Senato." }
      ],
      immagini: ["assets/img/musica.jpg"]
    },
    {
      id: "day3",
      giorno: "03/03/2026",
      titolo: "Inclusione (<i>Special Needs</i>) e tradizione della sauna",
      anteprima: "Focus sul modello finlandese di supporto per bisogni speciali (Wilma) e chimica quantitativa.",
      programma: [
        { info: "09:45 - CHIMICA", dettagli: "Spiegazione delle formule per il calcolo del numero di moli $n = \\frac{m}{M}$ e della <strong>concentrazione molare</strong> $C = \\frac{n}{V}$." },
        { info: "10:30 - SPECIAL NEEDS TEACHER", dettagli: "Analisi del modello aggiornato ad <strong>agosto 2025</strong>. Il <strong>'Supporto Generale'</strong> prevede interventi terapeutici e workshop in <strong>piccoli gruppi (max 10 alunni)</strong>. Nella scuola secondaria (<em>Upper Secondary</em>) sono garantiti workshop di supporto e <strong>didattica speciale</strong>. Lo <strong>screening per la dislessia</strong> è obbligatorio per tutti. Il piano viene redatto <strong>coinvolgendo direttamente lo studente</strong> per definire misure come tempo aggiuntivo, mappe o affiancamento, tracciando tutto sulla piattaforma <strong>Wilma</strong>." },
        { info: "13:15 - MATEMATICA BASE", dettagli: "Esercizi sulle conversioni di unità di misura e proprietà geometriche dei poligoni." },
        { info: "16:00 - ATTIVITÀ CULTURALI", dettagli: "Esperienza della tradizionale <strong>sauna finlandese</strong>: sessioni a <strong>180°C - 190°C</strong> alternate a immersioni di 2 minuti nelle acque gelide del <strong>Mar Baltico (1°C)</strong>." }
      ],
      immagini: ["assets/img/aula-chimica.jpg", "assets/img/sauna.jpg"]
    },
    {
      id: "day4",
      giorno: "04/03/2026",
      titolo: "Laboratorio di chimica, strutture Kameleonten e Suomenlinna",
      anteprima: "Esperimenti di elettrolisi con fenolftaleina, curve di red shift in fisica e visita al centro sportivo Kameleonten.",
      programma: [
        { info: "08:15 - CHIMICA LABORATORIO", dettagli: "Attività pratica (<em>Keratus</em>) con l'utilizzo di $\\text{Na}_2\\text{SO}_4$ e <strong>fenolftaleina</strong> (viraggio al rosa/magenta brillante quando il <strong>pH supera 8.2</strong> intorno al catodo). Relazione redatta direttamente in ambiente <strong>Wilma</strong>." },
        { info: "09:45 - FISICA", dettagli: "Lezione sul <strong>Big Bang</strong>, sulla sintesi dei nuclei pesanti e sull'<strong>espansione dell'universo (red shift)</strong>." },
        { info: "11:45 e 13:15 - ED. FISICA", dettagli: "Progettazione di un <strong>percorso di coordinazione</strong> e dinamiche di gruppo presso il centro sportivo Kameleonten. Criteri di valutazione ripartiti equamente in: <strong>1/3 competenze tecniche, 1/3 partecipazione, 1/3 interazione sociale</strong>." },
        { info: "15:30 - ATTIVITÀ CULTURALI", dettagli: "Visita alla fortezza <strong>patrimonio UNESCO</strong> di <strong>Suomenlinna</strong> tramite battello tra i ghiacci." },
        { info: "20:00 - CENA ISTITUZIONALE", dettagli: "Incontro ufficiale presso il ristorante Kappeli con il <strong>Dirigente scolastico ospitante</strong> per attività di <strong>networking internazionale</strong>." }
      ],
      immagini: ["assets/img/kameleonten-1.jpg", "assets/img/kameleonten-2.jpg", "assets/img/kameleonten-3.jpg", "assets/img/suomenlinna.jpg", "assets/img/kappeli.jpg"]
    },
    {
      id: "day5",
      giorno: "05/03/2026",
      titolo: "Sistemi di valutazione, Salute pubblica e biblioteca Oodi",
      anteprima: "Analisi degli esami computer-based (Wilma), introduzione ai vettori con GeoGebra e pausa attiva nelle scienze sanitarie.",
      programma: [
        { info: "08:15 - TEST DI INGLESE", dettagli: "Esame di produzione scritta <strong>computer-based</strong> (Corso 6) basato su griglie derivate dal <strong>matriculation exam</strong> (esame di maturità). Soglia di sufficienza al <strong>50%</strong>. L'ottimo livello linguistico è favorito dall'<strong>assenza di doppiaggio</strong> nei media." },
        { info: "09:45 - MATEMATICA AVANZATA", dettagli: "Analisi dei criteri del Corso 4 (<strong>30% compiti in classe, 20% test intermedi, 50% esame finale</strong>). Studio dei vettori tramite <strong>GeoGebra</strong> con le funzioni $f(x) = x$ e $g(x) = |x|$." },
        { info: "11:45 - SCIENZE DELLA SALUTE", dettagli: "Analisi del sistema strutturato in 21 regioni socio-sanitarie. Studio statistico e dei grafici eseguito in piedi come <strong>'pausa attiva'</strong> per stimolare la concentrazione." },
        { info: "16:30 - ATTIVITÀ CULTURALI", dettagli: "Itinerario al Monumento a Sibelius, sosta al Café Regatta e studio dei servizi sociali e strutturali della <strong>Biblioteca Centrale Oodi</strong>." }
      ],
      immagini: ["assets/img/sibelius.jpg", "assets/img/regatta.jpg", "assets/img/biblioteca.jpg"]
    },
    {
      id: "day6",
      giorno: "06/03/2026",
      titolo: "Matematica finanziaria, IA applicata e festival culturale",
      anteprima: "Compiti di realtà finanziari, composizione musicale assistita da IA e festival multiculturale.",
      programma: [
        { info: "08:15 - MATEMATICA BASE", dettagli: "Approccio orientato ai <strong>compiti di realtà</strong> económicos: simulazione di un conto con deposito mensile di €200, <strong>tasso di interesse dell'1.5%</strong> e applicazione della <strong>ritenuta fiscale del 30%</strong>." },
        { info: "11:45 - MUSICA & IA", dettagli: "Composizione del brano del centenario utilizzando l'<strong>Intelligenza Artificiale</strong> per generare la base, seguita da <strong>riarrangiamento melodico autonomo</strong>." },
        { info: "13:15 - EVENTI CULTURALI", dettagli: "<strong>Showcase multiculturale</strong> interamente guidato e gestito dagli studenti nell'Edificio 5 (performance coreane, cinesi, filippine e quiz su <strong>Kahoot</strong>)." }
      ],
      immagini: ["assets/img/cultural-event.jpg"]
    },
    {
      id: "day7",
      giorno: "07/03/2026",
      titolo: "Saluto alla città e viaggio di rientro",
      anteprima: "Studio dei mercati coperti tradizionali, architettura del silenzio a Kamppi e volo per Milano Malpensa.",
      programma: [
        { info: "09:00 - HAKANIEMEN", dettagli: "Visita al mercato coperto tradizionale." },
        { info: "12:00 - KAMPPI", dettagli: "Visita architettonico-antropologica alla celebre <strong>Cappella del Silenzio</strong>." },
        { info: "16:05 - VOLO DI RIENTRO", dettagli: "Partenza da <strong>Helsinki-Vantaa (HEL)</strong> e arrivo a <strong>Milano Malpensa (MXP)</strong>, concludendo la mobilità." }
      ],
      immagini: []
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
            descrizione: "Compilazione dell'<i>attendance record</i> per attestare le ore di Job Shadowing e documentazione delle buone pratiche osservate, nell'ottica della 'disseminazione' finale."
          }
        ]
      },
      {
        titolo: "Fase 3: Dopo il rientro",
        incombenze: [
          {
            titoloTask: "Documentazione e tracciabilità Erasmus+",
            descrizione: "Trasparenza e valutazione dell'impatto sul nostro istituto garantite dalla compilazione dei report ufficiali, sia per Erasmus+ che interni all'Istituto. Compilazione e consegna di modulo di rendicontazione delle spese sostenute e fatture.",
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