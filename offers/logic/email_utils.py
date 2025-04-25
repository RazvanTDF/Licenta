import base64

def extract_text_from_payload(payload):
    """
    Extrage și decodează textul din payload-ul emailului.
    """
    data = None

    if 'data' in payload.get('body', {}):
        data = payload['body']['data']
    elif 'parts' in payload:
        for part in payload['parts']:
            if part.get('body', {}).get('data'):
                data = part['body']['data']
                break

    if data:
        decoded_text = base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')
        return decoded_text
    else:
        return ""
