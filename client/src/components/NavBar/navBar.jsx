import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./navBar.module.css";
const NavBar = () => {
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
        </div>
        <SearchBar />
      </nav>
    </div>
  );
};

export default NavBar;