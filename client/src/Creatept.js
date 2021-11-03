import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom";
import { CreatePatientReport } from "./helper";

const Creatept = () => {
  const [ptData, setptData] = useState({
    name: "",
    ageSex: "",
    address: "",
    ltear: "",
    ltearImpression: "",
    rtear: "",
    rtearImpression: "",
    rtnose: "",
    rtnoseImpression: "",
    ltnose: "",
    ltnoseImpression: "",
    lrynx: "",
    lrynxImpression: "",
    firstTitle: "Right Ear",
    secTitle: "Left Ear",
    thirdTitle: "Right Nostril",
    fourthTitle: "Left Nostril",
    fifthTitle: "Lrynx",
    id: "",
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

  // useEffect(() => {
  //   setptData({ ...ptData, formData: new FormData() });
  // }, []);

  const handelChange = (event) => {
    const name = event.target.name;
    // console.log(name);
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    console.log(name, typeof value, value);
    formData.set(name, value);
    setptData({ ...ptData, [name]: value });
    // console.log(ptdata);
  };

  const Submit = async (event) => {
    event.preventDefault();
    try {
      console.log("in");
      const report = await CreatePatientReport(formData);
      console.log("out");
      console.log(report);
      setptData({ ...ptData, id: report });
      window.open(`http://localhost:8000/pdf/${report}`);
      // window.location.open(`http://localhost:8000/pdf/${report}`);
      // return <Redirect to={`http://localhost:8000/pdf/${report}`} />;
    } catch (error) {
      console.log("error", error);
    }
    // setptData({ ...ptData });
    console.log(event.target);
  };

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
        </div>

        <div className="row">
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
        </div>

        <div className="form-group">
          <button className="btn btn-success" onClick={Submit}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Creatept;
