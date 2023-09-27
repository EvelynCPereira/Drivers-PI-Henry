const { createDriver } = require("../controllers/postDriverController");
const { getDriversController } = require("../controllers/getDriversController");
const { getNameController } = require("../controllers/getNameController");
const getDriversHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const filteredDrivers = await getNameController(name);
      res.status(200).json(filteredDrivers);
    } else {
      const allDrivers = await getDriversController();
      res.status(200).json(allDrivers);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetailHandler = (req, res) => {
  res.status(200).send("Aqui esta el detail");
};

const postDriversHandler = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, team } =
    req.body;
  try {
    created = await createDriver(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      team
    );
    res.status(200).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getDetailHandler,
  getDriversHandler,
  postDriversHandler,
};
