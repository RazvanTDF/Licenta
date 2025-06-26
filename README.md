# Transporte del Futuro – Automatizarea ofertelor de transport primite prin email

## 📄 Descriere generală

**Transporte del Futuro** este o aplicație web full-stack destinată firmelor de transport, în special dispecerilor care gestionează oferte primite prin email. Aplicația:

- preia automat emailurile din Gmail;
- extrage informațiile relevante despre curse (destinații, greutate, observații);
- estimează distanța și prețul cu ajutorul Google Routes API;
- completează datele lipsă folosind AI (spaCy);
- oferă o interfață grafică pentru dispeceri cu opțiune de răspuns.

---

## 🔗 Repository

Codul sursă complet al proiectului este disponibil la:

[https://github.com/RazvanTDF/Licenta](https://github.com/RazvanTDF/Licenta)

---

## 📁 Structură livrabile

- `backend/` – aplicația Django (cu PostgreSQL)
- `frontend/` – aplicația React + Vite
- `scripts/` – scripturi pentru preluare emailuri Gmail
- `.env.example` – fișier model pentru variabile
- `README.md` – documentația proiectului

---

## ⚙️ Cerințe preliminare

- Python `3.10+`
- Node.js `18+` (pentru rularea React)
- PostgreSQL `14+`
- Git
- pip și npm

---

## 🔧 Pași de instalare și rulare

### 🔹 1. Clonează proiectul

```bash
git clone https://github.com/RazvanTDF/Licenta.git
cd Licenta
```

---

### 🔹 2. Rulare backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # sau .\venv\Scripts\activate pe Windows
pip install -r ../requirements.txt

cp .env.example .env      # completează valorile necesare
python manage.py migrate
python manage.py runserver
```

Backend-ul va fi disponibil la:  
`http://localhost:8000`

---

### 🔹 3. Rulare frontend (React + Vite)

```bash
cd ../frontend
npm install
npm run dev
```

Frontend-ul va fi disponibil la:  
`http://localhost:5173`

---

## 🔑 Configurare Gmail API (Google Cloud)

1. Creează un cont pe [https://console.cloud.google.com](https://console.cloud.google.com)
2. Verifică-l cu un card bancar valid
3. Creează un proiect nou
4. Activează serviciile:
   - Gmail API
   - Google Routes API

---

### 🔸 Configurare OAuth 2.0

- Navighează la APIs & Services > OAuth consent screen
- Tip aplicație: **Desktop**
- Nume aplicație: Transporte del Futuro
- Completează: email suport, email dezvoltator, test users (adresa ta Gmail)
- Creează OAuth Client ID → tip aplicație: Desktop
- Descarcă `credentials.json` și plasează-l în folderul `scripts/`

---

### 🔸 Autorizare aplicație

```bash
cd scripts
python fetch_emails.py
```

→ Se generează `token.pickle` pentru acces Gmail persistent.

---

## 🧭 Google Routes API

- Obține cheia API din Google Cloud Console
- Adaug-o în fișierul `.env`:

```env
GOOGLE_MAPS_API_KEY=cheia_ta_personală
```

---

## 🧪 Testare locală

| Componentă   | Adresă locală                |
|--------------|------------------------------|
| Backend API  | http://localhost:8000/api/   |
| Frontend     | http://localhost:5173        |

---

## 🔐 Autentificare și roluri

Sistemul folosește JWT (via Django REST Framework SimpleJWT). Rolurile disponibile:

- Vizitator
- Dispecer (necesită aprobare)
- Admin

Tokenul este trimis în header:  
`Authorization: Bearer <token>`

---

## ⚙️ Configurare VS Code (opțional)

Fișierul `.vscode/settings.json`:

```json
{
  "python.autoComplete.extraPaths": [
    "./backend",
    "./offers",
    "./myenv/lib/python3.13/site-packages"
  ],
  "python.analysis.extraPaths": [
    "./backend",
    "./offers",
    "./myenv/lib/python3.13/site-packages"
  ],
  "python.analysis.diagnosticSeverityOverrides": {
    "reportUndefinedVariable": "none"
  }
}
```

---

## 📂 Fișiere excluse din repository

- `.env` (conține variabile sensibile)
- `credentials.json` și `token.pickle`
- Fișiere binare: `.pyc`, `.pkl`, `.exe`
- Foldere: `__pycache__/`, `.venv/`, `node_modules/`

---

## 👤 Autor și coordonator

**Autor**: Todor Ovidiu-Răzvan  
**Coordonator științific**: Ș.l.dr.ing. Valer Bocan
