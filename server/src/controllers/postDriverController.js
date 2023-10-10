const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Driver, Team } = require("../db");
const Op = Sequelize.Op;

const createDriver = async (
  forename,
  surname,
  image,
  description,
  nationality,
  dob,
  teamName
) => {
  console.log(image);
  const apiUrl = "http://localhost:5000/drivers";
  const toLowForname = forename.toLowerCase();
  const toLowSurname = surname.toLowerCase();
  const toLowNationality = nationality.toLowerCase();

  const filteredDB = await Driver.findAll({
    where: {
      forename: { [Op.iLike]: `%${toLowForname}%` },
      surname: { [Op.iLike]: `%${toLowSurname}%` },
      nationality: { [Op.iLike]: `%${toLowNationality}%` },
    },
  });

  const resp = await axios.get(`${apiUrl}`);
  const matchingObjects = resp.data.filter((obj) => {
    return (
      obj.name?.surname === forename &&
      obj.name?.lastname === surname &&
      obj.nationality === nationality &&
      obj.dob === dob
    );
  });
  console.log(matchingObjects);
  if (matchingObjects.length === 0 && filteredDB.length === 0) {
    const newDriver = await Driver.create({
      forename,
      surname,
      image,
      description,
      nationality,
      dob,
      teamName,
    });
    if (teamName) {
      const teamNames = teamName.split(", ");

      const searchTeam = await Team.findAll({
        where: { teamName: { [Op.in]: teamNames } },
      });
      const response = await newDriver.addTeam(searchTeam);
      return newDriver;
    }
  } else throw new Error("That driver already exists");
};
module.exports = { createDriver };
