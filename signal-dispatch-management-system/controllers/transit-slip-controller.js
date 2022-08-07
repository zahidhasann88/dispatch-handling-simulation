const transitSlipRepository = require("../repositories/transit-slip-repository")
const express = require("express");
const router = express.Router();

router.post("/create-transit-slip", (req, res) =>
    transitSlipRepository.create(req, res)
);

router.post("/get-transit-slip-by-id", (req, res) =>
    transitSlipRepository.getById(req, res)
);

router.post("/get-transit-slip-by-slip-no", (req, res) =>
    transitSlipRepository.getBySlipNo(req, res)
);

router.delete("/delete-transit-slip", (req, res) =>
    transitSlipRepository.delete(req, res)
);

router.patch("/update-transit-slip", (req, res) =>
    transitSlipRepository.update(req, res)
);

router.post("/get-transit-slip-by-user", (req, res) =>
    transitSlipRepository.getAllByUser(req, res)
);

router.post("/get-all-transit-slip-for-user", (req, res) =>
    transitSlipRepository.getAllForUser(req, res)
);
module.exports = router