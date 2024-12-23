const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const studentRoutes = require("./routes/student-routes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

// Use routes
app.use("/api", studentRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
