const database = require("./infrastructure/database");

const createTableString = `CREATE TABLE "user" (\
id SERIAL PRIMARY KEY,\
first_name CHARACTER VARYING(256),\
last_name CHARACTER VARYING(256),\
age INTEGER,\
email CHARACTER VARYING(256),\
profile_image_uri CHARACTER VARYING(1024)\
);`;

database.query(createTableString);