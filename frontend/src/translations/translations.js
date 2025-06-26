const translations = {
  ro: {
    title: "Transporte del Futuro",
    motto: "Ești gata să devii cel mai bun dispecer din firma ta?",
    connect: "Conectează-te",
    howItWorks: "Cum funcționează",
    about: "Despre aplicație",
    aboutText:
      "Transporte del Futuro este soluția digitală modernă concepută special pentru dispecerii din domeniul transporturilor.\n\nTdF este mai mult decât o aplicație – este un partener inteligent care îți optimizează munca, îți salvează timp prețios și îți oferă un avantaj competitiv real.",
    help: "Ajutor și informații",
    filters: "Filtre",
    refresh: "Refresh",
    auto: "Auto",
    footerLocation: "Timișoara, România",
    footerContact: "Contact",
    footerCopyright: "© 2025 Todor Ovidiu-Răzvan. Toate drepturile rezervate.",
    loginTitle: "Autentificare",
    registerTitle: "Înregistrare",
    username: "Nume de utilizator",
    email: "Email",
    password: "Parolă",
    loginBtn: "Autentifică-te",
    registerBtn: "Înregistrează-te",
    toggleToRegister: "Nu ai cont? Înregistrează-te",
    toggleToLogin: "Ai deja cont? Autentifică-te",
    networkError: "Eroare de rețea.",
    genericError: "Eroare la autentificare.",
    successRegister: "Cont creat cu succes! Acum te poți loga.",
    goToWorkspace: "Accesează Workspace",
    howItWorksTitle: "Cum funcționează aplicația?",
    step1Title: "Procesare automată email",
    step1Text: "Emailurile primite sunt interceptate prin Gmail API, furnizat de Google Cloud Console. Informațiile cheie (locații, preț, date) sunt extrase automat într-un mod sigur, rapid și standardizat. Aplicația îți salvează timp și reduce complet erorile umane.",
    step2Title: "Tabel inteligent și completare automată",
    step2Text: "Datele sunt afișate într-un tabel lizibil, cu completare automată pentru câmpurile lipsă: distanța este calculată cu Google Routes API, iar datele lipsă sunt completate cu AI-ul bazat pe spaCy. Poți folosi filtre și sortări inteligente pentru o experiență rapidă și profesională.",
    step3Title: "Acceptă sau negociază ofertele",
    step3Text: "Selectezi o ofertă și răspunzi direct din aplicație. Ai la dispoziție un modal complet unde poți accepta rapid oferta sau propui o contravaloare. Comunicarea e automată și controlul rămâne la tine – eficiență și transparență la fiecare pas.",
    authMotivation: "Mai e doar un pas până să fii mai rapid ca majoritatea.",
    offersDisplayed: " oferte afișate",
    loading: "Se încarcă...",

    // Tabel
    loadingLocation: "Pornire",
    unloadingLocation: "Destinație",
    distance: "Distanță (km)",
    weight: "Greutate (kg)",
    price: "Preț (€)",
    loadingDate: "Data încărcării",
    unloadingDate: "Data descărcării",

    // Sort icons tooltip (dacă adăugăm)
    sortAsc: "Sortare crescătoare",
    sortDesc: "Sortare descrescătoare",

    // Modal: Arin (V1)
    responseFrom: "Răspuns de la Arin",
    licensePlate: "Număr de înmatriculare",
    vehicleLocation: "Locul în care se află vehiculul",
    userPrice: "Prețul tău pentru această ofertă",
    approxDistance: "Distanța aproximativă până la locul de încărcare",
    deleteOffer: "Șterge oferta",
    replyToOffer: "Răspunde la ofertă",

    // Confirmări / Placeholder
    enterPlate: "Ex: B 99 XYZ",
    enterLocation: "Ex: Cluj-Napoca",
    enterPrice: "Ex: 1200",
    enterDistance: "Ex: 25 km",

    // Alte
    noOffersFound: "Nicio ofertă găsită.",
    modalClose: "Închide",
     offerDetails: "Detalii ofertă",
    refCode: "Cod referință",
    loadingLocation: "Loc încărcare",
    unloadingLocation: "Loc descărcare",
    distance: "Distanță",
    weight: "Greutate",
    loadingDate: "Data încărcare",
    unloadingDate: "Data descărcare",
    price: "Preț",
    recommendedPrice: "Preț recomandat",
    cargoDetails: "Detalii marfă",
    observations: "Observații",
    arinResponse: "Răspuns prestabilit (Arin)",
    vehiclePlatePlaceholder: "Matriculă vehicul",
    vehicleLocationPlaceholder: "Loc vehicul",
    offerPricePlaceholder: "Preț ofertă (€)",
    distancePlaceholder: "Distanță aproximativă până la localitate (km)",
    deleteOffer: "🗑️ Șterge oferta",
    reply: "✉️ Răspunde",
    replyTextPreview: (plate, location, price, distance) =>
    `Execut această ofertă cu vehiculul ${plate || "[matriculă]"} aflat în ${location || "[locație]"}, pentru suma de ${price || "[preț]"} €. Distanța aproximativă până la locația de încărcare este de ${distance || "[distanță]"} km. Vă rog confirmați disponibilitatea.`,
    help: "Ajutor",
    loadingLabel: "Pornire",
    unloadingLabel: "Destinație",
    withPrice: "Cu preț",
    withoutPrice: "Fără preț",
    filters: "Filtre",
    loadingLabel: "Pornire",
    unloadingLabel: "Destinație",
    withPrice: "Cu preț",
    withoutPrice: "Fără preț din ofertă",
    profile: "Profil",
    logout: "Delogare",
    // Navbar & cadre generale
    helpTitle: "Ajutor și informații",
    changeLanguage: "Schimbă limba",
    toggleDarkMode: "Light/Dark mode",
    profile: "Profil",
    workspace: "Workspace",
    logout: "Delogare",
    backToWorkspace: "Înapoi la Workspace",

    // Conținut Ajutor
    howItWorksTitle: "Cum funcționează aplicația Transporte del Futuro",
    helpParagraph1:
      "În pagina Workspace, dispecerii pot vizualiza toate ofertele primite automat din email. " +
      "Aceste oferte conțin informații precum locul de încărcare, destinația, distanța, greutatea mărfii, " +
      "datele de încărcare/descărcare, prețul oferit sau cel recomandat, precum și alte detalii utile.",

    mainFeaturesTitle: "Funcționalități principale:",
    featureViewTable: "Vizualizare tabel",
    featureViewTableDesc:
      "Tabelul afișează toate ofertele în ordine cronologică. Poți da click pe orice rând " +
      "pentru a deschide o fereastră cu detalii suplimentare despre ofertă.",
    featureSorting: "Sortare",
    featureSortingDesc:
      "Coloanele Distanță, Greutate și Preț permit sortarea crescătoare/descrescătoare " +
      "prin click pe săgețile din antet.",
    featureFiltering: "Filtrare",
    featureFilteringDesc:
      'Poți filtra ofertele după locație (Pornire, Destinație), oferte cu/ "fără preț", ' +
      'și multe altele. Apasă pe butonul "Filtre" din stânga sus pentru a deschide panoul de filtre.',
    featureRefresh: "Refresh și Auto-refresh",
    featureRefreshDesc:
      "Butoanele din dreapta sus permit reîncărcarea manuală a ofertelor sau activarea " +
      "reîmprospătării automate la fiecare minut.",
    featurePagination: "Paginare",
    featurePaginationDesc:
      "Doar 10 oferte sunt afișate pe pagină. Navighează între pagini folosind controalele " +
      "din partea de jos stânga.",
    featureHelpButton: "Buton Ajutor",
    featureHelpButtonDesc:
      "În colțul din dreapta jos se află un buton care deschide această pagină pentru mai multe informații.",
    featureDarkMode: "Modul Dark/Light",
    featureDarkModeDesc:
      "Poți comuta între temele întunecată și luminoasă din colțul din dreapta sus al barei de navigație.",
    featureProfile: "Profil și delogare",
    featureProfileDesc:
      "Iconița de profil din colțul dreapta sus oferă acces rapid la pagina de profil sau posibilitatea de a te deloga.",

    faqTitle: "Întrebări frecvente:",
    faqQuestion1: "Ce fac dacă nu văd oferte?",
    faqAnswer1:
      "Asigură-te că ești autentificat și că există emailuri procesate. Folosește butonul Refresh pentru a reîncărca datele.",
    faqQuestion2: "Ofertele mele nu au preț?",
    faqAnswer2:
      "Este posibil ca emailurile respective să nu conțină un preț. Poți vedea totuși prețul recomandat generat automat.",
    faqQuestion3: "Filtrele nu se aplică?",
    faqAnswer3:
      "Verifică dacă ai completat corect filtrele și dacă sunt active. Le poți șterge individual din etichetele de sub butonul Filtre.",

    helpContactNote:
      "Pentru întrebări suplimentare sau probleme tehnice, vă rugăm să contactați administratorul aplicației. " +
      "Datele de contact se regăsesc în footer.",
  },
  en: {
    title: "Transport of the Future",
    motto: "Are you ready to become the best dispatcher in your company?",
    connect: "Sign In",
    howItWorks: "How it works",
    about: "About the app",
    aboutText:
      "Transport of the Future is a modern digital solution designed especially for dispatchers in the transport industry.\n\nTdF is more than an app – it's an intelligent partner that optimizes your workflow, saves you valuable time, and gives you a real competitive advantage.",
    help: "Help & Info",
    filters: "Filters",
    refresh: "Refresh",
    auto: "Auto",
    footerLocation: "Timișoara, Romania",
    footerContact: "Contact",
    footerCopyright: "© 2025 Todor Ovidiu-Răzvan. All rights reserved.",
    loginTitle: "Login",
    registerTitle: "Register",
    username: "Username",
    email: "Email",
    password: "Password",
    loginBtn: "Login",
    registerBtn: "Register",
    toggleToRegister: "Don't have an account? Register",
    toggleToLogin: "Already have an account? Login",
    networkError: "Network error.",
    genericError: "Authentication error.",
    successRegister: "Account created successfully! You can now log in.",
    goToWorkspace: "Go to Workspace",
    howItWorksTitle: "How the app works",
    step1Title: "Automatic email processing",
    step1Text: "Incoming emails are intercepted using Gmail API via Google Cloud Console. Key details (locations, price, dates) are extracted automatically in a fast, secure and standardized way. The app saves you time and eliminates human error.",
    step2Title: "Smart table and auto-complete",
    step2Text: "The extracted data is displayed in a clean, readable table. Missing fields are completed automatically: distance is calculated via Google Routes API and missing values are filled using AI (spaCy). You can filter and sort easily for a smooth and professional experience.",
    step3Title: "Accept or negotiate offers",
    step3Text: "You can select an offer and reply directly within the app. A full modal lets you accept or propose an alternative. Communication is automated and you stay in control – fast, efficient and clear.",
    authMotivation: "You're just one step away from being faster than the rest.",
    offersDisplayed: " offers displayed",
    loading: "Loading...",

    loadingLocation: "Start",
    unloadingLocation: "Destination",
    distance: "Distance (km)",
    weight: "Weight (kg)",
    price: "Price (€)",
    loadingDate: "Loading date",
    unloadingDate: "Unloading date",

    sortAsc: "Sort ascending",
    sortDesc: "Sort descending",

    responseFrom: "Response from Arin",
    licensePlate: "License plate",
    vehicleLocation: "Current vehicle location",
    userPrice: "Your price for this offer",
    approxDistance: "Approx. distance to loading location",
    deleteOffer: "Delete offer",
    replyToOffer: "Reply to offer",

    enterPlate: "Ex: B 99 XYZ",
    enterLocation: "Ex: Cluj-Napoca",
    enterPrice: "Ex: 1200",
    enterDistance: "Ex: 25 km",

    noOffersFound: "No offers found.",
    modalClose: "Close",
    offerDetails: "Offer details",
    refCode: "Reference code",
    loadingLocation: "Loading location",
    unloadingLocation: "Unloading location",
    distance: "Distance",
    weight: "Weight",
    loadingDate: "Loading date",
    unloadingDate: "Unloading date",
    price: "Price",
    recommendedPrice: "Recommended price",
    cargoDetails: "Cargo details",
    observations: "Observations",
    arinResponse: "Predefined reply (Arin)",
    vehiclePlatePlaceholder: "Vehicle plate",
    vehicleLocationPlaceholder: "Vehicle location",
    offerPricePlaceholder: "Offer price (€)",
    distancePlaceholder: "Approximate distance to location (km)",
    deleteOffer: "🗑️ Delete offer",
    reply: "✉️ Reply",
    replyTextPreview: (plate, location, price, distance) =>
    `I will carry out this offer with vehicle ${plate || "[plate]"} located in ${location || "[location]"}, for the amount of ${price || "[price]"} €. The approximate distance to the loading location is ${distance || "[distance]"} km. Please confirm availability.`,
    help: "Help",
    loadingLabel: "Loading",
    unloadingLabel: "Unloading",
    withPrice: "With price",
    withoutPrice: "Without price",
    filters: "Filters",
    loadingLabel: "Loading",
    unloadingLabel: "Unloading",
    withPrice: "With price",
    withoutPrice: "Without price from offer",
    profile: "Profile",
    logout: "Logout",
     // Navbar & cadre generale
    helpTitle: "Ajutor și informații",
    changeLanguage: "Schimbă limba",
    toggleDarkMode: "Light/Dark mode",
    profile: "Profil",
    workspace: "Workspace",
    logout: "Delogare",
    backToWorkspace: "Înapoi la Workspace",

    // Conținut Ajutor
    howItWorksTitle: "Cum funcționează aplicația Transporte del Futuro",
    helpParagraph1:
      "În pagina Workspace, dispecerii pot vizualiza toate ofertele primite automat din email. " +
      "Aceste oferte conțin informații precum locul de încărcare, destinația, distanța, greutatea mărfii, " +
      "datele de încărcare/descărcare, prețul oferit sau cel recomandat, precum și alte detalii utile.",

    mainFeaturesTitle: "Funcționalități principale:",
    featureViewTable: "Vizualizare tabel",
    featureViewTableDesc:
      "Tabelul afișează toate ofertele în ordine cronologică. Poți da click pe orice rând " +
      "pentru a deschide o fereastră cu detalii suplimentare despre ofertă.",
    featureSorting: "Sortare",
    featureSortingDesc:
      "Coloanele Distanță, Greutate și Preț permit sortarea crescătoare/descrescătoare " +
      "prin click pe săgețile din antet.",
    featureFiltering: "Filtrare",
    featureFilteringDesc:
      'Poți filtra ofertele după locație (Pornire, Destinație), oferte cu/ "fără preț", ' +
      'și multe altele. Apasă pe butonul "Filtre" din stânga sus pentru a deschide panoul de filtre.',
    featureRefresh: "Refresh și Auto-refresh",
    featureRefreshDesc:
      "Butoanele din dreapta sus permit reîncărcarea manuală a ofertelor sau activarea " +
      "reîmprospătării automate la fiecare minut.",
    featurePagination: "Paginare",
    featurePaginationDesc:
      "Doar 10 oferte sunt afișate pe pagină. Navighează între pagini folosind controalele " +
      "din partea de jos stânga.",
    featureHelpButton: "Buton Ajutor",
    featureHelpButtonDesc:
      "În colțul din dreapta jos se află un buton care deschide această pagină pentru mai multe informații.",
    featureDarkMode: "Modul Dark/Light",
    featureDarkModeDesc:
      "Poți comuta între temele întunecată și luminoasă din colțul din dreapta sus al barei de navigație.",
    featureProfile: "Profil și delogare",
    featureProfileDesc:
      "Iconița de profil din colțul dreapta sus oferă acces rapid la pagina de profil sau posibilitatea de a te deloga.",

    faqTitle: "Întrebări frecvente:",
    faqQuestion1: "Ce fac dacă nu văd oferte?",
    faqAnswer1:
      "Asigură-te că ești autentificat și că există emailuri procesate. Folosește butonul Refresh pentru a reîncărca datele.",
    faqQuestion2: "Ofertele mele nu au preț?",
    faqAnswer2:
      "Este posibil ca emailurile respective să nu conțină un preț. Poți vedea totuși prețul recomandat generat automat.",
    faqQuestion3: "Filtrele nu se aplică?",
    faqAnswer3:
      "Verifică dacă ai completat corect filtrele și dacă sunt active. Le poți șterge individual din etichetele de sub butonul Filtre.",

    helpContactNote:
      "Pentru întrebări suplimentare sau probleme tehnice, vă rugăm să contactați administratorul aplicației. " +
      "Datele de contact se regăsesc în footer.",
      helpTitle: "Help & Information",
    changeLanguage: "Change language",
    toggleDarkMode: "Light/Dark mode",
    profile: "Profile",
    workspace: "Workspace",
    logout: "Logout",
    backToWorkspace: "← Back to Workspace",

    howItWorksTitle: "How the Transporte del Futuro App Works",
    helpParagraph1:
      "On the Workspace page, dispatchers can view all offers automatically fetched from email. " +
      "These offers include details such as loading location, unloading location, distance, weight, " +
      "loading/unloading dates, offered price or recommended price, and other useful information.",

    mainFeaturesTitle: "Main Features:",
    featureViewTable: "View Table",
    featureViewTableDesc:
      "The table displays all offers in chronological order. You can click any row to open a window " +
      "with additional offer details.",
    featureSorting: "Sorting",
    featureSortingDesc:
      "The Distance, Weight, and Price columns allow ascending/descending sorting by clicking the arrows " +
      "in the header.",
    featureFiltering: "Filtering",
    featureFilteringDesc:
      'You can filter offers by location (Loading, Unloading), offers with/without price, and more. ' +
      'Click the "Filters" button on the top left to open the filter panel.',
    featureRefresh: "Refresh & Auto-refresh",
    featureRefreshDesc:
      "The buttons on the top right allow you to manually reload offers or enable auto-refresh every minute.",
    featurePagination: "Pagination",
    featurePaginationDesc:
      "Only 10 offers are displayed per page. Navigate between pages using the controls at the bottom left.",
    featureHelpButton: "Help Button",
    featureHelpButtonDesc:
      "In the bottom right corner, there is a button that opens this page for more information.",
    featureDarkMode: "Dark/Light Mode",
    featureDarkModeDesc:
      "You can toggle between dark and light themes from the top right corner of the navbar.",
    featureProfile: "Profile & Logout",
    featureProfileDesc:
      "The profile icon in the top right corner gives quick access to the profile page or logout option.",

    faqTitle: "Frequently Asked Questions:",
    faqQuestion1: "What if I don’t see any offers?",
    faqAnswer1:
      "Make sure you are logged in and that there are processed emails. Use the Refresh button to reload data.",
    faqQuestion2: "My offers don’t have a price?",
    faqAnswer2:
      "It may be that those emails did not contain a price. You can still see the auto-generated recommended price.",
    faqQuestion3: "Filters are not applying?",
    faqAnswer3:
      "Check if you filled in the filters correctly and if they are active. You can remove them individually from the tags below the Filters button.",

    helpContactNote:
      "For further questions or technical issues, please contact the app administrator. Contact details can be found in the footer.",
  },
  es: {
    title: "Transporte del Futuro",
    motto: "¿Estás listo para ser el mejor despachador de tu empresa?",
    connect: "Conéctate",
    howItWorks: "Cómo funciona",
    about: "Sobre la aplicación",
    aboutText:
      "Transporte del Futuro es una solución digital moderna diseñada especialmente para los despachadores del sector del transporte.\n\nTdF es más que una aplicación: es un socio inteligente que optimiza tu trabajo, te ahorra tiempo valioso y te brinda una verdadera ventaja competitiva.",
    help: "Ayuda e información",
    filters: "Filtros",
    refresh: "Actualizar",
    auto: "Auto",
    footerLocation: "Timișoara, Rumanía",
    footerContact: "Contacto",
    footerCopyright: "© 2025 Todor Ovidiu-Răzvan. Todos los derechos reservados.",
    loginTitle: "Iniciar sesión",
    registerTitle: "Registrarse",
    username: "Usuario",
    email: "Correo electrónico",
    password: "Contraseña",
    loginBtn: "Iniciar",
    registerBtn: "Registrar",
    toggleToRegister: "¿No tienes cuenta? Regístrate",
    toggleToLogin: "¿Ya tienes cuenta? Inicia sesión",
    networkError: "Error de red.",
    genericError: "Error de autenticación.",
    successRegister: "¡Cuenta creada con éxito! Ahora puedes iniciar sesión.",
    goToWorkspace: "Ir al Workspace",
    howItWorksTitle: "¿Cómo funciona la aplicación?",
    step1Title: "Procesamiento automático de correos",
    step1Text: "Los correos recibidos se interceptan mediante la API de Gmail proporcionada por Google Cloud Console. Los datos clave (ubicaciones, precio, fechas) se extraen automáticamente de forma segura, rápida y estandarizada. La app ahorra tiempo y elimina errores humanos.",
    step2Title: "Tabla inteligente y autocompletado",
    step2Text: "Los datos se muestran en una tabla clara, con campos faltantes completados automáticamente: la distancia se calcula con la API de Rutas de Google y los datos faltantes se completan con AI (spaCy). Puedes filtrar y ordenar con fluidez para una experiencia profesional.",
    step3Title: "Aceptar o negociar ofertas",
    step3Text: "Seleccionas una oferta y respondes directamente desde la app. Un modal completo te permite aceptar rápidamente o proponer un nuevo precio. Comunicación automática, control total – rápido, eficiente y transparente.",
    authMotivation: "Estás a un paso de ser más rápido que la mayoría.",
    offersDisplayed: " ofertas mostradas",
    loading: "Cargando...",

    loadingLocation: "Origen",
    unloadingLocation: "Destino",
    distance: "Distancia (km)",
    weight: "Peso (kg)",
    price: "Precio (€)",
    loadingDate: "Fecha de carga",
    unloadingDate: "Fecha de descarga",

    sortAsc: "Orden ascendente",
    sortDesc: "Orden descendente",

    responseFrom: "Respuesta de Arin",
    licensePlate: "Matrícula",
    vehicleLocation: "Ubicación actual del vehículo",
    userPrice: "Tu precio para esta oferta",
    approxDistance: "Distancia aproximada hasta el lugar de carga",
    deleteOffer: "Eliminar oferta",
    replyToOffer: "Responder a la oferta",

    enterPlate: "Ej: B 99 XYZ",
    enterLocation: "Ej: Cluj-Napoca",
    enterPrice: "Ej: 1200",
    enterDistance: "Ej: 25 km",

    noOffersFound: "No se encontraron ofertas.",
    modalClose: "Cerrar",
    offerDetails: "Detalles de la oferta",
    refCode: "Código de referencia",
    loadingLocation: "Lugar de carga",
    unloadingLocation: "Lugar de descarga",
    distance: "Distancia",
    weight: "Peso",
    loadingDate: "Fecha de carga",
    unloadingDate: "Fecha de descarga",
    price: "Precio",
    recommendedPrice: "Precio recomendado",
    cargoDetails: "Detalles de la carga",
    observations: "Observaciones",
    arinResponse: "Respuesta predefinida (Arin)",
    vehiclePlatePlaceholder: "Matrícula del vehículo",
    vehicleLocationPlaceholder: "Ubicación del vehículo",
    offerPricePlaceholder: "Precio de la oferta (€)",
    distancePlaceholder: "Distancia aproximada al lugar (km)",
    deleteOffer: "🗑️ Eliminar oferta",
    reply: "✉️ Responder",
    replyTextPreview: (plate, location, price, distance) =>
    `Realizo esta oferta con el vehículo ${plate || "[matrícula]"} ubicado en ${location || "[ubicación]"}, por la suma de ${price || "[precio]"} €. La distancia aproximada hasta el lugar de carga es de ${distance || "[distancia]"} km. Por favor, confirme la disponibilidad.`,
    help: "Ayuda",
    loadingLabel: "Origen",
    unloadingLabel: "Destino",
    withPrice: "Con precio",
    withoutPrice: "Sin precio",
    filters: "Filtros",
    loadingLabel: "Origen",
    unloadingLabel: "Destino",
    withPrice: "Con precio",
    withoutPrice: "Sin precio de la oferta",
    profile: "Perfil",
    logout: "Cerrar sesión",
    helpTitle: "Ayuda e Información",
    changeLanguage: "Cambiar idioma",
    toggleDarkMode: "Modo claro/oscuro",
    profile: "Perfil",
    workspace: "Espacio de trabajo",
    logout: "Cerrar sesión",
    backToWorkspace: "← Volver al Espacio de trabajo",

    howItWorksTitle: "Cómo Funciona la Aplicación Transporte del Futuro",
    helpParagraph1:
      "En la página Espacio de trabajo, los despachadores pueden ver todas las ofertas obtenidas automáticamente del correo electrónico. " +
      "Estas ofertas incluyen detalles como lugar de carga, lugar de descarga, distancia, peso, fechas de carga/descarga, " +
      "precio ofrecido o precio recomendado y otra información útil.",

    mainFeaturesTitle: "Funciones principales:",
    featureViewTable: "Ver tabla",
    featureViewTableDesc:
      "La tabla muestra todas las ofertas en orden cronológico. Puedes hacer clic en cualquier fila para abrir una ventana " +
      "con detalles adicionales de la oferta.",
    featureSorting: "Ordenar",
    featureSortingDesc:
      "Las columnas Distancia, Peso y Precio permiten ordenar ascendente/descendente haciendo clic en las flechas en el encabezado.",
    featureFiltering: "Filtrar",
    featureFilteringDesc:
      'Puede filtrar ofertas por ubicación (Carga, Descarga), ofertas con/sin precio y más. ' +
      'Presione el botón "Filtros" en la parte superior izquierda para abrir el panel de filtros.',
    featureRefresh: "Actualizar y Auto-actualizar",
    featureRefreshDesc:
      "Los botones en la parte superior derecha permiten recargar manualmente las ofertas o habilitar la auto-actualización cada minuto.",
    featurePagination: "Paginación",
    featurePaginationDesc:
      "Solo se muestran 10 ofertas por página. Navega entre páginas usando los controles en la esquina inferior izquierda.",
    featureHelpButton: "Botón de ayuda",
    featureHelpButtonDesc:
      "En la esquina inferior derecha hay un botón que abre esta página para más información.",
    featureDarkMode: "Modo claro/oscuro",
    featureDarkModeDesc:
      "Puedes alternar entre temas oscuro y claro desde la esquina superior derecha de la barra de navegación.",
    featureProfile: "Perfil y cerrar sesión",
    featureProfileDesc:
      "El icono de perfil en la esquina superior derecha brinda acceso rápido a la página de perfil o la opción de cerrar sesión.",

    faqTitle: "Preguntas frecuentes:",
    faqQuestion1: "¿Qué hago si no veo ofertas?",
    faqAnswer1:
      "Asegúrate de haber iniciado sesión y de que haya correos electrónicos procesados. Usa el botón Actualizar para recargar los datos.",
    faqQuestion2: "¿Mis ofertas no tienen precio?",
    faqAnswer2:
      "Puede que esos correos electrónicos no contuvieran un precio. Aun así, puedes ver el precio recomendado generado automáticamente.",
    faqQuestion3: "¿Los filtros no se aplican?",
    faqAnswer3:
      "Verifica si completaste correctamente los filtros y si están activos. Puedes eliminarlos individualmente desde las etiquetas debajo del botón Filtros.",

    helpContactNote:
      "Para más preguntas o problemas técnicos, comunícate con el administrador de la aplicación. Los datos de contacto se encuentran en el pie de página.",
  }
};

export default translations;
