import "./Pagination.css";

interface PaginationProps {
  planetsPerPage: number;
  totalPlanets: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function Pagination({
  planetsPerPage,
  totalPlanets,
  paginate,
  currentPage,
}: PaginationProps): React.ReactElement {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPlanets / planetsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => (
        <button
          className={`pagination-button ${number === currentPage ? "active" : ""}`}
          key={number}
          type="button"
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
