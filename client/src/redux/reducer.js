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
          return { ...state, ...state.allDrivers };
        } else {
          return { ...state, ...state.aux };
        }
      } else if (payload === "DataBase") {
        const db = [];
        if (state.aux.length === 0) {
          for (const objeto of state.allDrivers) {
            if (isNaN(objeto.id)) {
              db.push(objeto);
            }
          }
        } else {
          for (const objeto of state.aux) {
            if (isNaN(objeto.id)) {
              db.push(objeto);
            }
          }
        }
        return { ...state, aux: db };
      } else if (payload === "Api") {
        const api = [];
        if (state.aux.length === 0) {
          for (const objeto of state.allDrivers) {
            if (!isNaN(objeto.id)) {
              api.push(objeto);
            }
          }
        } else {
          for (const objeto of state.aux) {
            if (!isNaN(objeto.id)) {
              api.push(objeto);
            }
          }
        }
        return { ...state, aux: api };
      }
    case FILTER_BY_TEAMS:
      if (state.aux.length === 0) {
        const filterTeam = state.allDrivers.filter((driver) => {
          if (driver.teams) {
            return driver.teams?.includes(payload);
          } else if (driver.teamName) {
            return driver.teamName?.includes(payload);
          }
        });
        return { ...state, aux: filterTeam };
      } else {
        const filterTeam = state.aux.filter((driver) => {
          if (driver.teams) {
            return driver.teams?.includes(payload);
          } else if (driver.teamName) {
            return driver.teamName?.includes(payload);
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
// import {
//   GET_DRIVERS,
//   GET_TEAMS,
//   GET_DRIVERID,
//   FILTER_BY_TEAM,
//   FILTER_ORDER_BY,
//   FILTER_DOB,
//   FILTER_BY_NAME,
//   FILTER_DATA_ROUTE,
//   SET_PAGINATION_PAGE,
//   POST_CREATEDRIV,
//   RESET_DETAIL,
// } from "./actions/actionsTypes";

// // Defino el estado inicial del reducer, con propiedades iniciales y valores predeterminados.
// const initialState = {
//   drivers: [], // Almacena la lista de conductores.
//   teams: [], // Almacena la lista de equipos.
//   driversByTeams: [], // Almacena la lista de conductores filtrada por equipo.
//   driverDetail: [], // Almacena los detalles de un conductor específico.
//   currentPage: 1, // Almacena el número de página actual para la paginación.
//   totalPages: 0, // Almacena el número total de páginas en la paginación.
//   dataRouteFilter: "", // Almacena el filtro de fuente de datos seleccionado.
// };

// // Defino el reducer, que toma un estado inicial y una acción como argumentos.
// const rootReducer = (state = initialState, { type, payload }) => {
//   // Determina qué propiedad de estado se usa para aplicar los filtros, dependiendo de si se ha aplicado un filtro de equipo.
//   const filterState =
//     state.driversByTeams.length !== 0 ? "driversByTeams" : "drivers";

//   // Obtengo la lista de conductores actual basada en si se aplicó un filtro de equipo o no.
//   const $drivers =
//     state.driversByTeams.length !== 0 ? state.driversByTeams : state.drivers;

//   // Evalua el tipo de acción que se está procesando y actualiza el estado en consecuencia.
//   switch (type) {
//     case GET_DRIVERS:
//       return {
//         ...state,
//         drivers: payload, // Actualiza la lista de conductores en el estado con los datos proporcionados.
//       };

//     case GET_TEAMS:
//       return {
//         ...state,
//         teams: payload, // Actualiza la lista de equipos en el estado con los datos proporcionados.
//       };

//     case GET_DRIVERID:
//       return {
//         ...state,
//         driverDetail: payload, // Actualiza los detalles del conductor en el estado con los datos proporcionados.
//       };

//     case RESET_DETAIL:
//       return {
//         ...state,
//         driverDetail: payload, // Restablece los detalles del conductor en el estado en un valor vacío.
//       };

//     case FILTER_BY_TEAM:
//       // Filtra los conductores por equipo en función del equipo seleccionado en el filtro.
//       const filtroTeams = state.drivers.filter((driver) =>
//         driver.teams?.includes(payload)
//       );
//       return {
//         ...state,
//         driversByTeams: filtroTeams, // Actualiza la lista de conductores filtrada por equipo en el estado.
//       };

//     case FILTER_ORDER_BY:
//       // Ordena la lista de conductores en función de la opción de orden seleccionada
//       const ordenar = [...$drivers].sort((a, b) => {
//         if (payload === "asc") {
//           if (
//             a.name?.surname
//               ? a.name?.surname
//               : a.surname > b.name?.surname
//               ? b.name?.surname
//               : b.surname
//           ) {
//             return 1;
//           }
//           if (
//             a.name?.surname
//               ? a.name?.surname
//               : b.surname < b.name?.surname
//               ? b.name?.surname
//               : b.surname
//           ) {
//             return -1;
//           }
//         } else if (payload === "desc") {
//           if (
//             a.name?.surname
//               ? a.name?.surname
//               : a.surname > b.name?.surname
//               ? b.name?.surname
//               : b.surname
//           ) {
//             return -1;
//           }
//           if (
//             a.name?.surname
//               ? a.name?.surname
//               : a.surname < b.name?.surname
//               ? b.name?.surname
//               : b.surname
//           ) {
//             return 1;
//           }
//         }
//         return 0;
//       });
//       return {
//         ...state,
//         [filterState]: ordenar, // Actualizamos la lista de conductores en el estado con la lista ordenada.
//       };

//     case FILTER_DOB:
//       // Ordenamos la lista de conductores en función de la fecha de nacimiento en orden ascendente o descendente.
//       const ordenDob = [...$drivers].sort((a, b) => {
//         const yearA = parseInt(a.dob.substring(0, 4));
//         const yearB = parseInt(b.dob.substring(0, 4));

//         if (payload === "asc") {
//           return yearA - yearB;
//         } else if (payload === "desc") {
//           return yearB - yearA;
//         }

//         return 0;
//       });
//       return {
//         ...state,
//         [filterState]: ordenDob, // Actualizamos la lista de conductores en el estado con la lista ordenada por DOB.
//       };

//     case FILTER_DATA_ROUTE:
//       // if (payload === "ALL"){
//       //   return{...state, dataRouteFilter: payload}
//       // }else if(payload ==="API"){}
//       //   return{

//       //   }
//       return {
//         ...state,
//         dataRouteFilter: payload, // Actualizamos el filtro de fuente de datos en el estado.
//       };

//     case FILTER_BY_NAME:
//       return {
//         ...state,
//         [filterState]: payload, // Actualizamos la lista de conductores en el estado con la lista filtrada por nombre.
//       };

//     case SET_PAGINATION_PAGE:

//       return {
//         ...state,
//         currentPage: payload, // Actualizamos la página actual de la paginación en el estado.
//       };
//       case POST_CREATEDRIV:
//         return{
//           ...state,

//         }
//     default:
//       return state; // Devolvemos el estado sin cambios si la acción no coincide con ninguna de las anteriores.
//   }
// };

// export default rootReducer; // Exportamos el reducer para su uso en la aplicación Redux.
