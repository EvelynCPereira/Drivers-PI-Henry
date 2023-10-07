import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.button}>HOME</button>
      </Link>
    </div>
  );
}
export default LandingPage;
