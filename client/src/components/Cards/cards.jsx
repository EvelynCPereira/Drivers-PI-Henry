import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../redux/actions/actions";
import Card from "../Card/card";
import Pagination from "../Pagination/pagination";

import styles from "./cards.module.css";

function Cards() {
  const drivers = useSelector((state) => state.drivers);
  const driversByTeams = useSelector((state) => state.driversByTeams);
  const dataRouteFilter = useSelector((state) => state.dataRouteFilter);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  const driversPerPage = 9;
  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;

  const driversFiltered =
    driversByTeams.length !== 0
      ? driversByTeams.slice(startIndex, endIndex).filter((driver) => {
          if (dataRouteFilter === "") {
            return true;
          } else if (dataRouteFilter === "api") {
            return typeof driver.id === "number";
          } else if (dataRouteFilter === "database") {
            return typeof driver.id === "string";
          } else {
            return true;
          }
        })
      : drivers.slice(startIndex, endIndex).filter((driver) => {
          if (dataRouteFilter === "") {
            return true;
          } else if (dataRouteFilter === "api") {
            return typeof driver.id === "number";
          } else if (dataRouteFilter === "database") {
            return typeof driver.id === "string";
          } else {
            return true;
          }
        });

  useEffect(() => {
    dispatch(getDrivers());
  }, [driversByTeams]);
  console.log(driversFiltered);
  console.log(driversFiltered.teamName);

  return (
    <div className="container">
      <Pagination />
      <div className={styles.cardContainer}>
        {driversFiltered?.map((driver) => (
          <Card
            key={driver.id}
            id={driver.id}
            forename={
              driver.name?.forename ? driver.name?.forename : driver.forename
            }
            surname={
              driver.name?.surname ? driver.name?.surname : driver.surname
            }
            dob={driver.dob}
            teams={
              driver.teams?.split(",").join(", ")
                ? driver.teams?.split(",").join(", ")
                : driver.teamName
            }
            image={driver.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
