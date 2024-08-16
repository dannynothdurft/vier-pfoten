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
  _id: string;
  animalType: string;
  price: number;
  location: string;
  description: string;
  username: string;
  titel: string;
  breed: string;
  user: string;
  date: string;
  imageFile: string;
}
interface TileProps {
  classifieds: Classifieds;
}

const Tile: FC<TileProps> = ({ classifieds }) => {
  let timeDisplay;

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

  if (minutesAgo < 60) {
    timeDisplay = minutesAgo + " Minuten";
  } else if (minutesAgo >= 60 && minutesAgo < 1440) {
    timeDisplay = Math.round(minutesAgo / 60) + " Stunden";
  } else if (minutesAgo >= 1440) {
    timeDisplay = daysAgo;
  }

  return (
    <Link href={`/inserate/${classifieds._id}`} className="vp-tile">
      <div className="vp-tile-image-wrapper">
        <Image
          src={
            classifieds.imageFile
              ? classifieds.imageFile
              : "/images/tile-placeholder.png"
          }
          height={150}
          width={200}
          alt="Anzeige Bild"
          title="Anzeige Bild"
        />
      </div>

      <span className="tile-location-info">{classifieds?.location}</span>

      <h3>{classifieds?.titel}</h3>
      <div className="tile-info">
        <span>{classifieds?.price} €</span>
        <span>22111 Hamburg</span>
      </div>
      <p className="tile-content">{classifieds?.description}</p>
      <div className="tile-classifieds-info">
        <p>{classifieds?.username}</p>
        <p>{timeDisplay}</p>
      </div>
    </Link>
  );
};

export default Tile;
