const axios = require("axios");
const addImage = require("../helpers/addImage");
const apiUrl = "http://localhost:5000/drivers";
const { Driver } = require("../db");

const getNameController = async (name) => {
  const response = await axios.get(`${apiUrl}`);

  const filteredDrivers = response.data.filter((driver) =>
    driver.driverRef.toLowerCase().includes(name.toLowerCase())
  );

  const filteredDB = await Driver.findAll({ where: { surname: name } });
  if (filteredDrivers.length === 0 && filteredDB.length === 0) {
    throw Error("No se encontraron drivers.");
  }
  const challengedFilters = addImage(filteredDrivers);

  return [...challengedFilters.slice(0, 15), ...filteredDB];
};

module.exports = { getNameController };
