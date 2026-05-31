const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();

const app = express();

//MW
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 3000;

// Start server after DB connects
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};

startServer();