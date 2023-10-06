import styles from "./pagination.module.css";

function Pagination({ handleNext, handlePrev, totalPages, page }) {
  return (
    <div className={styles.containerPaginado}>
      {page > 1 && <button onClick={handlePrev}>Anterior</button>}
      {page !== totalPages && <button onClick={handleNext}>Siguiente</button>}
    </div>
  );
}

export default Pagination;
