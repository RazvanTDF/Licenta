import base64
import re
from bs4 import BeautifulSoup

def extract_text_from_payload(payload):
    """
    Primește payload-ul unui email (de la Gmail API) și extrage conținutul text.
    Poate fi text simplu sau HTML.
    """
    def decode_part(part):
        data = part.get("body", {}).get("data")
        if data:
            decoded = base64.urlsafe_b64decode(data).decode("utf-8", errors="ignore")
            if part.get("mimeType") == "text/html":
                # Curățăm HTML-ul
                soup = BeautifulSoup(decoded, "html.parser")
                return soup.get_text(separator="\n").strip()
            return decoded.strip()
        return None

    # Caz simplu: dacă payload-ul este direct text
    if payload.get("mimeType") in ["text/plain", "text/html"]:
        return decode_part(payload)

    # Caz multipart: căutăm prima parte text
    parts = payload.get("parts", [])
    for part in parts:
        if part.get("mimeType") in ["text/plain", "text/html"]:
            text = decode_part(part)
            if text:
                return text

        # Recursiv, dacă există sub-part-uri
        if "parts" in part:
            for subpart in part["parts"]:
                if subpart.get("mimeType") in ["text/plain", "text/html"]:
                    text = decode_part(subpart)
                    if text:
                        return text

    return None

def estimate_price(weight_kg, distance_km):
    try:
        weight_kg = float(weight_kg or 0)
        distance_km = float(distance_km or 0)
        return round(0.4 * distance_km + 0.01 * weight_kg, 2)
    except Exception as e:
        print(f"⚠️ Eroare în calculul prețului recomandat: {e}")
        return 0.0
