// const { API } = require("./API");

import { API } from "./API";

export const CreatePatientReport = async (patient) => {
  console.log(patient);
  console.log("enV",process.env.REACT_APP_BACKEND)
  try {
      const res = await fetch(`${API}/api/savept`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: patient,
    });
    console.log("done");
    return await res.json();
  } catch (err) {
    return console.log(err, "coudnt Process Request");
  }
};
