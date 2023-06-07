const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getMsgs,
  getMsg,
  createMsg,
  deleteMsg,
  updateMsg,
} = require("../controller/message");

// const { getBookComments } = require("../controller/comments");

const router = express.Router();

//"/api/v1/books"
router
  .route("/")
  .get(getMsgs)
  .post(createMsg);

router
  .route("/:id")
  .get(getMsg)
  .delete(deleteMsg)
  .put(updateMsg);

module.exports = router;
