import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from offers.logic.email_extractor import process_and_save_email
from offers.gmail.service import get_gmail_service

def fetch_and_process_emails():
    print("📥 Connecting to Gmail...")
    service = get_gmail_service()
    if not service:
        print("❌ Could not connect to Gmail.")
        return

    # Search only for unread emails
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], q="is:unread").execute()
    messages = results.get('messages', [])

    if not messages:
        print("📭 No unread emails found.")
        return

    print(f"📨 Found {len(messages)} unread emails.")
    for msg in messages:
        msg_id = msg['id']
        message = service.users().messages().get(userId='me', id=msg_id, format='full').execute()
        
        payload = message.get('payload')
        if payload:
            process_and_save_email(payload)

            # Mark email as "read" after processing
            service.users().messages().modify(
                userId='me',
                id=msg_id,
                body={'removeLabelIds': ['UNREAD']}
            ).execute()

    print("✅ Finished processing emails.")

if __name__ == "__main__":
    fetch_and_process_emails()
