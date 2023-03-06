const { Router } = require("express");
const { BugModel } = require("../model/BugModel");

const router = Router();

router.get("/getbugs", async (req, res) => {
  const bugs = await BugModel.find();
  res.send({
    success: true,
    msg: "All Bugs are here",
    data: bugs,
  });
});

router.post("/addbug", async (req, res) => {
  const payload = req.body;
  try {
    const bug = new BugModel(payload);
    await bug.save();
    res.send({
      success: true,

      msg: "New Bug Added",
      data: bug,
    });
  } catch (err) {
    res.send({
      success: true,

      msg: "New Bug Added",
      error: err,
    });
    console.log({ ERR: err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await BugModel.findByIdAndDelete({ _id: id });
    res.send({
      success: true,

      msg: `Bug with id ${id} deleted`,
      data: `Bug with id ${id} deleted`,
    });
  } catch (err) {
    res.send({
      success: false,
      msg: ` Id ${id} Deleted Failed`,
      error: err,
    });
    console.log({ ERR: err });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await BugModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({
      success: true,
      msg: `Bug with id ${id} Updated`,
      data: `Bug with id ${id} Updated`,
    });
  } catch (err) {
    res.send({
      success: false,
      msg: ` id ${id} Update Failed`,
      error: err,
    });
    console.log({ ERR: err });
  }
});

module.exports = { router };
