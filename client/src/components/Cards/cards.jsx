import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, setPage } from "../../redux/actions/actions";
import Card from "../Card/card";
import Pagination from "../Pagination/pagination";

import styles from "./cards.module.css";

function Cards() {
  const [perPage, setPerPage] = useState(9);
  const { allDrivers, aux, page } = useSelector((state) => state);
  const dispatch = useDispatch();
  const selectDrivers = aux?.length === 0 ? allDrivers : aux;
  const startIndex = (page - 1) * perPage;
  const endIndex = perPage * page;
  const showDrivers = selectDrivers.slice(startIndex, endIndex); //0=> 2-1 *9 = 9
  const totalPages = Math.ceil(selectDrivers.length / perPage);

  const handleNext = () => {
    if (page !== totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };
  //   const driversFiltered =
  //     driversByTeams.length !== 0
  //       ? driversByTeams.slice(startIndex, endIndex).filter((driver) => {
  //           if (dataRouteFilter === "") {
  //             return true;
  //           } else if (dataRouteFilter === "api") {
  //             return typeof driver.id === "number";
  //           } else if (dataRouteFilter === "database") {
  //             return typeof driver.id === "string";
  //           } else {
  //             return true;
  //           }
  //         })
  //       : drivers.slice(startIndex, endIndex).filter((driver) => {
  //           if (dataRouteFilter === "") {
  //             return true;
  //           } else if (dataRouteFilter === "api") {
  //             return typeof driver.id === "number";
  //           } else if (dataRouteFilter === "database") {
  //             return typeof driver.id === "string";
  //           } else {
  //             return true;
  //           }
  //         });

  useEffect(() => {
    dispatch(getDrivers());
  }, []);
  return (
    <div className="container">
      <Pagination
        handleNext={handleNext}
        handlePrev={handlePrev}
        page={page}
        totalPages={totalPages}
      />
      <div className={styles.cardCont}>
        {showDrivers?.map((driver) => (
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
              driver.teams
                ? driver.teams
                : driver?.Teams?.map((team) => team.teamName).join(", ")
            }
            image={driver.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
