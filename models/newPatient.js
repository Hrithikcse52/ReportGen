const mongoose = require('mongoose');

const newPatientScheama = mongoose.Schema(
    {
        ptBio: {
            name: String,
            ageSex: String,
            address: String,
        },
        ptData: [
            {
                title: String,
                impression: String,
                image: {
                    data: Buffer,
                    contentType: String,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('newPatient', newPatientScheama);
