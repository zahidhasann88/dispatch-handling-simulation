const transitSlipDistributionRepository = require("../repositories/transit-slip-distribution-repository")
const express = require("express");
const router = express.Router();

router.post("/create-transit-slip-distribution", (req, res) =>
    transitSlipDistributionRepository.create(req, res)
);

module.exports = router