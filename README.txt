# Heidlandtools NFC-Stempeluhr – Testpaket

## Enthalten
- `index.html`: Arbeitszeit-App, lokaler Speicher im Browser, dynamische Buchung und Flexsaldo
- `manifest.webmanifest`: Installations-Metadaten
- `sw.js`: Offline-Cache für die App-Oberfläche

## Wichtig zur NFC-Nutzung
Der NFC-Tag soll eine URL in dieser Form enthalten:

`https://DEINE-APP-ADRESSE/?nfc=1`

Beim Öffnen dieser Adresse führt die App einmalig die nächste Stempelaktion aus. Ersetze `https://DEINE-APP-ADRESSE/` durch die echte HTTPS-Adresse, auf der die Dateien bereitgestellt sind. Eine bloße lokale `file://`-Datei kann nicht zuverlässig als installierbare Offline-PWA mit NFC funktionieren.

Die App sendet keine Zeitdaten an einen Server. Die Dateien müssen allerdings einmal über HTTPS bereitgestellt werden, damit Installation und Offline-Cache funktionieren. Zeitdaten liegen lokal im Browser-Speicher des Handys. Bei Löschen der Browserdaten oder Gerätewechsel können sie verloren gehen; deshalb CSV-/JSON-Export nutzen.

## Arbeitszeitlogik
- Frühere Einstempelung bleibt sichtbar, anrechenbarer Start frühestens 06:00
- Montag bis Donnerstag: 25 min Pause + 15 min Frühstück
- Freitag: 0 min Pause bei weniger als 6 h Anwesenheit; ab 6 h 25 min Pause
- Buchung zeigt die tatsächliche anrechenbare Arbeitszeit als Dezimalstunden
- Sollzeit separat für Flexsaldo: 459 min Mo–Do (7,65 h), 324 min Freitag (5,40 h)

## Erstinstallation
1. Dateien auf einen HTTPS-fähigen statischen Host hochladen.
2. Die HTTPS-Adresse im Chrome auf dem Xiaomi öffnen.
3. „Zum Startbildschirm hinzufügen“ bzw. „App installieren“ auswählen.
4. Einen NFC-Tag mit der URL `https://DEINE-APP-ADRESSE/?nfc=1` beschreiben.
5. Vor dem echten Einsatz einige Teststempelungen durchführen und die Daten sichern.

Hinweis: Der NFC-Start hängt vom Verhalten des Android-Browsers und davon ab, ob die URL in der installierten PWA oder im Browser geöffnet wird. Vor Produktiveinsatz testen.

## Änderungen in Version 2
- Alle Zeiten durchgehend als Dezimalstunden (Anzeige und CSV-Export)
- NFC: Die Adresse wird nach dem Stempeln bereinigt, Neuladen stempelt nicht mehr doppelt; Sperre von 10 s auch über Tabs hinweg
- Offline-Cache: Updates der App kommen jetzt automatisch (beim nächsten Öffnen), nicht mehr erst nach manuellem Cache-Löschen
- Verlauf: ✎ zum Korrigieren oder Löschen, „＋ Nachtragen“ für vergessene Tage, Warnhinweis bei fehlender Ausstempelung an früheren Tagen
- Pro Datum gibt es weiterhin genau einen Eintrag
