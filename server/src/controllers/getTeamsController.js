const { Team } = require("../db");
const axios = require("axios");

const getTeamsController = async () => {
  const cleanTeams = new Set(); // Para que los teams no se repitan
  // Trae Teams de la bd
  const dbTeams = await Team.findAll();
  //-------------------------------
  if (dbTeams.length === 0) {
    // Si la bd está vacía
    const allDrivers = [];
    const apiData = (await axios.get("http://localhost:5000/drivers")).data; // Trae Drivers de la Api
    //---------
    allDrivers.push(...apiData); // Guarda los Drivers de la Api
    //-------------------------------
    // Trae los 'Teams' de los Drivers
    const allTeams = await Promise.all(
      allDrivers.map(async (driver) => {
        return {
          teams: driver.teams,
        };
      })
    ); // --> Acá tengo: [{teams:","}, {teams:", ,"}...}]
    // |-> Array de objetos, donde cada objeto tiene una propiedad 'teams' que es un string de 1 o más teams
    //-------------------------------
    // Necesito separar los teams y verificar que no estén repetidos para guardarlos
    allTeams.forEach((driver) => {
      if (driver.teams) {
        // {teams:"reanult,ferrari"} --> [reanult],[ferrari]...
        const teamsArr = driver.teams.split(",").map((elem) => elem.trim()); // Divide y elimina espacios
        teamsArr.forEach((teamName) => {
          cleanTeams.add(teamName); // Agrega el team y no permite que se repita
        });
      }
    });
  }
  //-------------------------------
  // Se convierte en array y se crea un objeto por cada team
  const teamsOK = Array.from(cleanTeams).map((teamName) => ({
    teamName: teamName,
  }));
  // Inserta registros en la bd
  await Team.bulkCreate(teamsOK);
  //-------------------------------
  return dbTeams;
};
module.exports = { getTeamsController };

// const axios = require('axios');
// const {Temperaments} = require('../db')

// const getAllTemps = async () => {

//     const datos = await Temperaments.findAll();

//     if (datos.length === 0) {

//         const response = await axios.get('https://api.thedogapi.com/v1/breeds');

//         let temps = [];

//         response.data.map((dog) => temps.push(dog.temperament) )

//         temps = temps.filter(temp => temp !== null).join("").split(", ");

//         const uniqueTemps = [...new Set(temps)];

//         const uniqueTempsObject = uniqueTemps.map((name) => ({name: name}));
//         await Temperaments.bulkCreate(uniqueTempsObject)
//     }

// };

// module.exports ={
//     getAllTemps,
// }
