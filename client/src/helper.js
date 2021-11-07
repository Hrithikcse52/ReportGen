export const CreatePatientReport = async (patient) => {
    try {
        const res = await fetch(`/api/savept`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: patient,
        });
        // console.log("done");
        return await res.json();
    } catch (err) {
        return console.log(err, 'coudnt Process Request');
    }
};
export const CreatePatientReport2 = async (patient) => {
    console.log('Pat', patient);
    try {
        const res = await fetch(`/api/savept2`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: patient,
        });
        // console.log("done");
        return res.json();
    } catch (err) {
        return console.log(err, 'coudnt Process Request');
    }
};
