// const { API } = require("./API");

export const CreatePatientReport = async (patient) => {
  console.log(patient);
  try {
    const res = await fetch("http://localhost:8000/api/savept", {
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
