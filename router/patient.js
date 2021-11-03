const express = require("express");
const router = express.Router();
const {
  savePatient,
  showpts,
  image,
  getPatientById,
  getPatient,
  incPatientId,
} = require("../controllers/patient");

router.param("ptId", getPatientById);

router.get("/showpt/:ptId", getPatient);

router.get("/pt/image/:ptId", image);

router.post("/savept", savePatient, incPatientId);

router.get("/showpts", showpts);

module.exports = router;
