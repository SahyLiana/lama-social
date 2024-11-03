const router = require("express").Router();
const Child = require("../models/TestChild");

//add
router.post("/", async (req, res) => {
  const newChild = new Child(req.body);

  try {
    const savedChild = await newChild.save();
    res.status(200).json(savedChild);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get all children
router.get("/", async (req, res) => {
  try {
    const children = await Child.find({});
    res.status(200).json(children);
  } catch (e) {
    res.status(500).json(e);
  }
});

//delete a childr
router.get("/:id", async (req, res) => {
  try {
    const children = await Child.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(children);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
