const despatchEnvelopRepository = require("../repositories/despatch-envelop-repository")
const express = require("express");
const router = express.Router();

router.post("/create-despatch-envelop", (req, res) =>
    despatchEnvelopRepository.create(req, res)
);

router.post("/get-despatch-envelop-by-id", (req, res) =>
    despatchEnvelopRepository.getById(req, res)
);

router.post("/get-despatch-envelop-by-letter-no", (req, res) =>
    despatchEnvelopRepository.getByLetterNo(req, res)
);

router.delete("/delete-despatch-envelop", (req, res) =>
    despatchEnvelopRepository.delete(req, res)
);

router.patch("/update-despatch-envelop", (req, res) =>
    despatchEnvelopRepository.update(req, res)
);

router.post("/get-despatch-envelop-by-user-created", (req, res) =>
    despatchEnvelopRepository.getByCreatedBy(req, res)
);

// router.post("/get-despatch-envelop-by-for-user", (req, res) =>
//     despatchEnvelopRepository.getByCreatedFor(req, res)
// );

router.post("/get-all-despatch-envelop-for-user", (req, res) =>
    despatchEnvelopRepository.getAllForUser(req, res)
);

module.exports = router