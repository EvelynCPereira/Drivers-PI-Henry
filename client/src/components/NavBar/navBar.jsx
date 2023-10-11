import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";
import styles from "./navBar.module.css";
import logo from "../../assets/logo.png";
const NavBar = () => {
  const location = useLocation();

  return (
    <div className={styles.navCont}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <img src={logo} className={styles.logo} alt="Logo" />
        </div>
        <div className={styles.centeredLinks}>
          <Link to="/home" className={styles.link}>
            HOME
          </Link>
          <Link to="/create" className={styles.link}>
            CREATE DRIVER
          </Link>
        </div>
        <div className={styles.searchBarContainer}>
          {location.pathname === "/home" && <SearchBar />}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
