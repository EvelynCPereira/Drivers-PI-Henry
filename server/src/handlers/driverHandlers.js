const getDriversHandler = (req, res) => {
  const { name } = req.query;
  if (name) {
    res.status(200).send("Aqui esta el driver por name");
  } else {
    res.status(200).send("Aqui estan todos los drivers");
  }
};

const getDetailHandler = (req, res) => {
  res.status(200).send("Aqui esta el detail");
};

const postDriversHandler = (req, res) => {
  res.status(200).send("driver creado");
};
module.exports = {
  getDetailHandler,
  getDriversHandler,
  postDriversHandler,
};
