const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Driver, Team } = require("../db");
const Op = Sequelize.Op;

const createDriver = async (
  forename,
  surname,
  description,
  nationality,
  dob,
  teamName
) => {
  const apiUrl = "http://localhost:5000/drivers";
  const toLowForname = forename.toLowerCase();
  const toLowSurname = surname.toLowerCase();
  const toLowNationality = nationality.toLowerCase();
  const toLowDob = dob.toLowerCase();

  const filteredDB = await Driver.findAll({
    where: {
      forename: { [Op.iLike]: `%${toLowForname}%` },
      surname: { [Op.iLike]: `%${toLowSurname}%` },
      nationality: { [Op.iLike]: `%${toLowNationality}%` },
      dob: { [Op.iLike]: `%${toLowDob}%` },
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

  if (matchingObjects.length === 0 && filteredDB.length === 0) {
    const newDriver = await Driver.create({
      forename,
      surname,
      description,
      image:
        "https://img.freepik.com/foto-gratis/coche-deportivo-brillante-conduciendo-pista-deportiva-iluminada-ia-generativa_188544-53590.jpg",
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
    return newDriver;
  } else throw Error("Ya existe el driver");
};
module.exports = { createDriver };
