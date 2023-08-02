const express = require("express");
const path = require("path");
const list = require("./Routes/listRout.js");
const connection = require("./MongoDB/DbConnec");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./Routes/Form.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();

// middlewares
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(bodyParser.json({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", list);
app.use("/user", router);
// app.use(express.static(path.join(__dirname, "../crud-client/build")));
// db
connection();

app.listen(process.env.PORT, () => {
  console.log("Hello this is simple post : 4000");
});
