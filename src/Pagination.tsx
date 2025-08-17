import { NavLink } from "react-router-dom";
import "./Pagination.css";
import { useParams } from "react-router-dom";
import Button from "./components/Button/Button";

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
      {pageNumbers.map((number) => (
        <NavLink
          to={`/list/${number}${planetId ? `/${planetId}` : ""}?search=${searchQuery}`}
          className={`pagination-button ${number === currentPage ? "active" : ""}`}
          key={number}
          type="button"
        >
          {number}
        </NavLink>
      ))}
      <Button onClick={() => refetch()}>{"Refetch"}</Button>
    </div>
  );
}
