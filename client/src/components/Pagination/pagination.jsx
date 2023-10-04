import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaginationPage } from "../../redux/actions/actions";

import styles from "./pagination.module.css";

function Pagination() {
  const drivers = useSelector((state) => state.drivers);
  const driversByTeams = useSelector((state) => state.driversByTeams);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  const driversPerPage = 9;
  const driversFiltered =
    driversByTeams.length !== 0 ? driversByTeams : drivers;

  const totalPages = Math.ceil(driversFiltered.length / driversPerPage);

  useEffect(() => {
    dispatch(setPaginationPage(1));
  }, [totalPages]);

  const handleClick = (pageNumber) => {
    dispatch(setPaginationPage(pageNumber));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPaginationPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPaginationPage(currentPage + 1));
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 10;
    const maxMiddlePages = Math.floor(maxDisplayedPages / 2);
    let startPage = Math.max(1, currentPage - maxMiddlePages);
    const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

    if (endPage - startPage < maxDisplayedPages - 1) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.containerPaginado}>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Anterior
      </button>
      <div className={styles.buttonsPaginado}>{renderPageNumbers()}</div>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
