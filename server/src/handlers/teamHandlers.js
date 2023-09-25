const getTeamsHandler = (req, res) => {
  res.status(200).send("Aqui estan todos los teams");
};

module.exports = { getTeamsHandler };
