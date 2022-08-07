const despatchEnvelopDistributionRepository = require("../repositories/despatch-envelop-distribution-repository")
const express = require("express");
const router = express.Router();

router.post("/create-despatch-envelop-distribution", (req, res) =>
    despatchEnvelopDistributionRepository.create(req, res)
);

module.exports = router