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

  const filteredDB = await Driver.findAll({
    where: { surname: { [Op.iLike]: `%${nameToLower}%` } },
    include: [
      {
        model: Team,
        as: "Teams",
        attributes: ["id", "teamName"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (filteredDrivers.length === 0 && filteredDB.length === 0) {
    throw Error("No se encontraron drivers.");
  }

  const challengedFilters = addImage(filteredDrivers);

  return [...challengedFilters.slice(0, 15), ...filteredDB.slice(0, 15)];
};

module.exports = { getNameController };
