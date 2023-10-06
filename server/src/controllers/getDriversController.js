const axios = require("axios");
const { Driver, Team } = require("../db");
const apiUrl = "http://localhost:5000/drivers";
const addImage = require("../helpers/addImage");

const getDriversController = async () => {
  const response = await axios.get(`${apiUrl}`);
  const allApi = addImage(response.data);
  const allDB = await Driver.findAll({
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
  return [...allDB, ...allApi];
};
module.exports = { getDriversController };
