import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getDrivers,
  getTeams,
  filterByTeams,
  filterByData,
  sortBySurname,
  sortByAge,
  setPage,
  resetAux,
} from "../../redux/actions/actions";

import styles from "./filters.module.css";

const Filters = () => {
  const teams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();
  const sortedTeams = teams
    .slice()
    .sort((a, b) => a.teamName.localeCompare(b.teamName));
  useEffect(() => {
    dispatch(getTeams());
  }, []);
  const handleTeamsFilter = (event) => {
    const team = event.target.value;
    dispatch(filterByTeams(team));
  };

  const handleOrderBy = (event) => {
    const { value } = event.target;
    dispatch(sortBySurname(value));
  };

  const handleOrderDOB = (event) => {
    const { value } = event.target;
    dispatch(sortByAge(value));
  };

  const handleDataRoute = (event) => {
    const { value } = event.target;
    // setDataRouteFilter(value)
    dispatch(filterByData(value));
    dispatch(setPage(1));
  };

  const handleReset = () => {
    dispatch(setPage(1));
    dispatch(getDrivers());
    dispatch(resetAux());

    document.getElementById("teamsFilter").selectedIndex = 0;
    document.getElementById("orderByFilter").selectedIndex = 0;
    document.getElementById("orderDOBFIlter").selectedIndex = 0;
    document.getElementById("dataRouteFilter").selectedIndex = 0;

    dispatch(filterByTeams([]));
  };

  return (
    <div>
      <div className={`${styles.containerFilters} container`}>
        <select
          id="teamsFilter"
          defaultValue={"default"}
          onChange={handleTeamsFilter}
        >
          <option value="default">Teams</option>
          {sortedTeams?.map((team) => (
            <option key={team.id} value={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>

        <select
          id="orderByFilter"
          defaultValue={"default"}
          onChange={handleOrderBy}
        >
          <option value="default">Order</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select
          id="orderDOBFIlter"
          defaultValue={"default"}
          onChange={handleOrderDOB}
        >
          <option value="default">DOB</option>
          <option value="asc">Older to younger</option>
          <option value="desc">Younger to older</option>
        </select>

        <select
          id="dataRouteFilter"
          defaultValue={"default"}
          onChange={handleDataRoute}
        >
          <option value="">-Data Route-</option>
          <option value="All">All</option>
          <option value="Api">API</option>
          <option value="DataBase">Database</option>
        </select>

        <button onClick={handleReset} className={`btn btnPrimary`}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default Filters;
