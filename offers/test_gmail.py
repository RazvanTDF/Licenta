from gmail_service import get_gmail_service

def list_messages():
    """Afișează ID-urile mesajelor din inbox."""
    service = get_gmail_service()  # Creează serviciul Gmail
    results = service.users().messages().list(userId='me').execute()  # Obține mesajele
    messages = results.get('messages', [])

    if not messages:
        print("Nu există mesaje.")
    else:
        print("Mesaje găsite:")
        for message in messages:
            print(f"ID mesaj: {message['id']}")

if __name__ == '__main__':
    list_messages()