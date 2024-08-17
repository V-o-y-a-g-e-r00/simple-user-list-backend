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

console.log("endpoints=", endpoints);

database.query("SELECT * FROM users");

app.get(endpoints.userEndpoints.USERS, (request, response) => {
  const users = {
    users: [
      {
        name: "user1",
      },
      {
        name: "user2",
      },
    ],
  };
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
