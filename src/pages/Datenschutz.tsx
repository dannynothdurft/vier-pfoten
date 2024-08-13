/* 
    File: pages/Datenschutz.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";
import React from "react";

export default function Datenschutz() {
  return (
    <div className="info-page-ct">
      <h1>Datenschutzerklärung</h1>
      <h2>1. Verantwortlicher</h2>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
      <p>
        <strong>{Config.company}</strong>
        <br />
        Geschäftsführer: Danny Nothdurft
        <br />
        Tribünenweg 32
        <br />
        22111 Hamburg
        <br />
        Telefon: <a href="tel:+4917656612113">0176 56612113</a>
        <br />
        E-Mail:{" "}
        <a href="mailto:danny.nothdurft@icloud.com">
          danny.nothdurft@icloud.com
        </a>
      </p>

      <h2>
        2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck
        ihrer Verwendung
      </h2>

      <h3>a) Beim Besuch der Website</h3>
      <p>
        Beim Aufrufen unserer Website werden durch den auf deinem Endgerät zum
        Einsatz kommenden Browser automatisch Informationen an den Server
        unserer Website gesendet. Diese Informationen werden temporär in einem
        sogenannten Logfile gespeichert. Folgende Informationen werden dabei
        ohne dein Zutun erfasst und bis zur automatisierten Löschung
        gespeichert:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Rechners,</li>
        <li>Datum und Uhrzeit des Zugriffs,</li>
        <li>Name und URL der abgerufenen Datei,</li>
        <li>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
        <li>
          verwendeter Browser und ggf. das Betriebssystem deines Rechners sowie
          der Name deines Access-Providers.
        </li>
      </ul>
      <p>
        Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:
      </p>
      <ul>
        <li>
          Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,
        </li>
        <li>Gewährleistung einer komfortablen Nutzung unserer Website,</li>
        <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
        <li>zu weiteren administrativen Zwecken.</li>
      </ul>
      <p>
        Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1
        lit. f DSGVO. Unser berechtigtes Interesse folgt aus den oben
        aufgelisteten Zwecken zur Datenerhebung.
      </p>

      <h3>b) Bei Registrierung auf der Website</h3>
      <p>
        Bei der Registrierung auf unserer Website werden folgende
        personenbezogenen Daten erhoben:
      </p>
      <ul>
        <li>E-Mail-Adresse</li>
      </ul>
      <p>Die Verarbeitung dieser Daten erfolgt, um:</p>
      <ul>
        <li>deinen Login zu ermöglichen,</li>
        <li>dich als unseren Kunden zu identifizieren,</li>
        <li>die Abwicklung von Anfragen und Chats zu ermöglichen.</li>
      </ul>
      <p>
        Die Datenverarbeitung erfolgt auf deine Anfrage hin und ist nach Art. 6
        Abs. 1 S. 1 lit. b DSGVO zu den genannten Zwecken für die angemessene
        Bearbeitung deiner Registrierung und für die beidseitige Erfüllung von
        Verpflichtungen aus dem Nutzungsvertrag erforderlich.
      </p>

      <h3>c) Bei Nutzung unseres Kontaktformulars</h3>
      <p>
        Bei Fragen jeglicher Art bieten wir dir die Möglichkeit, mit uns über
        ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei
        ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir
        wissen, von wem die Anfrage stammt und um diese beantworten zu können.
        Weitere Angaben können freiwillig getätigt werden.
      </p>
      <p>
        Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt
        nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage deiner freiwillig
        erteilten Einwilligung.
      </p>

      <h2>3. Weitergabe von Daten</h2>
      <p>
        Eine Übermittlung deiner persönlichen Daten an Dritte zu anderen als den
        im Folgenden aufgeführten Zwecken findet nicht statt.
      </p>
      <p>Wir geben deine persönlichen Daten nur an Dritte weiter, wenn:</p>
      <ul>
        <li>
          du deine nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche
          Einwilligung dazu erteilt hast,
        </li>
        <li>
          die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
          erforderlich ist und kein Grund zur Annahme besteht, dass du ein
          überwiegendes schutzwürdiges Interesse an der Nichtweitergabe deiner
          Daten hast,
        </li>
        <li>
          für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c
          DSGVO eine gesetzliche Verpflichtung besteht, sowie
        </li>
        <li>
          dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für
          die Abwicklung von Vertragsverhältnissen mit dir erforderlich ist.
        </li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        Wir setzen auf unserer Website Cookies ein. Hierbei handelt es sich um
        kleine Dateien, die dein Browser automatisch erstellt und die auf deinem
        Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn du
        unsere Seite besuchst. Cookies richten auf deinem Endgerät keinen
        Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware.
      </p>
      <p>
        Die durch den Cookie erzeugten Informationen über deine Benutzung dieser
        Website wie
      </p>
      <ul>
        <li>Browser-Typ/-Version,</li>
        <li>verwendetes Betriebssystem,</li>
        <li>Referrer-URL (die zuvor besuchte Seite),</li>
        <li>Hostname des zugreifenden Rechners (IP-Adresse),</li>
        <li>Uhrzeit der Serveranfrage,</li>
      </ul>
      <p>
        werden an einen Server von Google in den USA übertragen und dort
        gespeichert. Diese Informationen werden genutzt, um die Nutzung der
        Website auszuwerten, um Reports über die Websiteaktivitäten
        zusammenzustellen und um weitere mit der Websitenutzung und der
        Internetnutzung verbundene Dienstleistungen zu erbringen.
      </p>
    </div>
  );
}
