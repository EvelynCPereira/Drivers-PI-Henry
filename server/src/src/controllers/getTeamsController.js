// const axios = require("axios");
// const { Team } = require("../db");

// const getTeamsController = async () => {
//   const apiUrl = "http://localhost:5000/drivers";

//   const datos = await Team.findAll();

//   if (datos.length === 0) {
//     const response = await axios.get(`${apiUrl}`);

//     let teams = [];

//     response.data.map((team) => teams.push(team.teams));

//     teams = teams
//       .filter((team) => team !== null)
//       .join("")
//       .split(",");

//     const uniqueteams = [...new Set(teams)];

//     const uniqueTeamsObject = uniqueteams.map((name) => ({ teamName: name }));
//     await Team.bulkCreate(uniqueTeamsObject);
//   }
// };

const { Team } = require("../db"); //*
const axios = require("axios");

const getTeamsController = async () => {
  const dbTeams = await Team.findAll();
  const cleanTeams = new Set();

  if (dbTeams.length === 0) {
    const allDrivers = [];
    const apiData = (await axios.get("http://localhost:5000/drivers")).data;
    apiData.map((driver) => allDrivers.push(driver.teams));

    apiData.forEach((driver) => {
      if (driver.teams) {
        // {teams:"reanult, ferrari"} --> [reanult],[ferrari]...
        const teamsArr = driver.teams.split(",").map((elem) => elem.trim()); // Divide y elimina espacios
        teamsArr.forEach((teamName) => {
          cleanTeams.add(teamName); // Agrega el team y no permite que se repita
        });
      }
    });
  }
  const teamsOK = Array.from(cleanTeams).map((nombre) => ({
    teamName: nombre,
  }));
  await Team.bulkCreate(teamsOK);
  return dbTeams;
};
module.exports = { getTeamsController };

// module.exports = {
//   getTeamsController,
// };
