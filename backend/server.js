const express = require("express");
const { app, server } = require("./socket/socket");

require("dotenv").config();
require("./src/database/config");

const auth = require("./src/routes/UserRoute");
const message = require("./src/routes/messages");
const usersrouter = require("./src/routes/getroute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cookieParser());
const __dirnames = path.resolve()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", auth);
app.use("/api/message", message);
app.use("/api/user", usersrouter);
// const __dirnames = path.resolve();

app.use(express.static(path.join(__dirnames, "frontend", "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirnames, "frontend", "dist", "index.html"));
});

const port = process.env.port || 4000;

server.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
