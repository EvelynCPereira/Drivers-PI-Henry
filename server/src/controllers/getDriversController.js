const axios = require("axios");
const apiUrl = "http://localhost:5000/drivers";
const addImage = require("../helpers/addImage");

const getDriversController = async () => {
  const response = await axios.get(`${apiUrl}`);
  return addImage(response.data);
};

module.exports = { getDriversController };
