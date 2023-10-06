import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getId, resetDetail } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";

import styles from "./Detail.module.css";
const Detail = () => {
  const driver = useSelector((state) => state.detail);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getId(id));
    return () => {
      dispatch(resetDetail());
    };
  }, []);

  return (
    <div className={styles.containerDetail}>
      <div className={`${styles.contentDetail} container`}>
        <div className={styles.imageContainer}>
          <Link to="/home">
            <h5>Back</h5>
          </Link>
          <img src={driver.image} alt="" className={styles.image} />
        </div>
        <div className={styles.infoContainer}>
          <h1>
            Id: <span>{driver.id}</span>
          </h1>
          <h1>
            Nombre: <span>{driver.forename}</span>
          </h1>
          <h1>
            Apellido: <span>{driver.surname}</span>
          </h1>
          <h1>
            Nacionalidad: <span>{driver.nationality}</span>
          </h1>
          <h1>
            Nacimiento: <span>{driver.dob}</span>
          </h1>
          <h1>
            Teams: <span>{driver.teams ? driver.teams : driver.teamName} </span>
          </h1>
          <h1>
            Descripción: <p>{driver.description}</p>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Detail;
