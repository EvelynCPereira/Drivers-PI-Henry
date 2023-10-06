// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { searchByName } from "../../redux/actions/actions";
// import styles from "./searchBar.module.css";
// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [nameToFilter, setNameToFilter] = useState("");

//   const handleSearch = () => {
//     if (!nameToFilter || !isNaN(nameToFilter))
//       return alert("Ingresa un nombre valido");
//     dispatch(searchByName(nameToFilter));
//   };

//   const handleChange = (event) => {
//     setNameToFilter(event.target.value);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div className={styles.containerSearch}>
//       <input
//         type="text"
//         value={nameToFilter}
//         onKeyDown={handleKeyDown}
//         onChange={handleChange}
//         placeholder="Ingrese un nombre"
//         className={styles.inputSearch}
//       />
//       <button
//         onClick={handleSearch}
//         className={`${styles.btnSearch} btn btnPrimary`}
//       >
//         Buscar
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
