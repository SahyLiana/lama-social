const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema(
  {
    parrent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },

    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Child", ChildSchema);

//https://www.mongodb.com/developer/products/mongodb/triggers-tricks-preimage-cass/
