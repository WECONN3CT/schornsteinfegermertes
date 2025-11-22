# Moderne Schornsteinfeger Mertes Webseite

Eine moderne, beeindruckende Webseite für Schornsteinfegermeister Michael Mertes in Bonn und Umgebung.

## 🎨 Design-Features

### Moderne Technologien
- **CSS3** mit Custom Properties (CSS-Variablen)
- **Flexbox & CSS Grid** für modernes Layout
- **Responsive Design** für alle Geräte (Desktop, Tablet, Mobile)
- **Smooth Scroll-Animationen** mit Intersection Observer API
- **Glassmorphismus-Effekte** für moderne Ästhetik
- **Gradient-Designs** und moderne Farbschemata

### Animationen & Interaktionen
- Scroll-basierte Reveal-Animationen
- Hover-Effekte auf Cards und Buttons
- Parallax-Effekte (optional aktivierbar)
- Smooth Scrolling zu Anchor-Links
- Mobile Menu mit Animation
- Scroll-to-Top Button

### Performance-Optimierungen
- Minimale externe Abhängigkeiten
- Optimierte Bilder
- Lazy Loading vorbereitet
- Mobile-First Ansatz

## 📁 Struktur

```
MertesWebseite/
├── index.html                          # Startseite
├── css/
│   └── style.css                       # Modernes CSS mit Animationen
├── js/
│   └── main.js                         # JavaScript für Interaktionen
├── images/                             # Alle Bilder
│   ├── logo.png
│   ├── Header_Background.jpg
│   ├── mertes-portrait.jpg
│   └── ...
├── unsere-leistungen/
│   ├── index.html                      # Leistungsübersicht
│   ├── gashausschau/
│   │   └── index.html
│   ├── rauch-und-kohlenmonoxidmelder/
│   │   └── index.html
│   ├── kamerainspektion/
│   │   └── index.html
│   └── freie-schornsteinfegerarbeiten/
│       └── index.html
├── ueber-uns/
│   └── index.html
├── kontakt/
│   └── index.html
├── datenschutz/
│   └── index.html
└── impressum/
    └── index.html
```

## 🎯 Seiten-Übersicht

### Hauptseiten
1. **Startseite** (`index.html`)
   - Hero-Section mit modernem Design
   - Vorstellung Michael Mertes
   - Leistungsübersicht mit Icon-Cards
   - Umweltmission-Section
   - Kundenbewertungen
   - Call-to-Action

2. **Unsere Leistungen** (`unsere-leistungen/index.html`)
   - Übersicht aller Dienstleistungen
   - Detaillierte Service-Cards
   - Kontaktinformationen

3. **Über Uns** (`ueber-uns/index.html`)
   - Firmenvorstellung
   - Werte und Philosophie
   - TÜV-Zertifizierung
   - Bildergalerie

4. **Kontakt** (`kontakt/index.html`)
   - Kontaktformular mit Validation
   - Kontaktdaten
   - Öffnungszeiten
   - Einsatzgebiet

### Leistungs-Detailseiten
- **Gashausschau** - Professionelle Gasinstallationsprüfung
- **Rauch- & Kohlenmonoxidmelder** - Lebensrettende Melder-Systeme
- **Kamerainspektion** - Moderne Diagnosetechnik
- **Freie Schornsteinfegerarbeiten** - Reinigung und Messung

### Rechtliche Seiten
- **Impressum** - Rechtliche Pflichtangaben
- **Datenschutz** - DSGVO-konforme Datenschutzerklärung

## 🎨 Farbschema

- **Primär (Gold)**: `#C9A962`
- **Gold Light**: `#D4B574`
- **Gold Dark**: `#B8983F`
- **Schwarz**: `#0a0a0a`
- **Schwarz (Soft)**: `#1a1a1a`
- **Weiß**: `#ffffff`
- **Grau 600**: `#737373`

## 🚀 Verwendung

### Lokal öffnen
Einfach `index.html` in einem modernen Browser öffnen (Chrome, Firefox, Safari, Edge).

### Deployment
Die Webseite kann auf jedem Standard-Webserver gehostet werden:
- Alle Pfade sind relativ
- Keine serverseitigen Abhängigkeiten
- Statische HTML/CSS/JS Dateien

#### GitHub Pages Hinweise
- MP4-Videos müssen < 100 MB sein (GitHub Limit).
- MOV wird von GitHub Pages nicht über LFS ausgeliefert – daher MP4 verwenden.
- Empfohlene ffmpeg-Einstellungen:
  - `ffmpeg -i input.mov -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart output.mp4`

## 📱 Responsive Breakpoints

- **Desktop**: > 980px
- **Tablet**: 768px - 980px
- **Mobile**: < 768px

## 🔧 Anpassungen

### Farben ändern
In `css/style.css` unter `:root` die CSS-Custom-Properties anpassen.

### Inhalte ändern
Texte direkt in den HTML-Dateien editieren.

### Bilder austauschen
Bilder im `images/` Ordner ersetzen, Dateinamen in HTML anpassen.

## 📞 Kontakt

**Schornsteinfegermeister Michael Mertes**
- Trierer Str. 22, 53894 Mechernich
- Telefon: 0171 1961771
- E-Mail: schornsteinfeger-mertes@gmx.de

