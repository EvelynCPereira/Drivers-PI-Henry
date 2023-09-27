const axios = require("axios");
const apiUrl = "http://localhost:5000/drivers";
const { Team } = require("../db");

const getTeamsController = async () => {
  const response = await axios.get(`${apiUrl}`);
  const teamsFromAPI = response.data.map((driver) => {
    if (driver.hasOwnProperty("teams")) driver.teams;
  });

  teamsFromAPI.map((elem) => {
    if (elem.includes(",")) elem.split(",");
  });
  const allTeams = [];
  for (let i = 0; i < teamsFromAPI.length; i++) {
    if (!allTeams.includes(teamsFromAPI[i])) allTeams.push(teamsFromAPI[i]);
  }
  return Team.Create(allTeams);
};

module.exports = { getTeamsController };
