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
  response.set({'Access-Control-Allow-Origin': '*'})
  response.send(users);
});

app.patch(endpoints.userEndpoints.USER, (request, responce) => {
  const userId = request.params.id;
  const base64Image = request.body.profile_image;
  const imageFormat = request.body.image_format;
  if(!base64Image) {
    throw new Error("profile_image cannot be empty");
  }
  if(!imageFormat) {
    throw new Error("image_format cannot be empty");
  }

  console.log("userId=", userId, "base64Image=", base64Image);
  responce.status(200).send({profile_image_uri: "test_profile_image_uri"}, function(error) {
    
  });
})

app.get(endpoints.storageEndpoints.IMAGES, (request, response) => {
  const imageId = request.params.id;
  console.log("imageId=", imageId);
  const filePath = path.join(__dirname, "storage", `${imageId}`);

  response.sendFile(filePath, function (error) {
      if (error) {
        console.error(error);
        response.status(error.status).end();
      }
  });

});
