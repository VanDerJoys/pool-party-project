const express = require("express");
const router = express.Router();
const Pool = require("./pool-controler");

let pool = new Pool();

router.post("/", (req, res) => {
    pool
        .addPool(req.body)
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err);
        });
});

router.get("/", (req, res) => {
    // Here we get all pools
    pool
        .getPools()
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});

router.put("/:poolId", (req, res) => {
    pool
        .updatepool(req.params.poolId, req.body)
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});

router.delete("/:poolId", (req, res) => {
    pool
        .deletepool(req.params.poolId)
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});

/**
 * PROGRAMMED poolS MANAGEMENT
 */
router.get("/attributions", (req, res) => {
    pool
        .getProgrammedpools(req.query.page, req.query.limit)
        .then((results) => {
            res.status(results.status).json(results);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
});

router.get("/:poolId", (req, res) => {
    pool
        .getPool(req.params.poolId)
        .then((results) => {
            res.status(results.status).json(results);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
});

module.exports = router;
