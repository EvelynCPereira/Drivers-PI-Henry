const { Router } = require("express");
const driverRouters = require("./driverRoutes");
const teamRouters = require("./teamRouters");
const router = Router();

router.use("/drivers", driverRouters);
router.use("/teams", teamRouters);

module.exports = router;
