const { Driver } = require("../db");

const createDriver = async (
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  team
) => {
  return await Driver.create({
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
    team,
  });
};
module.exports = { createDriver };
