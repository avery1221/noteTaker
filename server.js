const express = require("express");
const htmlRoutes = require("./routes/routes.js");
const apiRoutes = require("./routes/api.js");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT,()=> console.log(`Listening on PORT : ${PORT}`));