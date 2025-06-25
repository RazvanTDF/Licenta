TRANSPORTE DEL FUTURO – Automatizarea ofertelor de transport primite prin email

Descriere generală:

Transporte del Futuro este o aplicație web full-stack destinată firmelor de transport, în special dispecerilor care gestionează oferte primite prin email. Aplicația preia automat emailurile, extrage datele relevante despre curse, estimează distanța și prețul recomandat și permite dispecerului să răspundă direct din interfață.

Proiectul include componente pentru backend (Django), frontend (React + Vite) și un microserviciu AI (FastAPI + spaCy) pentru completarea inteligentă a datelor lipsă.

Repository:

Codul sursă complet al proiectului este disponibil la:

https://github.com/RazvanTDF/Licenta

Structură livrabile:

- backend/ – aplicația backend realizată cu Django 5.1.3 și PostgreSQL
- frontend/ – aplicația frontend construită cu React 19.1.0 și Vite 6.3.5
- chat_ai/ – microserviciu AI pentru completare fallback (FastAPI + spaCy)
- scripts/ – scripturi pentru preluarea emailurilor din Gmail
- .env.example – fișier model cu variabilele necesare
- README.txt – documentația completă

Cerințe preliminare:

- Python 3.10+
- Node.js 18+ (folosit pentru rularea frontendului)
- PostgreSQL 14+
- Git
- pip și npm

Pași de instalare și rulare:

1. Clonează proiectul

git clone https://github.com/nume-utilizator/transporte-del-futuro.git
cd transporte-del-futuro

2. Instalare și rulare backend (Django)

cd backend
python -m venv venv
source venv/bin/activate     (sau .\venv\Scripts\activate pe Windows)
pip install -r ../requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver   (server disponibil pe http://localhost:8000)

3. Instalare și rulare frontend (React + Vite)

cd ../frontend
npm install
npm run dev                  (server disponibil pe http://localhost:5173)

4. Rulare microserviciu AI (FastAPI + spaCy)

cd ../chat_ai
pip install -r requirements.txt
uvicorn main:app --reload --port 8001

Config Gmail API (Google Cloud Platform):

1. Creare cont Google Cloud la https://console.cloud.google.com
   - contul trebuie verificat cu un card bancar valid
2. Creare proiect nou
3. Activare servicii:
   - Gmail API
   - Google Routes API
4. Configurare OAuth 2.0:
   - Tip aplicație: Desktop
   - Nume aplicație: Transporte del Futuro
   - Email suport și email dezvoltator
   - Scope: ../auth/gmail.readonly
   - Adăugare test user (adresa Gmail ta)
5. Creare Client ID (OAuth client ID)
   - Tip aplicație: Desktop
   - Descarcă fișierul credentials.json și plasează-l în folderul scripts/

6. Rulează autorizarea Gmail

cd scripts
python fetch_emails.py

→ Se generează token.pickle pentru autentificare automată

Config Google Routes API:

- Obține cheia API din Google Cloud Console
- Adaug-o în fișierul .env:

GOOGLE_MAPS_API_KEY=cheia_ta_personală

Testare locală:

- Backend API: http://localhost:8000/api/
- Frontend: http://localhost:5173
- AI (FastAPI): http://localhost:8001/docs

Autentificare și roluri:

Sistemul utilizează JWT pentru autentificare. Rolurile definite sunt:
- vizitator
- dispecer (cu aprobare din partea adminului)
- admin

Tokenul este trimis în headerul Authorization: Bearer

Fișier de configurare pentru VS Code (.vscode/settings.json):

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

Fișiere excluse din repository:

- .env (conține date sensibile)
- credentials.json și token.pickle
- .pyc, .pkl, .exe
- __pycache__/, .venv/, node_modules/

Autor: Todor Ovidiu-Răzvan  
Coordonator științific: Ș.l.dr.ing. Valer Bocan
