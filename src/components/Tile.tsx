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
  title: string;
  breed: string;
  user: string;
  date: string;
  imageFile: string;
}
interface TileProps {
  classifieds: Classifieds;
  user?: boolean;
}

const Tile: FC<TileProps> = ({ classifieds, user }) => {
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

  const deleteClassifieds = () => {
    alert("Löschen");
  };

  return (
    <Link href={`/inserate/${classifieds._id}`} className="vp-tile">
      {user && <button onClick={deleteClassifieds}>Löschen</button>}
      <div className="vp-tile-image-wrapper">
        <Image
          src={
            classifieds.imageFile.length > 0
              ? classifieds.imageFile[0]
              : "/images/tile-placeholder.png"
          }
          height={150}
          width={200}
          alt="Anzeige Bild"
          title="Anzeige Bild"
        />
      </div>

      <span className="tile-location-info">{classifieds?.location}</span>

      <h3>{classifieds?.title}</h3>
      <div className="tile-info">
        <span>{classifieds?.price} €</span>
        <span>22111 Hamburg</span>
      </div>
      <div
        className="tile-content"
        dangerouslySetInnerHTML={{ __html: classifieds?.description }}
      ></div>
      <div className="tile-classifieds-info">
        <p>{classifieds?.username}</p>
        <p>{timeDisplay}</p>
      </div>
    </Link>
  );
};

export default Tile;
