const mongoose = require("mongoose");
const TestChild = require("./TestChild");

const ParentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    // children: {
    //   type: mongoose.Schema(TestChild),
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", ParentSchema);

//6712b5d9694aebc5e23fdf61
