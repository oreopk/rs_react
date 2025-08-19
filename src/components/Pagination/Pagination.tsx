"use client";

import "./Pagination.css";
import Button from "../Button/Button";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";

interface PaginationProps {
  planetsPerPage: number;
  totalPlanets: number;
  currentPage: number;
  searchQuery: string;
  refetch: () => object;
}

export default function Pagination({
  planetsPerPage,
  totalPlanets,
  currentPage,
  searchQuery,
  refetch,
}: PaginationProps): React.ReactElement {
  const pageNumbers = [];
  const { planetId } = useParams();
  for (let i = 1; i <= Math.ceil(totalPlanets / planetsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => {
        let query = {};
        if (searchQuery) {
          query = { search: searchQuery };
        }
        if (planetId) {
          return (
            <Link
              href={{
                pathname: "/list/[pageNumber]/[planetId]",
                params: {
                  pageNumber: String(number),
                  planetId: String(planetId),
                },
                query,
              }}
              className={`pagination-button ${number === currentPage ? "active" : ""}`}
              key={number}
              type="button"
            >
              {number}
            </Link>
          );
        } else {
          return (
            <Link
              href={{
                pathname: "/list/[pageNumber]",
                params: { pageNumber: String(number) },
                query,
              }}
              className={`pagination-button ${number === currentPage ? "active" : ""}`}
              key={number}
              type="button"
            >
              {number}
            </Link>
          );
        }
      })}
      <Button onClick={() => refetch()}>{"Refetch"}</Button>
    </div>
  );
}
