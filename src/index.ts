import './loadEnv';
import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import { userEndpoints, storageEndpoints } from "./data/endpoints";
import { query } from "./infrastructure/database";

import { join } from "path";
import { saveFileFromBase64 } from "./common/utils";

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get(userEndpoints.USERS, async (request, response) => {
  const queryResult = await query(`SELECT * FROM "user"`);
  const users = queryResult.rows;
  response.send(users);
});

app.patch(userEndpoints.USER, (request, response) => {

  const userId = request.params.id;
  const base64Image = request.body.profile_image;
  // const imageFormat = request.body.image_format;
  
  if(!base64Image) {
    throw new Error("profile_image cannot be empty");
  }
  // if(!imageFormat) {
  //   throw new Error("image_format cannot be empty");
  // }

  // console.log("userId=", userId, "base64Image=", base64Image);
  saveFileFromBase64("test", base64Image);

  response.send({profile_image_uri: "test_profile_image_uri1112"});
})

app.get(storageEndpoints.IMAGES, (request, response) => {
  const imageId = request.params.id;
  console.log("imageId=", imageId);
  const filePath = join(__dirname, "storage", `${imageId}`);

  response.sendFile(filePath, function (error) {
      if (error) {
        console.error(error);
        response.end();
      }
  });

});
