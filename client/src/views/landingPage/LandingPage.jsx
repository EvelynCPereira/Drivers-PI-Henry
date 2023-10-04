import { Link } from "react-router-dom";
//import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div>
      <Link to="/home">
        <button>HOME</button>
      </Link>
    </div>
  );
}
export default LandingPage;
