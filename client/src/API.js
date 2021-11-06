require("dotenv").config();
console.log("env from parent",process.env)
export const API =  `http://localhost:${process.env.PORT}`;
