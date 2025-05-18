from __future__ import print_function
import os.path
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# Scope pentru acces Gmail în mod readonly
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# Calea completă spre fișierele tale
CREDENTIALS_PATH = 'offers/gmail/credentials.json'
TOKEN_PATH = 'offers/gmail/token.pickle'

def main():
    creds = None

    if os.path.exists(TOKEN_PATH):
        with open(TOKEN_PATH, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)

        # Salvează tokenul nou
        with open(TOKEN_PATH, 'wb') as token:
            pickle.dump(creds, token)

    print("✅ Token generat și salvat cu succes în:", TOKEN_PATH)

if __name__ == '__main__':
    main()
