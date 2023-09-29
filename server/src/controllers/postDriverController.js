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
  const teamNames = teamName.split(", ");
  const searchTeam = await Team.findAll({
    where: { teamName: { [Op.in]: teamNames } },
  });
  const response = await newDriver.addTeam(searchTeam);
  return newDriver;
};
module.exports = { createDriver };
