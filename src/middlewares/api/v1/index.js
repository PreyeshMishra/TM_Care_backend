const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");

const swagger = require("../../../utils/swagger");
const modules = require("../../../modules");

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger.specs));
router.use("/version", modules.Version.routes);

router.use("/transmitters", modules.Transmitters.routes);
router.use("/proximity", modules.Proximity.routes);
router.use("/beacons", modules.Beacons.routes);
router.use("/physical-parameters", modules.PhysicalParameters.routes);

module.exports = router;
