import './loadEnv';
import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import { userEndpoints, storageEndpoints } from "./data/endpoints";

import { UserRepository } from './infrastructure/repositories/userRepository';

import { saveFileFromBase64 } from "./common/utils";
import path from 'path';

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
  const users = await UserRepository.getUsers();
  response.send(users);
});

app.patch(userEndpoints.USER, (request, response) => {

  const userId = Number(request.params.id);
  const base64Image = request.body.profile_image;
  // const imageFormat = request.body.image_format;
  
  if(!base64Image) {
    throw new Error("profile_image cannot be empty");
  }
  // if(!imageFormat) {
  //   throw new Error("image_format cannot be empty");
  // }

  // console.log("userId=", userId, "base64Image=", base64Image);
  const fileExtension = base64Image.substring("data:image/".length, base64Image.indexOf(";base64"))
  console.log(fileExtension);
  saveFileFromBase64(`./storage/${userId}_profile_image.${fileExtension}`, base64Image);
  const profileImageUri = `/images/${userId}_profile_image.${fileExtension}`;
  UserRepository.editUser({id: userId, profileImageUri });
  response.send({profile_image_uri: profileImageUri });
})

app.get(storageEndpoints.IMAGES, (request, response) => {
  const imageId = request.params.id;
  console.log("imageId=", imageId);
  const filePath = path.resolve(`${__dirname}/../storage/${imageId}`);

  response.sendFile(filePath, function (error) {
      if (error) {
        console.error(error);
        response.end();
      }
  });

});
