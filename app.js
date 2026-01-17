const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(8080, () => {
  console.log("Server On: http://localhost:8080");
});
