const { createDriver } = require("../controllers/postDriverController");
const { getDriversController } = require("../controllers/getDriversController");
const { getNameController } = require("../controllers/getNameController");
const getIdController = require("../controllers/getIdController");
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

const getDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const getId = await getIdController(id);
      res.status(200).json(getId);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postDriversHandler = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, teamName } =
    req.body;
  try {
    const created = await createDriver(
      forename,
      surname,
      image,
      description,
      nationality,
      dob,
      teamName
    );
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getDetailHandler,
  getDriversHandler,
  postDriversHandler,
};
