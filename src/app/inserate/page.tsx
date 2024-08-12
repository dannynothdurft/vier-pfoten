/* 
    File: inserate/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/inserate.scss";
import Lang from "@/lang/de.json";
import React from "react";

import Tile from "@/components/Tile";

export default function Inserate() {
  return (
    <>
      <section className="vp-inserate-header">
        <h1>{Lang.homepage.titel}</h1>
      </section>
      <div className="vp-inserate-wrapper">
        <div className="vp-filtered-ct">
          Filterung muss hier eingebaut werden
        </div>
        <div className="vp-search">
          <p>1 ... 20</p>
          <div className="vp-search-results">
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
            <Tile title="Überschrift" />
          </div>
          <p>1 ... 20</p>
        </div>
      </div>
    </>
  );
}
