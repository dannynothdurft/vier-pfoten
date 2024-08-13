/* 
    File: pages/AGB.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import Config from "@/config.json";
import React from "react";

export default function AGB() {
  return (
    <div className="info-page-ct">
      <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>

      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der
        Plattform <strong>{Config.company}</strong>, die von Danny Nothdurft,
        Tribünenweg 32, 22111 Hamburg, betrieben wird. Die Plattform ermöglicht
        es Nutzern, Haustiere zum Verkauf oder zur Vermittlung anzubieten.
      </p>

      <h2>2. Registrierung</h2>
      <p>
        Um die Plattform nutzen zu können, müssen sich die Nutzer registrieren.
        Die Registrierung erfolgt durch die Angabe einer gültigen
        E-Mail-Adresse. Mit der Registrierung akzeptieren die Nutzer diese AGB.
        Ein Anspruch auf Registrierung besteht nicht.
      </p>

      <h2>3. Nutzung der Plattform</h2>
      <p>
        Die Plattform dient ausschließlich dem Zweck, Haustiere zu vermitteln
        oder zum Verkauf anzubieten. Jegliche anderen Angebote oder Aktivitäten
        sind untersagt. Die Nutzer sind verpflichtet, nur wahrheitsgemäße und
        vollständige Angaben zu den angebotenen Tieren zu machen.
      </p>

      <h2>4. Pflichten der Nutzer</h2>
      <p>
        Die Nutzer verpflichten sich, die Plattform nicht für illegale oder
        unethische Zwecke zu nutzen. Es ist untersagt, irreführende, falsche
        oder unvollständige Informationen über die Tiere zu veröffentlichen.
        Weiterhin dürfen keine Tiere angeboten werden, deren Handel gesetzlich
        verboten ist.
      </p>

      <h2>5. Haftung</h2>
      <p>
        Der Betreiber der Plattform haftet nicht für die Richtigkeit,
        Vollständigkeit oder Aktualität der von den Nutzern bereitgestellten
        Informationen. Der Betreiber übernimmt keine Verantwortung für die
        Verträge, die zwischen den Nutzern der Plattform geschlossen werden.
      </p>

      <h2>6. Zahlungsabwicklung</h2>
      <p>
        Die Zahlungsabwicklung erfolgt über den Drittanbieter{" "}
        <strong>Stripe</strong>. Der Betreiber der Plattform übernimmt keine
        Haftung für die Zahlungsabwicklung und ist nicht Partei des Kaufvertrags
        zwischen den Nutzern.
      </p>

      <h2>7. Datenschutz</h2>
      <p>
        Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{" "}
        <a href="datenschutzerklaerung.html">Datenschutzerklärung</a>. Mit der
        Registrierung erklären sich die Nutzer mit der Verarbeitung ihrer Daten
        einverstanden.
      </p>

      <h2>8. Beendigung der Nutzung</h2>
      <p>
        Der Betreiber behält sich das Recht vor, Nutzern den Zugang zur
        Plattform jederzeit und ohne Angabe von Gründen zu verwehren,
        insbesondere bei Verstößen gegen diese AGB.
      </p>

      <h2>9. Änderungen der AGB</h2>
      <p>
        Der Betreiber behält sich das Recht vor, diese AGB jederzeit zu ändern.
        Die geänderten AGB werden den Nutzern per E-Mail mitgeteilt.
        Widerspricht der Nutzer den geänderten AGB nicht innerhalb von 14 Tagen,
        gelten diese als akzeptiert.
      </p>

      <h2>10. Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist,
        soweit gesetzlich zulässig, der Sitz des Betreibers.
      </p>
    </div>
  );
}
