export interface SlideData {
  id: number;
  title: string;
  content: string[];
  imagePromptSuggestion?: string;
  layout: 'title' | 'content-left' | 'content-right' | 'full-image' | 'text-only';
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "Comic zeichnen – Eine Geschichte in Bildern erzählen",
    content: [
      "Willkommen zum Kurs!",
      "Dozentin: Christiane Pönisch",
      "Volkshochschule"
    ],
    layout: 'title'
  },
  {
    id: 2,
    title: "Unser Kurs & Projekt",
    content: [
      "Unser Ziel: Am Ende des Kurses zeichnet jeder eine fertige Comic-Seite (eine komplette Szene).",
      "Keine Angst vor leeren Blättern – wir gehen Schritt für Schritt vor!",
      "Der Spaß am Erzählen steht im Vordergrund, nicht die Perfektion.",
      "Ihr lernt alle Schritte: Von der Idee bis zur kolorierten Seite."
    ],
    imagePromptSuggestion: "Eine Gruppe von Menschen verschiedenen Alters, die glücklich und entspannt an Tischen sitzen und zeichnen. Helle, freundliche Volkshochschul-Atmosphäre, illustrativer Stil.",
    layout: 'content-left'
  },
  {
    id: 3,
    title: "Was ist eigentlich ein Comic?",
    content: [
      "Comics sind die Kunst der 'sequentiellen Bildsprache'.",
      "Es ist eine Kombination aus Text und Bild, um Zeit, Bewegung und Handlung darzustellen.",
      "Jedes Bild (Panel) ist wie ein eingefrorener Moment."
    ],
    imagePromptSuggestion: "Ein simples Beispiel für sequentielle Kunst: Drei Panels nebeneinander. Bild 1: Ein Apfel fällt vom Baum. Bild 2: Der Apfel ist in der Luft. Bild 3: Der Apfel trifft den Boden.",
    layout: 'content-right'
  },
  {
    id: 4,
    title: "Das Material",
    content: [
      "Was wir brauchen:",
      "• Bleistift (HB oder B) & Radiergummi für weiche Skizzen.",
      "• Fineliner / Tuschestift (verschiedene Stärken) für klare Konturen.",
      "• Marker oder Buntstifte für die finale Kolorierung.",
      "• Gutes, glattes Papier."
    ],
    imagePromptSuggestion: "Eine ästhetische, ordentliche Anordnung von Zeichenmaterialien auf einem Holztisch: Bleistifte, Fineliner, bunte Marker, ein Radiergummi und ein Skizzenblock.",
    layout: 'content-left'
  },
  {
    id: 5,
    title: "Keine Panik! Jeder kann zeichnen",
    content: [
      "Du musst kein Michelangelo sein, um einen Comic zu machen!",
      "Selbst einfache Strichmännchen können eine großartige Geschichte erzählen, wenn die Emotion stimmt.",
      "Konzentriere dich auf Mimik und Körpersprache – einfache Formen reichen oft völlig aus."
    ],
    imagePromptSuggestion: "Ein sehr einfach gezeichnetes, aber extrem ausdrucksstarkes Strichmännchen, das jubelnd in die Luft springt. Minimalistischer Comic-Stil.",
    layout: 'content-right'
  },
  {
    id: 6,
    title: "Schritt 1: Die Idee & Das Skript",
    content: [
      "Bevor wir zeichnen, brauchen wir eine Handlung.",
      "Überlege dir für unsere Szene: Wer? Wo? Was passiert?",
      "Schreibe die Handlung in 3-4 einfachen Sätzen auf.",
      "Notiere dir auch schon erste Dialogideen."
    ],
    imagePromptSuggestion: "Ein offenes Notizbuch mit handgeschriebenem Text und kleinen gekritzelten Ideen am Rand. Ein Stift liegt daneben.",
    layout: 'content-left'
  },
  {
    id: 7,
    title: "Schritt 2: Figuren entwickeln",
    content: [
      "Baue deine Figuren aus einfachen geometrischen Formen (Kreise, Rechtecke, Dreiecke).",
      "Achte auf eine klare Silhouette – kann man die Figur auch als reinen schwarzen Umriss erkennen?",
      "Gib deinen Figuren ein prägnantes Merkmal (z.B. eine Brille, eine große Nase, eine bestimmte Frisur)."
    ],
    imagePromptSuggestion: "Charakterdesign-Skizze: Eine lustige Comicfigur, die aus einfachen geometrischen Grundformen konstruiert ist (Kreise für den Kopf, Zylinder für Arme). Skizzenhafter Stil.",
    layout: 'content-right'
  },
  {
    id: 8,
    title: "Schritt 3: Panels & Seitenaufbau (Layout)",
    content: [
      "Panels (die Bilderrahmen) ordnen die Zeit. Ein großes Panel = viel Zeit/Wichtigkeit. Ein kleines Panel = schneller Moment.",
      "Lesefluss im Westen: Wir lesen von links nach rechts und von oben nach unten.",
      "Skizziere zuerst grobe Kästchen auf dein Blatt, um das Layout zu planen."
    ],
    imagePromptSuggestion: "Das Layout einer leeren Comicseite mit verschiedenen leeren Panels (Kästchen), Pfeile zeigen den Lesefluss von links nach rechts und oben nach unten.",
    layout: 'content-left'
  },
  {
    id: 9,
    title: "Schritt 4: Perspektive & Bildausschnitt",
    content: [
      "Wechsle die 'Kameraeinstellung', damit es nicht langweilig wird!",
      "• Totale: Zeigt den ganzen Ort (Wo sind wir?).",
      "• Halbnah: Zeigt die Figur ab der Hüfte (Aktion!).",
      "• Nahaufnahme / Close-Up: Zeigt nur das Gesicht (Emotionen!)."
    ],
    imagePromptSuggestion: "Drei Comic-Panels nebeneinander, die dieselbe Person zeigen. 1. Totale (Person in einem Raum). 2. Halbnah (Person interagiert mit etwas). 3. Nahaufnahme (geschocktes Gesicht).",
    layout: 'content-right'
  },
  {
    id: 10,
    title: "Schritt 5: Sprechblasen, Text & Lettering",
    content: [
      "Die goldene Regel: Zuerst den Text schreiben, DANN die Blase drumherum zeichnen!",
      "Achte auf gut lesbare Druckbuchstaben (Lettering).",
      "Nutze verschiedene Blasenformen: Runde für normales Sprechen, Wolken für Gedanken, zackige für Schreien."
    ],
    imagePromptSuggestion: "Verschiedene Arten von leeren Comic-Sprechblasen (normal, Gedanke, Schrei) auf einem weißen Hintergrund, sauber im Comic-Stil gezeichnet.",
    layout: 'content-left'
  },
  {
    id: 11,
    title: "Schritt 6: Vorzeichnen (Penciling)",
    content: [
      "Jetzt geht's los! Wir zeichnen locker mit Bleistift in unsere Panels.",
      "Drücke nicht zu fest auf – das lässt sich später viel besser radieren.",
      "Bleib skizzenhaft, suche die richtigen Linien. Details kommen später."
    ],
    imagePromptSuggestion: "Eine Bleistiftskizze einer dynamischen Comic-Szene. Man sieht noch Hilfslinien und Konstruktionskreise. Es wirkt noch unfertig, aber lebendig.",
    layout: 'content-right'
  },
  {
    id: 12,
    title: "Schritt 7: Inking (Tuschen & Finish)",
    content: [
      "Ziehe nun die besten deiner Bleistiftlinien mit dem Fineliner nach.",
      "Nutze dickere Linien für den Umriss und dünnere für Details im Inneren.",
      "Setze schwarz schattierte Flächen (Spot Blacks) für Kontrast.",
      "WICHTIG: Wenn die Tusche gut getrocknet ist, den Bleistift vorsichtig wegradieren."
    ],
    imagePromptSuggestion: "Ein Tusche-Comicpanel kurz vor der Fertigstellung. Eine Hand hält einen schwarzen Fineliner und zieht gerade die klaren Konturen einer Figur nach.",
    layout: 'content-left'
  },
  {
    id: 13,
    title: "Schritt 8: Kolorierung",
    content: [
      "Hauche deiner Zeichnung mit Markern oder Buntstiften Leben ein.",
      "Weniger ist oft mehr: Eine begrenzte, harmonische Farbpalette wirkt oft besser als alle Farben wild gemischt.",
      "Setze gezielt Licht- und Schatten-Akzente, um Tiefe zu erzeugen."
    ],
    imagePromptSuggestion: "Ein fröhliches, bunt koloriertes Comic-Panel. Leuchtende, harmonische Marker-Farben mit klaren Licht- und Schattenbereichen.",
    layout: 'content-right'
  },
  {
    id: 14,
    title: "Typische Anfängerfehler (und wie wir sie vermeiden)",
    content: [
      "• Fehler: Text passt nicht in die Blase. Lösung: Erst Text, dann Blase!",
      "• Fehler: Figuren wirken steif wie Bretter. Lösung: Nutze eine geschwungene Aktionslinie für die Körperhaltung.",
      "• Fehler: Zu viel passiert auf einmal. Lösung: Teile komplexe Handlungen auf mehrere kleine Panels auf."
    ],
    layout: 'text-only'
  },
  {
    id: 15,
    title: "Inspiration: Historische deutsche Comics",
    content: [
      "Wilhelm Busch ('Max und Moritz') gilt oft als einer der Pioniere der Bildgeschichte.",
      "Auch Rolf Kauka ('Fix und Foxi') hat die deutsche Comiclandschaft geprägt.",
      "Schaut euch an, wie einfach und doch extrem ausdrucksstark und dynamisch die Figuren früher gezeichnet waren."
    ],
    imagePromptSuggestion: "Eine Illustration im Stil alter deutscher Bildergeschichten des 19. Jahrhunderts, ähnlich Wilhelm Busch, zwei freche Jungen, die einen Streich spielen.",
    layout: 'content-left'
  },
  {
    id: 16,
    title: "Inspiration: Internationale Vorbilder",
    content: [
      "Es gibt unendlich viele Stile: Von den minimalistischen 'Peanuts' über die klare Linie bei 'Tim und Struppi' bis hin zu detailreichen Mangas oder Superhelden-Comics.",
      "Jeder Stil ist erlaubt! Findet im Laufe des Kurses euren ganz eigenen Weg und Strich."
    ],
    imagePromptSuggestion: "Eine Collage aus drei völlig verschiedenen Comic-Stilen: Ein minimalistischer Zeitungs-Strip-Stil, ein klarer französisch-belgischer Ligne-Claire-Stil und ein ausdrucksstarker Manga-Stil.",
    layout: 'content-right'
  },
  {
    id: 17,
    title: "Die Hausaufgabe für nächste Woche",
    content: [
      "Euer Einsatz ist gefragt! Startet mit eurer Idee.",
      "1. Überlegt euch eine kleine, einfache Alltagsszene (z.B. 'Der Kaffee ist leer' oder 'Warten auf den Bus').",
      "2. Skizziert eure Hauptfigur in 2-3 verschiedenen Emotionen (freudig, genervt, überrascht)."
    ],
    imagePromptSuggestion: "Ein einfaches Skizzenblatt mit einer Comicfigur in drei verschiedenen Gesichtsausdrücken: Glücklich, Wütend, Überrascht.",
    layout: 'content-left'
  },
  {
    id: 18,
    title: "Fragen & Austausch",
    content: [
      "Habt ihr Fragen zu Material, Ideenfindung oder dem Kursablauf?",
      "Ich bin für euch da und helfe gerne bei jedem Strich.",
      "Nutzt auch gerne unseren 'KI-Assistenten' im Kurs, um euch Inspirationen für Figuren oder Layouts geben zu lassen!"
    ],
    layout: 'text-only'
  },
  {
    id: 19,
    title: "Los geht's!",
    content: [
      "Traut euch, Fehler zu machen. Der Radiergummi ist euer bester Freund.",
      "Viel Spaß beim Zeichnen und Geschichtenerzählen!",
      "Wir sehen uns nächste Woche!"
    ],
    imagePromptSuggestion: "Ein fröhlicher Abschluss: Eine gezeichnete Hand, die einen Bleistift hochhält wie eine Trophäe, umgeben von kleinen gezeichneten Sternchen und Konfetti.",
    layout: 'full-image'
  }
];
