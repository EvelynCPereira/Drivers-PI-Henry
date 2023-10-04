const {
  getNameTeamController,
} = require("../controllers/getNameTeamController");
const { getTeamsController } = require("../controllers/getTeamsController");
const getTeamsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const filteredDrivers = await getNameTeamController(name);
      res.status(200).json(filteredDrivers);
    } else {
      const allTeams = await getTeamsController();
      res.status(200).json(allTeams);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTeamsHandler };
