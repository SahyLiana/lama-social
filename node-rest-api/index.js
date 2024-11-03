const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/converstions");
const childRoute = require("./routes/child");
const parentRoute = require("./routes/parent");
const msgRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected to Mongodb");
  })
  .catch((error) => {
    console.error("Error", error);
  });

//IT MEANS IF WE WRITE http://localhost:8800/images/, TRY TO REACT THE "public/images" to extract the image
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use(express.urlencoded({ extended: true }));

// cb(null, req.body.name);

// Ensure the filename is unique or sanitized if needed
// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// const fileName = req.body.name ? req.body.name : uniqueSuffix; // Fallback to unique name

// cb(
//   null,
//   `${fileName}${file.originalname ? path.extname(file.originalname) : ""}`
// ); // Append the original file extension if needed

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, file.original name);
    console.log("File and req", file, req.body);

    cb(null, file.originalname);
  },
});
// app.use(multer({ storage }).single("file"));

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("Req body api/upload", req.body);
  try {
    return res.status(200).json("FIle uploaded successfuly");
  } catch (e) {
    console.log(e);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", msgRoute);
app.use("/api/child", childRoute);
app.use("/api/parent", parentRoute);

app.listen(8800, () => {
  console.log("Server listening on 8800");
});
