const Patient = require('../models/patient');
const newPat = require('../models/newPatient');
const { IncomingForm } = require('formidable');
const fs = require('fs');

const getPatientById = (req, res, next, id) => {
    Patient.findById(id).exec((err, pt) => {
        if (err) return res.status(400).json(err);
        req.patient = pt;
        // console.log("param:" + req.patient);
        next();
    });
};

const getPatient = (req, res) => {
    return res.json(req.patient);
};

const savePatient = async (req, res) => {
    let form = IncomingForm({ multiples: true }, { keepExtensions: true });

    await form.parse(req, (err, field, file) => {
        if (err)
            return res.status(400).json({
                err: 'Problem With Response',
            });
        console.log('here');
        let patient = Patient(field);
        console.log(patient);

        //Right Ear impression
        // console.log(field.rtearImpression.length);
        if (field.rtearImpression) {
            var array = field.rtearImpression.split(',');
            patient.rtearImpression = [];
            array.forEach((element) => {
                patient.rtearImpression.push(element);
            });
        }

        //Left Ear impression
        if (field.ltearImpression) {
            var array = field.ltearImpression.split(',');
            patient.ltearImpression = [];
            array.forEach((element) => {
                patient.ltearImpression.push(element);
            });
        }

        //Right Nose impression
        if (field.rtnoseImpression) {
            var array = field.rtnoseImpression.split(',');
            patient.rtnoseImpression = [];
            array.forEach((element) => {
                patient.rtnoseImpression.push(element);
            });
        }

        //Left Nose impression
        if (field.ltnoseImpression) {
            var array = field.ltnoseImpression.split(',');
            patient.ltnoseImpression = [];
            array.forEach((element) => {
                patient.ltnoseImpression.push(element);
            });
        }

        //Lrynx impression
        if (field.lrynxImpression) {
            var array = field.lrynxImpression.split(',');
            patient.lrynxImpression = [];
            array.forEach((element) => {
                patient.lrynxImpression.push(element);
            });
        }

        if (file.ltear) {
            patient.ltear.data = fs.readFileSync(file.ltear.path);
            patient.ltear.contentType = file.ltear.contentType;
        }
        if (file.rtear) {
            patient.rtear.data = fs.readFileSync(file.rtear.path);
            patient.rtear.contentType = file.rtear.contentType;
        }
        if (file.ltnose) {
            patient.ltnose.data = fs.readFileSync(file.ltnose.path);
            patient.ltnose.contentType = file.ltnose.contentType;
        }
        if (file.rtnose) {
            patient.rtnose.data = fs.readFileSync(file.rtnose.path);
            patient.rtnose.contentType = file.rtnose.contentType;
        }
        if (file.lrynx) {
            patient.lrynx.data = fs.readFileSync(file.lrynx.path);
            patient.lrynx.contentType = file.lrynx.contentType;
        }

        patient.save((err, patient) => {
            if (err)
                res.status(400).json({
                    err: err.message,
                });
            res.json(patient._id);
        });
    });
};

const savePatient2 = (req, res) => {
    console.log('req', req.body);
    const { ptBio, ptData } = req.body;
    // Tank.create({ size: 'small' }, function (err, small) {
    //     if (err) return handleError(err)
    //     // saved!
    // })

    newPat.create({ ptBio, ptData }, (err, doc) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log(doc);
            res.status(200).send(doc);
        }
    });
};

const incPatientId = (req, res) => {
    console.log('inc');
    Patient.findByIdAndUpdate(
        { _id: req.patient._id },
        { $inc: { patientid: 1 } },
        { new: true, useFindAndModify: false },
        (err, pt) => {
            if (err) return res.json({ err });
        }
    );
};

const showpts = (req, res) => {
    Patient.find().exec((err, pt) => {
        if (err) return res.status(400).json(err);
        res.json(pt);
    });
};

var image = (req, res, next) => {
    if (req.patient.image.data) {
        res.set('Content-Type', req.patient.image.contentType);
        res.send(req.patient.image.data);
        next();
    }
};

module.exports = {
    savePatient,
    showpts,
    image,
    getPatientById,
    getPatient,
    incPatientId,
    savePatient2,
};
