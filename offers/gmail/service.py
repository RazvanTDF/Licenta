import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Scopurile aplicației (citire din Gmail)
SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

# Calea către fișiere (asigură că se folosește corect în orice mediu)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_PATH = os.path.join(BASE_DIR, "credentials.json")
TOKEN_PATH = os.path.join(BASE_DIR, "token.pickle")

print("🔹 Script pornit!")  # Verificăm dacă scriptul pornește

def get_gmail_service():
    """Autentifică și returnează serviciul Gmail."""
    creds = None

    # Verifică dacă există tokenul pentru autentificare
    if os.path.exists(TOKEN_PATH):
        print("✅ Token găsit. Încercăm să-l folosim...")
        with open(TOKEN_PATH, 'rb') as token:
            creds = pickle.load(token)
    else:
        print("⚠️ Nu există token. Autentificare necesară.")

    # Dacă nu există token sau este expirat, autentificăm din nou
    if not creds or not creds.valid:
        print("🔄 Token invalid sau expirat. Începem autentificarea...")
        if creds and creds.expired and creds.refresh_token:
            print("🔄 Reîmprospătare token...")
            creds.refresh(Request())
        else:
            print("🌐 Deschidem browser-ul pentru autentificare...")
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=8080)

        # Salvăm tokenul pentru utilizare ulterioară
        print("💾 Salvăm tokenul...")
        with open(TOKEN_PATH, 'wb') as token:
            pickle.dump(creds, token)

    print("🔧 Construim serviciul Gmail API...")
    service = build('gmail', 'v1', credentials=creds)
    print("✅ Gmail API autentificat cu succes!")  # Acest mesaj trebuie să apară dacă totul merge

    return service

# Apelăm funcția pentru a testa dacă rulează
get_gmail_service()
