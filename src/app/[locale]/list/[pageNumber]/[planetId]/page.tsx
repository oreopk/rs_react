"use client";
import List_and_detail from "../List_and_detail";
import PlanetCard from "./PlanetCard";
export default function Page() {
  return <List_and_detail right={<PlanetCard />} />;
}
