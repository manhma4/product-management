const express = require("express");
var methodOverride = require("method-override");
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const { prefixAdmin } = require("./config/system");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

app.set("views", "./views");
app.set("view engine", "pug");

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

//Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
