const router = require("express").Router();
const Parent = require("../models/TestParent");
const Child = require("../models/TestChild");

//add
router.post("/", async (req, res) => {
  const newParent = new Parent(req.body);

  try {
    const savedParent = await newParent.save();
    res.status(200).json(savedParent);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get all parents
router.get("/", async (req, res) => {
  try {
    const parent = await Parent.find({});
    res.status(200).json(parent);
  } catch (e) {
    res.status(500).json(e);
  }
});

//delete a parent
router.delete("/:id", async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete({ _id: req.params.id });
    const deletedChild = await Child.findOneAndDelete({
      parrent_id: parent._id,
    });
    res.status(200).json(`${parent}, ${deletedChild}`);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
