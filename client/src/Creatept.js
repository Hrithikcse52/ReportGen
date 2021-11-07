import React, { useState } from 'react';
import { CreatePatientReport, CreatePatientReport2 } from './helper';
import axios from 'axios';

// const bucket = firebaseApp.firestore();

const Creatept = () => {
    const [count, setCount] = useState(1);

    const [ptBio, setBio] = useState({
        name: '',
        ageSex: '',
        address: '',
    });

    const [ptTempData, setTempData] = useState({});
    const [ptMainData, setMainData] = useState([]);

    const [ptData, setptData] = useState({
        name: '',
        ageSex: '',
        address: '',
        ltear: '',
        ltearImpression: '',
        rtear: '',
        rtearImpression: '',
        rtnose: '',
        rtnoseImpression: '',
        ltnose: '',
        ltnoseImpression: '',
        lrynx: '',
        lrynxImpression: '',
        firstTitle: 'Right Ear',
        secTitle: 'Left Ear',
        thirdTitle: 'Right Nostril',
        fourthTitle: 'Left Nostril',
        fifthTitle: 'Lrynx',
        id: '',
        formData: new FormData(),
    });

    const {
        name,
        address,
        ageSex,
        thirdTitle,
        secTitle,
        lrynxImpression,
        // lrynx,
        fourthTitle,
        // ltear,
        ltearImpression,
        // ltnose,
        ltnoseImpression,
        // rtear,
        rtearImpression,
        // rtnose,
        rtnoseImpression,
        firstTitle,
        fifthTitle,

        // error,
        formData,
    } = ptData;

    // console.log('Final Data', FinalData)
    const data = [
        {
            title: '',
            imageData: undefined,
            impression: [],
        },
    ];

    const handelBio = (e) => {
        setBio({ ...ptBio, [e.target.name]: e.target.value });
    };

    const handelChange = (event) => {
        const name = event.target.name;
        // console.log(name);
        const value =
            event.target.type === 'file'
                ? event.target.files[0]
                : event.target.value;
        // console.log(name, typeof value, value);
        formData.set(name, value);
        setptData({ ...ptData, [name]: value });
        // console.log(ptdata);
    };

    const handelAddNewField = (e) => {
        e.preventDefault();
        setCount(count + 1);
        let temp = ptMainData;
        temp.push(ptTempData);
        setMainData(temp);
        setTempData({});
        const FinalData = {
            ptBio,
            ptMainData,
        };
        console.log('Final Data', FinalData);
    };

    const handleForm = (e) => {
        const name = e.target.name;
        const value =
            e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setTempData({ ...ptTempData, [name]: value });
    };
    console.log('Temp', ptTempData);
    console.log('Main', ptMainData);

    const Submit = async (event) => {
        event.preventDefault();
        try {
            // const report = await CreatePatientReport(formData);
            // setptData({ ...ptData, id: report });
            if (process.env.NODE_ENV === 'development') {
                // window.open(`http://localhost:5000/pdf/${report}`);
            } else {
                // window.open(`/pdf/${report}`);
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    const handelSubmit = async (event) => {
        event.preventDefault();
        const report = await axios.post(
            '/api/savept2',
            { ptBio: ptBio, ptData: ptMainData },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        // const report = await CreatePatientReport2({ ptBio, ptMainData })
        console.log('Result', report);
    };

    let field = (
        <>
            <div className="col-md-4">
                <div className="form-group">
                    <label className="text-light">Image</label>
                    <label className="text-light btn btn-success rounded">
                        <input
                            type="file"
                            placeholder="Upload image"
                            name="image"
                            onChange={handleForm}
                        />
                    </label>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label className="text-light">Title</label>
                    <input
                        className="form-control"
                        name="title"
                        onChange={handleForm}
                        type="text"
                    />
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label className="text-light">Impression</label>
                    <input
                        className="form-control"
                        name="impression"
                        onChange={handleForm}
                        type="text"
                    />
                </div>
            </div>
        </>
    );

    let JSX = [];
    for (let i = 0; i < count; i++) {
        JSX.push(field);
    }

    return (
        <>
            <form className="bg-dark p-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handelBio}
                                value={ptBio.name}
                                name="name"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="text-light">Age/Sex</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handelBio}
                                value={ptBio.ageSex}
                                name="ageSex"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="text-light">Address</label>
                    <input
                        type="text"
                        name="address"
                        onChange={handelBio}
                        required
                        className="form-control"
                        placeholder="Address"
                        value={ptBio.address}
                    />
                </div>
                {/* <form className="bg-dark p-5">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                type="text"
                onChange={handelChange}
                value={name}
                name="name"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light">Age/Sex</label>
              <input
                className="form-control"
                type="text"
                onChange={handelChange}
                value={ageSex}
                name="ageSex"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="text-light">Address</label>
          <input
            type="text"
            name="address"
            onChange={handelChange}
            required
            className="form-control"
            placeholder="Address"
            value={address}
          />
        </div> */}

                {/* <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Image</label>
              <label className="text-light btn btn-success rounded">
                <input
                  type="file"
                  placeholder="Upload image"
                  onChange={handelChange}
                  name="rtear"
                />
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Title</label>
              <input
                className="form-control"
                type="text"
                name="firstTitle"
                onChange={handelChange}
                value={firstTitle}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Impression</label>
              <input
                className="form-control"
                type="text"
                value={rtearImpression}
                name="rtearImpression"
                onChange={handelChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Image</label>
              <label className="text-light btn btn-success rounded">
                <input
                  type="file"
                  placeholder="Upload image"
                  name="ltear"
                  onChange={handelChange}
                />
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Title</label>
              <input
                className="form-control"
                name="secTitle"
                onChange={handelChange}
                value={secTitle}
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Impression</label>
              <input
                className="form-control"
                value={ltearImpression}
                name="ltearImpression"
                onChange={handelChange}
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Image</label>
              <label className="text-light btn btn-success rounded">
                <input
                  type="file"
                  name="rtnose"
                  onChange={handelChange}
                  placeholder="Upload image"
                />
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Title</label>
              <input
                className="form-control"
                name="thirdTitle"
                onChange={handelChange}
                value={thirdTitle}
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Impression</label>
              <input
                className="form-control"
                value={ltnoseImpression}
                onChange={handelChange}
                name="ltnoseImpression"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Image</label>
              <label className="text-light btn btn-success rounded">
                <input
                  type="file"
                  name="ltnose"
                  onChange={handelChange}
                  placeholder="Upload image"
                />
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Title</label>
              <input
                className="form-control"
                onChange={handelChange}
                name="fourthTitle"
                value={fourthTitle}
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Impression</label>
              <input
                className="form-control"
                value={rtnoseImpression}
                onChange={handelChange}
                name="rtnoseImpression"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Image</label>
              <label className="text-light btn btn-success rounded">
                <input
                  type="file"
                  onChange={handelChange}
                  name="lrynx"
                  placeholder="Upload image"
                />
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Title</label>
              <input
                className="form-control"
                onChange={handelChange}
                name="fifthTitle"
                value={fifthTitle}
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="text-light">Impression</label>
              <input
                className="form-control"
                value={lrynxImpression}
                onChange={handelChange}
                name="lrynxImpression"
                type="text"
              />
            </div>
          </div>
        </div> */}

                <div className="row">{JSX}</div>

                <button className="btn btn-success" onClick={handelAddNewField}>
                    Add
                </button>

                <div className="form-group">
                    {/* <button className="btn btn-success" onClick={Submit}>
                        Submit
                    </button> */}
                    <button className="btn btn-success" onClick={handelSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default Creatept;
