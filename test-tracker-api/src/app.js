const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());
app.use("/api", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
