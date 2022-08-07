const userInfoRepository = require("../repositories/user-info-repository")
const express = require("express");
const router = express.Router();

router.post("/create-user", (req, res) =>
    userInfoRepository.create(req, res)
);

router.post("/get-user-by-id", (req, res) =>
    userInfoRepository.getById(req, res)
);

router.post("/get-user-by-username-and-password", (req, res) =>
    userInfoRepository.getByUnAndPass(req, res)
);

router.delete("/delete-user", (req, res) =>
    userInfoRepository.deleteById(req, res)
);

router.patch("/update-user", (req, res) =>
    userInfoRepository.updateById(req, res)
);

router.post("/get-user-by-username", (req, res) =>
    userInfoRepository.getByUn(req, res)
);

router.post("/get-user-like-fullname", (req, res) =>
    userInfoRepository.getByLikeFln(req, res)
);

router.get("/get-all-user", (req, res) =>
    userInfoRepository.getAll(req, res)
);

router.post("/get-user-by-role", (req, res) =>
    userInfoRepository.getByRole(req, res)
);

router.post("/get-user-like-role", (req, res) =>
    userInfoRepository.getByLikeRole(req, res)
);

module.exports = router