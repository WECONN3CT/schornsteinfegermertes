# Änderungen - Schwarz & Gold Design mit Animationen

## 🎨 Farbschema - Schwarz & Gold

### Neue Farben (Schornsteinfeger-Farben):
- **Primärfarbe (Schwarz)**: `#1a1a1a` - Eleganz und Tradition
- **Akzentfarbe (Gold)**: `#D4AF37` - Luxus und Qualität
- **Gold-Varianten**: 
  - Dunkel: `#B8941F`
  - Hell: `#FFD700`
- **Gradienten**:
  - Gold-Gradient: `linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)`
  - Gold-Shine: `linear-gradient(135deg, #B8941F 0%, #D4AF37 50%, #FFD700 100%)`

### Helle Seite:
- Hintergrund: `#ffffff` und `#fafafa`
- Grau-Töne: `#f5f5f5` für Sections
- Alle Texte gut lesbar auf hellem Hintergrund

## ✨ Neue Animationen

### 1. Schwebende Icons (Floating)
- 4 dekorative Icons schweben über die Seite
- Subtile Bewegung (translateY -10px)
- Verschiedene Geschwindigkeiten (6-9 Sekunden)
- Icons: Feuer, Haus, Besen, Schild
- Sehr transparent (opacity: 0.08)

### 2. Card-Animationen
- **Float-Effekt** auf Card-Icons (schwebt leicht)
- **Rotation** beim Hover (360° Drehung mit 3D-Effekt)
- **Scale-Effekt** beim Hover (Card wird größer)
- **Gold-Shadow** beim Hover
- **Stagger-Animation** - Cards erscheinen nacheinander (0.1s Verzögerung)

### 3. Button-Animationen
- **Shimmer-Effekt** bei Hover (durchlaufender Glanz)
- **Gold-Shine** Animation (pulsierendes Leuchten)
- **Scale & Lift** beim Hover
- Goldene Schatten bei Accent-Buttons

### 4. Text-Animationen
- **Hero-Titel**: Gold-Gradient mit Shine-Animation
- **Page-Fade-In**: Sanftes Einblenden beim Laden
- **Reveal-Animationen**: Elemente faden von unten ein beim Scrollen

### 5. Dekorative Elemente
- **Decorative Line**: Goldene animierte Trennlinie (Pulse)
- **Section Divider**: Gradient-Linie mit Pulse-Effekt
- **Gold-Accent**: Shimmer-Effekt für wichtige Elemente

### 6. Zusätzliche Animationen
- **Pulse**: Pulsierendes Wachsen/Schrumpfen
- **Bounce**: Hüpfende Bewegung
- **Swing**: Schwingende Bewegung
- **Rotate**: Drehung
- **Shimmer**: Glanzeffekt

## 📐 Textausrichtung in Cards

### Verbesserungen:
- **Zentrierte Ausrichtung**: Alle Texte in Cards zentriert
- **Icons**: Zentriert mit `margin: 0 auto`
- **Überschriften (h3, h4)**: Zentriert und gut lesbar
- **Beschreibungstext**: Zentriert mit verbessertem Line-Height (1.8)
- **Listen**: Links ausgerichtet für bessere Lesbarkeit

## 🎯 Wo wurden Animationen hinzugefügt?

### Startseite:
- ✅ Schwebende Hintergrund-Icons
- ✅ Dekorative Trennlinien
- ✅ Rotating-Icon auf allen Service-Cards
- ✅ Gold-Gradient im Hero-Titel
- ✅ Stagger-Animation bei Grid-Items

### CSS-Klassen verfügbar:
- `.floating-icon` - Schwebende Elemente
- `.decorative-line` - Goldene animierte Linie
- `.rotating-icon` - Icon rotiert bei Hover
- `.gold-accent` - Shimmer-Effekt
- `.animated-link` - Animierte Unterstreichung
- `.text-highlight` - Gold-Highlight mit Pulse

## 🚀 Performance

- Alle Animationen mit CSS (keine JavaScript-Overhead)
- Hardwarebeschleunigung durch `transform`
- Optimierte `ease-in-out` Kurven
- Keine blocking Animationen

## 📱 Responsive

- Alle Animationen funktionieren auf Mobile
- Floating Icons passen sich an
- Reduzierte Animation-Komplexität auf kleinen Screens (optional)

## 🎨 Besondere Highlights

1. **Gold-Shine Animation**: Hero-Titel glänzt subtil
2. **3D Card-Rotation**: Icons drehen sich beim Hover
3. **Schwebende Atmosphäre**: Dekorative Icons im Hintergrund
4. **Stagger-Effekt**: Grid-Items erscheinen nacheinander
5. **Gold-Shadow**: Elegante goldene Schatten bei Hover

---

**Ergebnis**: Eine elegante, animierte Webseite in Schwarz-Gold mit perfekt lesbarem, hellem Design und subtilen, professionellen Animationen!
