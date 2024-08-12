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

interface TileProps {
  title: string;
}

const Tile: FC<TileProps> = ({ title }) => {
  return (
    <div className="vp-tile">
      <div className="vp-tile-image-wrapper">
        <Image
          src={"/images/tile-placeholder.png"}
          height={150}
          width={200}
          alt="Anzeige Bild"
          title="Anzeige Bild"
        />
      </div>
      <h3>{title}</h3>
      <div className="tile-info">
        <span>500€</span>
        <span>22111 Hamburg</span>
      </div>
      <p className="tile-content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore quaerat
        veniam magni vitae tempora natus.
      </p>
      <p className="tile-username">Inseriert von</p>
    </div>
  );
};

export default Tile;
