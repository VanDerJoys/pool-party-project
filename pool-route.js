const express = require("express");
const router = express.Router();
const Session = require("./pool-controler");

let session = new Session();

router.post("/", (req, res) => {
    session
        .addSession(req.body)
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err);
        });
});

router.get("/", (req, res) => {
    // Here we get all sessions
    session
        .getSessions()
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});

router.put("/:sessionId", (req, res) => {
    session
        .updateSession(req.params.sessionId, req.body)
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});

router.delete("/:sessionId", (req, res) => {
    session
        .deleteSession(req.params.sessionId)
        .then((results) => {
            res.status(results.status).send(results);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});

/**
 * PROGRAMMED SESSIONS MANAGEMENT
 */
router.get("/attributions", (req, res) => {
    session
        .getProgrammedSessions(req.query.page, req.query.limit)
        .then((results) => {
            res.status(results.status).json(results);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
});

router.get("/:sessionId", (req, res) => {
    session
        .getPool(req.params.sessionId)
        .then((results) => {
            res.status(results.status).json(results);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
});

module.exports = router;
