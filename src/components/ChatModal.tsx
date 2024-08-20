/*
    File: components/chatModal.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:    In dieser Datei wird der Eröffnungschat bereitgestellt.
                    Diese Datei wird auf der Seite /inserate/[id] gerendert.
*/

"use client";
import "@/styles/chatmodal.scss";

// importe von React und Next
import React, { FC, ChangeEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// importe npm package manager
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// importe Funktionen & Utils
import { startMessage } from "@/utils/chat";
import SpeechBubble from "@/utils/svg/SpeechBubble";
import Close from "@/utils/svg/Close";

// importe Components

interface ChatModalProps {
  classifieds: Classifieds;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Classifieds {
  _id: string;
  username: string;
  title: string;
  description: string;
  price: number;
  imageFile: string[];
}

const ChatModal: FC<ChatModalProps> = ({ classifieds, setState }) => {
  const chatModal = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: any) => state.user);
  const [translations, setTranslations] = useState<any>(null);
  const [lang, setLang] = useState("de"); //! Später im Reducer gespeichert
  const [msg, setMsg] = useState<string>("");

  //? useEffects
  /**
   * Lädt die Übersetzungen basierend auf der aktuellen Sprache und setzt sie im State.
   * Dieser Effekt wird jedes Mal ausgeführt, wenn sich die Sprache ändert.
   *
   * Die Funktion `loadTranslations` importiert die Sprachdatei dynamisch anhand des aktuellen Sprachcodes (`lang`).
   * Falls beim Laden der Datei ein Fehler auftritt, wird eine Fehlermeldung in der Konsole angezeigt.
   *
   * @param lang - Der Sprachcode, der die zu ladende Übersetzungsdatei bestimmt.
   * @returns Keine Rückgabewerte. Der Effekt setzt die Übersetzungen in den State.
   */
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const langModule = await import(`@/lang/${lang}/chatmodal.json`);
        setTranslations(langModule.default);
      } catch (error) {
        console.error("Fehler beim Laden der Sprachdatei:", error);
      }
    };

    loadTranslations();
  }, [lang]);

  /**
   * Dieser Effekt wird verwendet, um das Scrollen der Seite zu deaktivieren, wenn die Komponente gemountet wird,
   * und es wieder zu aktivieren, wenn die Komponente unmontiert wird.
   *
   * Beim Mounten der Komponente wird die Funktion `disableScroll` aufgerufen, um das Scrollen auf der Seite zu verhindern.
   * Diese Funktion wird verwendet, um sicherzustellen, dass der Benutzer beim Anzeigen der Komponente nicht scrollen kann.
   *
   * Beim Unmounten der Komponente wird die Funktion `enableScroll` aufgerufen, um das Scrollen wieder zu aktivieren.
   * Dies stellt sicher, dass die Seite wieder scrollbar ist, nachdem die Komponente nicht mehr angezeigt wird.
   *
   * @returns Eine Cleanup-Funktion, die beim Unmounten der Komponente aufgerufen wird, um das Scrollen wieder zu aktivieren.
   */
  useEffect(() => {
    disableScroll();

    return () => {
      enableScroll();
    };
  }, []);

  /**
   * Dieser Effekt wird verwendet, um einen Klick außerhalb des Modals zu erkennen und das Modal in diesem Fall zu schließen.
   *
   * Der Effekt fügt einen Event-Listener hinzu, der auf `mousedown`-Ereignisse auf dem Dokument lauscht.
   * Wenn ein Klick außerhalb des Modals erkannt wird, wird die Funktion `handleClickOutside` aufgerufen,
   * um den Zustand des Modals auf `false` zu setzen und es somit zu schließen.
   *
   * Beim Unmounten der Komponente wird der Event-Listener entfernt, um Speicherlecks und unerwünschte Effekte zu verhindern.
   *
   * @returns Eine Cleanup-Funktion, die beim Unmounten der Komponente aufgerufen wird, um den Event-Listener zu entfernen.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatModal.current &&
        !chatModal.current.contains(event.target as Node)
      ) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setState]);

  //? onChange Events
  /**
   * Behandelt Änderungen des Inhalts in einem Textbereich (Textarea) und aktualisiert den Zustand mit dem neuen Wert.
   *
   * Diese Funktion wird aufgerufen, wenn der Benutzer eine Eingabe in das Textfeld tätigt.
   * Sie extrahiert den neuen Wert aus dem `ChangeEvent`-Objekt und aktualisiert den Zustand mit `setMsg`.
   *
   * @param e - Das ChangeEvent-Objekt, das vom Textbereich (Textarea) übergeben wird.
   *          `e.target.value` enthält den aktuellen Wert des Textbereichs.
   */
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
  };

  //? normale funktionen
  /**
   * Deaktiviert das Scrollen auf der gesamten Seite, indem der `overflow`-Stil des `body`-Elements auf `"hidden"` gesetzt wird.
   *
   * Diese Funktion wird verwendet, um das Scrollen der Seite zu verhindern. Dies ist nützlich, wenn ein Modal, ein Overlay oder eine
   * andere Komponente angezeigt wird, bei der das Scrollen im Hintergrund unerwünscht ist.
   *
   * @returns Keine Rückgabewerte. Die Funktion ändert den `overflow`-Stil des `body`-Elements direkt.
   */
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  /**
   * Aktiviert das Scrollen auf der gesamten Seite, indem der `overflow`-Stil des `body`-Elements zurückgesetzt wird.
   *
   * Diese Funktion wird verwendet, um das Scrollen der Seite wieder zu ermöglichen, nachdem es zuvor durch `disableScroll` deaktiviert wurde.
   * Dies ist nützlich, wenn ein Modal oder Overlay geschlossen wird und das Scrollen im Hintergrund wiederhergestellt werden soll.
   *
   * @returns Keine Rückgabewerte. Die Funktion ändert den `overflow`-Stil des `body`-Elements direkt.
   */
  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  /**
   * Behandelt das Klicken auf einen Button, indem der Zustand aktualisiert und das Scrollen wieder aktiviert wird.
   *
   * Diese Funktion wird aufgerufen, wenn ein Button geklickt wird. Sie führt zwei Hauptaktionen aus:
   * 1. Setzt den Zustand auf `false` mit `setState`, was typischerweise bedeutet, dass das chatModal geschlossen wird.
   * 2. Ruft `enableScroll` auf, um das Scrollen auf der Seite wieder zu aktivieren, falls es vorher durch eine andere Funktion deaktiviert wurde.
   *
   * @returns Keine Rückgabewerte. Die Funktion führt direkte Änderungen am Zustand und der Seitenansicht durch.
   */
  const closeModal = () => {
    setState(false);
    enableScroll();
  };

  /**
   * Ersetzt Platzhalter im Text durch React `Link`-Komponenten.
   *
   * Diese Funktion durchsucht den übergebenen Text nach speziellen Platzhaltern, die in der Form `{link}{href/URL}Text{/link}` vorliegen,
   * und ersetzt diese Platzhalter durch React `Link`-Komponenten. Der `Link` wird dabei dynamisch erstellt, wobei `href/URL` als Ziel-URL
   * verwendet wird und `Text` der Inhalt des Links ist.
   *
   * Der Text wird in Teile zerlegt, die vor und nach den Platzhaltern liegen, und die Link-Komponenten werden in den entsprechenden Positionen eingefügt.
   *
   * @param text - Der Eingabetext mit Platzhaltern, die durch `Link`-Komponenten ersetzt werden sollen.
   * @returns Ein Array von React-Elementen und Textteilen, das die ursprünglichen Platzhalter durch `Link`-Komponenten ersetzt.
   */
  const replacePlaceholders = (text: string) => {
    const regex = /\{link\}(.*?)\{href\/(.*?)\}(.*?)\{\/link\}/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const [_, linkTextBefore, linkUrl, linkTextAfter] = match;
      parts.push(
        <Link key={parts.length} href={`/${linkUrl}`}>
          {linkTextBefore}
          {linkTextAfter}
        </Link>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  //? Handler
  /**
   * Verarbeitet die Formularübermittlung und sendet eine Nachricht, indem Daten an den Server gesendet werden.
   *
   * Diese Funktion erstellt ein Datenobjekt mit Informationen zu einer Klassifizierung, den Benutzern und der Nachricht,
   * und ruft dann eine Hilfsfunktion auf, um die Nachricht zu senden. Nach dem Versand der Nachricht wird der Zustand aktualisiert,
   * und eine Erfolgsmeldung wird angezeigt.
   *
   * @returns Keine Rückgabewerte. Die Funktion führt asynchrone Operationen durch und aktualisiert den Zustand der Komponente.
   */
  const handleSubmit = async () => {
    const data = {
      classifiedsID: classifieds._id,
      classifiedsTitle: classifieds.title,
      user1: user.username,
      user2: classifieds.username,
      msg: msg,
      date: new Date().toLocaleString(),
      readStatus: false,
    };

    const sendMSG = async () => {
      const response = await startMessage(data);
      if (response.success) {
        setState(false);
        toast.success(response.message);
      }
    };

    sendMSG();
  };

  //? Returns
  /**
   * Überprüft, ob die Übersetzungen geladen wurden, und zeigt einen Ladeindikator an, wenn sie noch nicht verfügbar sind.
   *
   * Diese Bedingung wird verwendet, um sicherzustellen, dass der Inhalt der Komponente nur angezeigt wird, wenn die erforderlichen
   * Übersetzungen vollständig geladen sind. Solange die Übersetzungen nicht verfügbar sind, wird ein einfacher Ladeindikator angezeigt.
   *
   * @returns {JSX.Element} - Gibt entweder einen Ladeindikator (`<div>Loading...</div>`) oder den restlichen Inhalt der Komponente zurück.
   */
  if (!translations) {
    return <div>Loading...</div>;
  }

  /**
   * Rendert das modale Chat-Fenster mit allen erforderlichen Informationen und Interaktionen.
   *
   * Diese Methode gibt die gesamte Struktur des modalen Fensters zurück, das folgende Elemente enthält:
   * 1. **Overlay**: Ein halbtransparentes Overlay (`chat-modal-overlay`), das den Hintergrund abdunkelt.
   * 2. **Modales Container**: Der Hauptcontainer (`chat-modal-ct`) für das modale Fenster, der durch die Referenz `chatModal` angesprochen werden kann.
   * 3. **Header**: Enthält den Titel des Modals (`translations.modalTitle`) und einen Button zum Schließen des Modals.
   * 4. **Informationsbereich**: Zeigt ein Bild (`Image`) der Klassifizierung und relevante Informationen wie Benutzername und Titel an.
   * 5. **Body**: Beinhaltet das Eingabefeld für die Nachricht (`<textarea>`) und einen Button zum Absenden der Nachricht, der den Text über den Button `translations.msgSubmit` anzeigt.
   * 6. **Footer**: Zeigt rechtliche Hinweise an, bei denen Platzhalter durch die Funktion `replacePlaceholders` ersetzt werden.
   *
   * Wenn die Übersetzungen (`translations`) noch nicht geladen sind, wird ein Ladeindikator angezeigt, um dem Benutzer anzuzeigen, dass die Daten noch abgerufen werden.
   *
   * @returns {JSX.Element} - Gibt entweder den Inhalt des modalen Fensters oder einen Ladeindikator zurück, abhängig davon, ob die Übersetzungen verfügbar sind.
   */
  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-ct" ref={chatModal}>
        <div className="chat-modal-header">
          <h2>{translations.modalTitle}</h2>
          <button onClick={closeModal}>
            <Close />
          </button>
        </div>
        <div className="chat-modal-info">
          <div className="image-wrapper">
            <Image
              src={
                classifieds.imageFile.length > 0
                  ? classifieds.imageFile[0]
                  : "/images/tile-placeholder.png"
              }
              alt={classifieds.title}
              title={classifieds.title}
              width={50}
              height={50}
            />
          </div>
          <div className="info-wrapper">
            <p className="info-username">{classifieds.username}</p>
            <p className="info-classifieds-title">{classifieds.title}</p>
          </div>
        </div>
        <div className="chat-modal-body">
          <label>
            {translations.msgLabel}
            <textarea value={msg} name="msg" onChange={handleChange} />
          </label>
          <button className="btn" onClick={handleSubmit}>
            <SpeechBubble />
            {translations.msgSubmit}
          </button>
        </div>
        <div className="chat-modal-footer">
          <p className="legal-text">
            {replacePlaceholders(translations.legalTextFirst)}
          </p>
          <p className="legal-text">
            {replacePlaceholders(translations.legalTextSecond)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
