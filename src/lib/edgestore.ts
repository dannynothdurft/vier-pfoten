/* 
    File: edgestore.ts
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import { type EdgeStoreRouter } from "../app/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";
const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();
export { EdgeStoreProvider, useEdgeStore };
