import axios from "axios";
import {
  URL_API,
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
  SEARCH_TEAM,
  SET_PAGE,
  RESET_AUX,
} from "./actionsTypes";

export const setPage = (numPage) => {
  return { type: SET_PAGE, payload: numPage };
};

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_API}/drivers`);
      return dispatch({ type: GET_DRIVERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/drivers/${id}`);
      return dispatch({ type: GET_ID, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTeams = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/teams`);
      return dispatch({ type: GET_TEAMS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postDriver = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_API}/drivers`);
      return dispatch({ typer: POST_DRIVER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetDetail = () => {
  return { type: RESET_DETAIL, payload: [] };
};
export const resetAux = () => {
  return { type: RESET_AUX, payload: [] };
};
export const sortByAge = (order) => {
  return { type: SORT_BY_AGE, payload: order };
};

export const sortBySurname = (order) => {
  return { type: SORT_BY_SURNAME, payload: order };
};

export const filterByData = (filter) => {
  return { type: FILTER_BY_DATA, payload: filter };
};

export const filterByTeams = (team) => {
  return { type: FILTER_BY_TEAMS, payload: team };
};
export const searchTeam = (teamName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/teams/?name=${teamName}`);
      return dispatch({ type: SEARCH_TEAM, payload: data });
    } catch (error) {
      alert("Team not found. Try again please");
      console.log(error);
    }
  };
};

export const searchName = (surname) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/drivers/?name=${surname}`);
      return dispatch({ type: SEARCH_NAME, payload: data });
    } catch (error) {
      alert("Driver not found. Try again please");
      console.log(error);
    }
  };
};
//import axios from "axios";
// import {
//   URL_API,
//   GET_DRIVERS,
//   GET_TEAMS,
//   GET_DRIVERID,
//   POST_CREATEDRIV,
//   FILTER_BY_TEAM,
//   FILTER_ORDER_BY,
//   FILTER_DOB,
//   FILTER_BY_NAME,
//   // FILTER_DATA_ROUTE,
//   SET_PAGINATION_PAGE,
//   RESET_DETAIL,
// } from "./actionsTypes";

// export const getDrivers = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios(`${URL_API}/drivers`);

//       return dispatch({
//         type: GET_DRIVERS,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const getDriverId = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios(`${URL_API}/drivers/${id}`);

//       return dispatch({
//         type: GET_DRIVERID,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const resetDetail = () => {
//   return {
//     type: RESET_DETAIL,
//     payload: [],
//   };
// };

// export const getTeams = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios(`${URL_API}/teams`);
//       return dispatch({
//         type: GET_TEAMS,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const postDriver = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post(`${URL_API}/drivers`);

//       return dispatch({
//         type: POST_CREATEDRIV,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const filterByTeam = (team) => {
//   return {
//     type: FILTER_BY_TEAM,
//     payload: team,
//   };
// };

// export const filterByOrder = (orden) => {
//   return {
//     type: FILTER_ORDER_BY,
//     payload: orden,
//   };
// };

// export const filterByDOB = (orden) => {
//   return {
//     type: FILTER_DOB,
//     payload: orden,
//   };
// };

// export const filterDataRoute = (dataRoute) => {
//   return {
//     type: FILTER_DATA_ROUTE,
//     payload: dataRoute,
//   };
// };

// export const searchByName = (name) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios(`${URL_API}/drivers?name=${name}`);

//       return dispatch({
//         type: FILTER_BY_NAME,
//         payload: data,
//       });
//     } catch (error) {
//       alert("Driver not found");
//       console.log(error);
//     }
//   };
// };

// export const setPaginationPage = (pageNumber) => ({
//   type: SET_PAGINATION_PAGE,
//   payload: pageNumber,
// });
