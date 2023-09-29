const axios = require("axios");
const { Team } = require("../db");

const getTeamsController = async () => {
  const apiUrl = "http://localhost:5000/drivers";

  const datos = await Team.findAll();

  if (datos.length === 0) {
    const response = await axios.get(`${apiUrl}`);

    let teams = [];

    response.data.map((team) => teams.push(team.teams));

    teams = teams
      .filter((team) => team !== null)
      .join("")
      .split(", ");

    const uniqueteams = [...new Set(teams)];

    const uniqueTeamsObject = uniqueteams.map((name) => ({ teamName: name }));
    await Team.bulkCreate(uniqueTeamsObject);
  }
};

module.exports = {
  getTeamsController,
};
