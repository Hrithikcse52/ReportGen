const mongoose = require('mongoose');

const patientScheam = mongoose.Schema(
    {
        patientid: {
            type: Number,
            default: 0,
        },
        name: String,
        ageSex: String,
        address: String,

        firstTitle: {
            type: String,
            default: 'Right Ear',
        },
        secTitle: {
            type: String,
            default: 'Left Ear',
        },
        thirdTitle: {
            type: String,
            default: 'Right Nostril',
        },
        fourthTitle: {
            type: String,
            default: 'Left Nostril',
        },
        fifthTitle: {
            type: String,
            default: 'Throat - Larynx',
        },
        rtear: {
            data: Buffer,
            contentType: String,
        },
        rtearImpression: Array,

        ltear: {
            data: Buffer,
            contentType: String,
        },
        ltearImpression: Array,

        rtnose: {
            data: Buffer,
            contentType: String,
        },
        rtnoseImpression: Array,

        ltnose: {
            data: Buffer,
            contentType: String,
        },
        ltnoseImpression: Array,

        lrynx: {
            data: Buffer,
            contentType: String,
        },
        lrynxImpression: Array,
    },
    { timestamps: true }
);

module.exports = mongoose.model('patient', patientScheam);
