const server = require("./src/server");
const { conn } = require("./src/db.js");
const { getTeamsController } = require("./src/controllers/getTeamsController");
const PORT = 3001;

conn
  .sync({ alter: true })
  .then(async () => {
    await getTeamsController();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
