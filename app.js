
const express = require('express');
const { userEnpoints } = require('./application/data/endpoints');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

console.log("userEnpoints=", userEnpoints);

app.get(userEnpoints.USERS, (request, response) => {
    const users = {
        users: [
            {
                name: "user1"
            },
            {
                name: "user2"
            }
        ]
     };
     response.send(users);
});

