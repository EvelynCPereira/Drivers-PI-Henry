const axios = require("axios");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const addImage = require("../helpers/addImage");
const { Driver, Team, driver_team } = require("../db");
const apiUrl = "http://localhost:5000/drivers";

const getNameController = async (name) => {
  const response = await axios.get(`${apiUrl}`);
  const nameToLower = name.toLowerCase();
  const filteredDrivers = response.data.filter((driver) =>
    driver.driverRef.toLowerCase().includes(nameToLower)
  );
  //Guarda a todos los drivers que coinciden con el nombre en DB
  const filteredDB = await Driver.findAll({
    where: { surname: { [Op.iLike]: `%${nameToLower}%` } },
  });
  // ... Tu código previo ...

  // Recorrer cada objeto de conductor en filteredDB y agregar el equipo correspondiente
  const driverAddTeam = [];

  for (const driver of filteredDB) {
    const driverId = driver.id;

    // Buscar la relación driver_team para el conductor actual
    const driverTeams = await driver_team.findAll({
      where: { DriverId: driverId },
    });

    // Obtener los IDs de los equipos relacionados con el conductor
    const teamIds = driverTeams.map((team) => team.TeamId);

    // Buscar los equipos correspondientes en la tabla Team
    const teamDB = await Team.findAll({
      where: { id: { [Op.in]: teamIds } },
    });

    // Obtener los nombres de los equipos y unirlos en una cadena
    const teamNames = teamDB.map((team) => team.teamName).join(", ");

    /// Convertir el objeto de Sequelize en JSON simple
    const driverJson = driver.toJSON();

    // Agregar el nombre del equipo al objeto JSON
    driverJson.teamName = teamNames;

    // Agregar el objeto JSON al arreglo driverAddTeam
    driverAddTeam.push(driverJson);
  }

  console.log(driverAddTeam); // Verifica si los objetos tienen la propiedad teamName

  if (filteredDrivers.length === 0 && driverAddTeam.length === 0) {
    throw Error("No se encontraron drivers.");
  }

  const challengedFilters = addImage(filteredDrivers);

  return [...challengedFilters.slice(0, 15), ...driverAddTeam.slice(0, 15)];
};

module.exports = { getNameController };

//   if (filteredDrivers.length === 0 && filteredDB.length === 0) {
//     throw Error("No se encontraron drivers.");
//   }
//   const challengedFilters = addImage(filteredDrivers);

//   return [...challengedFilters.slice(0, 15), ...filteredDB.slice(0, 15)];
// };

// //Guarda todos los id de cada driver
// const id = filteredDB.map((driver) => driver.id);
// //Guarda los objetos de la DB relacional que coinciden con con los id driver
// const driverTeams = await driver_team.findAll({
//   where: { DriverId: { [Op.in]: id } },
// });
// //Guarda los id de cada team de la tabla relacional
// const teamIds = driverTeams.map((team) => team.TeamId);

// //Guarda todos los teams encontrados en DB Team
// const teamDB = await Team.findAll({
//   where: { id: { [Op.in]: teamIds } },
// });
// //Crea cadena de string con cada team encontrado
// const teamString = teamDB.map((team) => team.teamName).join(", ");

// const filteredDBok = filteredDB.map((driver) => ({ ...driver, teamName: teamString }))
