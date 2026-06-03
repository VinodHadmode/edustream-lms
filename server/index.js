const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { authRouter } = require("./routes/auth.route");

const app = express();

//MW
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies to be sent
  }),
);

//routes
app.use('/api/auth', authRouter)
app.use("/api/user", userRouter);

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
