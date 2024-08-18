/* 
    File: inserate/page.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/inserate.scss";
import Lang from "@/lang/de.json";
import React, { useEffect, useState } from "react";

import Tile from "@/components/Tile";
import Pagination from "@/components/Pagination";
import { getClassifieds, paginationClassifieds } from "@/utils/classifieds";

export default function Inserate() {
  const [classifieds, setClassifieds] = useState<any>(undefined);
  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const inserts = await getClassifieds({
        count: "all",
      });
      setClassifieds(inserts);
      setPages(Math.ceil(inserts.length / 9));
    };

    fetchData();
  }, []);

  const handleClick = (page: any) => {
    const fetchData = async () => {
      let to = page * 9;
      let from = to - 8;

      const inserts = await paginationClassifieds({
        from: from,
        to: to,
      });
      setActivePage(page);
      setClassifieds(inserts);
    };

    fetchData();
  };

  return (
    <>
      <section className="vp-inserate-header">
        <h1>{Lang.homepage.titel}</h1>
      </section>
      <div className="vp-inserate-wrapper">
        <div className="vp-filtered-ct">
          Filterung muss hier eingebaut werden
        </div>
        <div className="vp-search-ct">
          <Pagination
            pages={pages}
            activePage={activePage}
            onPageChange={handleClick}
          />
          <div className="vp-search-results">
            {classifieds?.data?.length >= 1 &&
            classifieds.data !== "Leider ist ein Fehler aufgetretten" ? (
              classifieds.data.map((item: any, index: any) => {
                return <Tile key={index} classifieds={item} />;
              })
            ) : (
              <p>Leider sind derzeit keine Anzeigen Online</p>
            )}
          </div>
          <Pagination
            pages={pages}
            activePage={activePage}
            onPageChange={handleClick}
          />
        </div>
      </div>
    </>
  );
}
