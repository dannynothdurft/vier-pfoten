/* 
    File: Tile.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:    Tile / Kachel
                    Diese Datei ist die Darstellung der Inserate auf der HomePage und bei der Suche.
*/

"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Classifieds {
  animalType: string;
  price: number;
  location: string;
  description: string;
  username: string;
  titel: string;
  breed: string;
  user: string;
  date: string;
}
interface TileProps {
  classifieds: Classifieds;
}

const Tile: FC<TileProps> = ({ classifieds }) => {
  // Berechne die Differenz zwischen dem Anzeigen-Datum und dem aktuellen Datum
  const calculateDateDifference = (date: string) => {
    const adDate = new Date(date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - adDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Erhalte die Differenz in Tagen
  const daysAgo = calculateDateDifference(classifieds.date);

  // Berechne die Differenz zwischen dem Anzeigen-Datum und dem aktuellen Datum in Minuten
  const calculateDateDifferences = (date: string) => {
    const adDate = new Date(date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - adDate.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60)); // Konvertiere Millisekunden in Minuten
    return diffMinutes;
  };

  // Erhalte die Differenz in Minuten
  const minutesAgo = calculateDateDifferences(classifieds.date);

  console.log(daysAgo);
  console.log(minutesAgo);
  return (
    <Link href={"/inserate/jfalejfoiae"} className="vp-tile">
      <div className="vp-tile-image-wrapper">
        <Image
          src={"/images/tile-placeholder.png"}
          height={150}
          width={200}
          alt="Anzeige Bild"
          title="Anzeige Bild"
        />
      </div>
      <h3>{classifieds?.animalType}</h3>
      <div className="tile-info">
        <span>{classifieds?.price} €</span>
        <span>22111 Hamburg</span>
      </div>
      <p className="tile-content">{classifieds?.description}</p>
      <p className="tile-username">Anzeige von {classifieds?.user}</p>
    </Link>
  );
};

export default Tile;
