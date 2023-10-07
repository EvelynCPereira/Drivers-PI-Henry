import {
  GET_DRIVERS,
  GET_ID,
  GET_TEAMS,
  POST_DRIVER,
  RESET_DETAIL,
  SORT_BY_AGE,
  SORT_BY_SURNAME,
  FILTER_BY_DATA,
  FILTER_BY_TEAMS,
  SEARCH_NAME,
  SET_PAGE,
  RESET_AUX,
} from "./actions/actionsTypes";
const initialState = {
  allDrivers: [],
  copy: [],
  allTeams: [],
  detail: [],
  aux: [],
  page: 1,
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: payload,
      };
    case SET_PAGE:
      return { ...state, page: payload };
    case GET_ID:
      return {
        ...state,
        detail: payload,
      };
    case RESET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    case RESET_AUX:
      return {
        ...state,
        aux: payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: payload,
      };
    case SORT_BY_AGE:
      const arr = state.aux.length > 0 ? state.aux : state.allDrivers;
      const orderDob = arr.slice().sort((a, b) => {
        const yearA = parseInt(a.dob.substring(0, 4));
        const yearB = parseInt(b.dob.substring(0, 4));

        if (payload === "asc") {
          return yearA - yearB;
        } else if (payload === "desc") {
          return yearB - yearA;
        }

        return 0;
      });
      return {
        ...state,
        aux: orderDob,
      };
    case SORT_BY_SURNAME:
      const array = state.aux.length > 0 ? state.aux : state.allDrivers;
      const order = array.slice().sort((a, b) => {
        const surnameA = a.name?.surname || a.surname || "";
        const surnameB = b.name?.surname || b.surname || "";

        if (payload === "asc") {
          return surnameA.localeCompare(surnameB);
        } else if (payload === "desc") {
          return surnameB.localeCompare(surnameA);
        }

        return 0;
      });

      console.log(order);
      return {
        ...state,
        aux: order,
      };
    case FILTER_BY_DATA:
      if (payload === "All") {
        if (state.aux.length === 0) {
          console.log("all  " + state.allDrivers);
          return { ...state, ...state.allDrivers };
        } else {
          console.log("all  " + state.aux);

          return { ...state, ...state.aux };
        }
      } else if (payload === "DataBase") {
        const db = [];
        if (state.aux.length === 0) {
          for (const driver of state.allDrivers) {
            if (typeof driver.id !== "number") {
              db.push(driver);
            }
          }
        } else {
          for (const driver of state.aux) {
            if (typeof driver.id !== "number") {
              db.push(driver);
            }
          }
        }
        console.log("db" + db);
        return { ...state, aux: db };
      } else if (payload === "Api") {
        const api = [];
        if (state.aux.length === 0) {
          for (const driver of state.allDrivers) {
            if (typeof driver.id === "number") {
              api.push(driver);
            }
          }
        } else {
          for (const driver of state.aux) {
            if (typeof driver.id === "number") {
              api.push(driver);
            }
          }
        }
        console.log("api " + api);

        return { ...state, aux: api };
      }
    case FILTER_BY_TEAMS:
      if (state.aux.length === 0) {
        const filterTeam = state.allDrivers.filter((driver) => {
          if (driver.teams) {
            return driver.teams?.includes(payload);
          } else if (driver.Teams) {
            return driver?.Teams?.map((team) => team.teamName)
              .join(", ")
              .includes(payload);
          }
        });
        return { ...state, aux: filterTeam };
      } else {
        const filterTeam = state.aux.filter((driver) => {
          if (driver.teams) {
            return driver.teams?.includes(payload);
          } else if (driver.Teams) {
            return driver?.Teams?.map((team) => team.teamName)
              .join(", ")
              .includes(payload);
          }
        });
        if (filterTeam.length === 0) {
          return state;
        }
        return { ...state, aux: filterTeam };
      }
    case SEARCH_NAME:
      return {
        ...state,
        aux: payload,
      };
    case POST_DRIVER:
      return { ...state };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
