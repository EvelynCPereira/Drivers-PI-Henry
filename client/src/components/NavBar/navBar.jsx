import { Link, useLocation } from "react-router-dom";

import SearchBar from "../SearchBar/searchBar";
import styles from "./navBar.module.css";
const NavBar = () => {
  const location = useLocation();

  return (
    <div className={styles.navContainer}>
      <nav className={`${styles.nav} container`}>
        <div>
          <img />
        </div>
        <div>
          <Link to="/home" className={styles.linkHeader}>
            HOME
          </Link>
          <Link to="/create" className={styles.linkHeader}>
            CREATE DRIVER
          </Link>
          {location.pathname === "/home" && <SearchBar />}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
