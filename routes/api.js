const router = require("express").Router();
const apiController = require("../controllers/apiController");
const restrict = require("../middlewares/restrict-jwt");

router.post("/v1/register", apiController.signUp);
router.post("/v1/login", apiController.signIn);
router.get("/v1/whoami", restrict, apiController.whoAmi);

router.post("/generate/:id", apiController.createRoom);
router.get("/generate/:playerOneId", apiController.viewDataRoom);
router.post("/room_id", apiController.joinRoom);

module.exports = router;
