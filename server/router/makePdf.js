const express = require("express");
const router = express.Router();
const { getPdf } = require("../controllers/makePdf");
const { getPatientById } = require("../controllers/patient");

router.param("ptId", getPatientById);
router.get("/pdf/:ptId", getPdf);

module.exports = router;
