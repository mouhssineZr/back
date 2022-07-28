const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

app.use(
  cookieSession({
    name: "ezraidi-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

const db = require("./app/models");
db.sequelize.sync();
 // drop the table if it already exists
//  db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});
app.use(cors());
app.use(express.json());
app.get("/geom", async(req, res)=> {
  try {
      const geom = await pool.query("SELECT ST_AsGeoJSON(geom) FROM geomtable ORDER BY gid DESC LIMIT 1");
      res.json(geom.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
