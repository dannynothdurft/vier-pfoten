/* 
    File: page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Lang from "@/lang/de.json";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <section className="vp-home-header">
        <h1>{Lang.homepage.titel}</h1>
        <p>{Lang.homepage.content}</p>
        <button className="btn header">Anzeige Schalten</button>
      </section>

      <section className="vp-special-info">
        <p className="info-item">
          0<span>Mitglieder</span>
        </p>
        <p className="info-item">
          0<span>Inserate</span>
        </p>
        <p className="info-item">
          0<span>Vermittlungen</span>
        </p>
        <p className="info-item">
          0<span>WNN</span>
        </p>
      </section>

      <section className="vp-section">
        <div>
          <div>
            <h3>
              <FaStar />
              Kostenlose Inserate:
            </h3>
            <p>Erstellen Sie Ihre Anzeigen ohne zusätzliche Kosten.</p>
          </div>
          <div>
            <h3>
              <FaStar />
              Große Reichweite:
            </h3>
            <p>
              Erreichen Sie gezielt Tierliebhaber und potenzielle neue Besitzer.
            </p>
          </div>
          <div>
            <h3>
              <FaStar />
              Einfache Bedienung:
            </h3>
            <p>
              Benutzerfreundliche Oberfläche für schnelles und unkompliziertes
              Inserieren.
            </p>
          </div>
        </div>
        <Image
          src={"/images/shadow-dog.png"}
          alt="Schatten Hund"
          width={160}
          height={320}
          title="Schatten Hund"
        />
        <div>
          <div>
            <h3>
              <FaStar />
              Sichere Kommunikation:
            </h3>
            <p>
              Integriertes Nachrichtensystem zum sicheren Austausch mit
              Interessenten.
            </p>
          </div>
          <div>
            <h3>
              <FaStar />
              Qualifizierte Interessenten:
            </h3>
            <p>Nur geprüfte und seriöse Anfragen für Ihre Tiere.</p>
          </div>
          <div>
            <h3>
              <FaStar />
              Gezielte Suche:
            </h3>
            <p>
              Benutzer können gezielt nach bestimmten Rassen, Altersgruppen oder
              Bedürfnissen filtern, um das perfekte Haustier zu finden.
            </p>
          </div>
        </div>
      </section>

      <section>8 Inserate in einem Grid Template</section>

      <section className="vp-section">
        <div>
          <div>
            <h3>
              <FaStar />
              24/7 Support:
            </h3>
            <p>
              Rund-um-die-Uhr Unterstützung für alle Fragen und Anliegen der
              Nutzer.
            </p>
          </div>
          <div>
            <h3>
              <FaStar />
              Benutzerfreundliche Oberfläche:
            </h3>
            <p>
              Intuitive und einfache Navigation für eine stressfreie Nutzung.
            </p>
          </div>
          <div>
            <h3>
              <FaStar />
              Schnelle Inseratfreigabe:
            </h3>
            <p>
              Sofortige Veröffentlichung Ihrer Anzeigen für eine schnelle
              Vermittlung.
            </p>
          </div>
        </div>
        <Image
          src={"/images/shadow-cat.png"}
          alt="Schatten Katze"
          width={190}
          height={320}
          title="Schatten Katze"
        />
        <div>
          <div>
            <h3>
              <FaStar />
              Erweiterte Suchfilter:
            </h3>
            <p>
              Detaillierte Suchmöglichkeiten, um genau das passende Haustier zu
              finden.
            </p>
          </div>
          <div>
            <h3>
              <FaStar />
              Qualitätskontrolle:
            </h3>
            <p>
              Prüfung und Überprüfung der Inserate für maximale Seriosität und
              Vertrauenswürdigkeit.
            </p>
          </div>
          <div>
            <h3>
              <FaStar />
              Qualitätskontrolle:
            </h3>
            <p>
              Individuelle Unterstützung bei der Erstellung und Optimierung
              Ihrer Inserate.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
