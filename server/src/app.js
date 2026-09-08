const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const { productRouter } = require("./routes/product");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Product Discovery API is running",
  });
});

app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();