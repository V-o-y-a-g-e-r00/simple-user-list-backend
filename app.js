require('dotenv').config();
const express = require("express");
const endpoints = require("./application/data/endpoints");
const database = require("./infrastructure/database");

const path = require("path");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

// console.log("endpoints=", endpoints);
// ;(async () => {
//   const result = await database.query(`SELECT * FROM "user"`);
//   console.log("result.rows=", result.rows);
// })();

app.get(endpoints.userEndpoints.USERS, async (request, response) => {
  const queryResult = await database.query(`SELECT * FROM "user"`);
  const users = queryResult.rows;
  response.send(users);
});
app.get(endpoints.storageEndpoints.IMAGES, (request, responce) => {
  const imageId = request.params.id;
  const filePath = path.join(__dirname, "storage", `${imageId}.jpg`);

  responce.sendFile(filePath, (error) => {
    console.error(error);
    responce.status(404).send("image not found");
  });
});
