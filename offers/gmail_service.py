import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Scopurile aplicației (citire din Gmail)
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def get_gmail_service():
    """Autentifică și returnează serviciul Gmail."""
    creds = None
    # Verifică dacă există tokenul pentru autentificare
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # Dacă nu există token sau este expirat, autentificăm din nou
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '/Users/razvantodor/Desktop/Licence/credentials.json', SCOPES)
            creds = flow.run_local_server(port=8080)
        # Salvăm tokenul pentru utilizare ulterioară
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    # Construim serviciul Gmail
    service = build('gmail', 'v1', credentials=creds)
    return service