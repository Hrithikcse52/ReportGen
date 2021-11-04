const dotenv = require("dotenv");

dotenv.config({
    path:"../../.env",
  });

  console.log("env from parent",process.env)
export const API =  `http://localhost:${process.env.PORT}`;
