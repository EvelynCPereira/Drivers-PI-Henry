import { Link } from "react-router-dom";

import styles from "./card.module.css";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.id}`} className={styles.Link}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={props.image?.url ? props.image?.url : props.image}
            alt={`imagen del corredor ${props.forename} ${props.surname}`}
          />
        </div>
        <div className={styles.info}>
          <p>
            Name: <span> {`${props.forename} ${props.surname}`}</span>
          </p>
          <p>
            DOB: <span>{props.dob}</span>
          </p>
          <p>
            Teams: <span>{props.teams}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
