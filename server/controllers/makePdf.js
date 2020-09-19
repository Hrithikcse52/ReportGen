var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
const { createCanvas, loadImage } = require("canvas");
const { head } = require("../router/patient");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-Italic.ttf",
  },
};

const logoImage =
  "data:image/jpeg;base64,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";

const getImage = async (url, vh, hh) => {
  const image = await loadImage(url);
  const canvas = createCanvas(vh, hh);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL();
};

var Url =
  "http://www.aakritihospital.com/wp-content/uploads/2018/09/aakritilogo-1.jpeg";

var d = new Date();
var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

const imageRender = (image) => {
  if (image.data) {
    if (image.data.length)
      return {
        image:
          "data:image/jpeg;base64," +
          Buffer.from(image.data).toString("base64"),
        fit: [130, 100],
        margin: [0, 4],
      };
    return {};
  }
};

const getPdf = async (req, res, next) => {
  var document = {
    content: [
      {
        columns: [
          {
            // image: await getImage(Url, 230, 80),
            image: logoImage,
            fit: [200, 200],
          },
          {
            text:
              "PhoneNo:7070996104,7070996105,7070996106\nAddress: Near Sanichara Mandir, Sandalpur \n Patna-800006 \nEmail: aakritihospital@gmail.com \nWebsite:www.aakritihospital.com",
            style: "sideText",
          },
        ],

        columnGap: 20,
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 540, y2: 0, lineWidth: 1 }],
        margin: [0, 10],
      },
      {
        columns: [
          {
            text: "Endoscopic Report",
            bold: true,
            alignment: "right",
          },
          {
            text: "(Ear, Nose & Throat-Larynx)",
            alignment: "left",
          },
        ],
        margin: [0, 5],
      },

      {
        columns: [
          {
            text: "Name:  " + req.patient.name,
            alignment: "left",
          },
          {
            text: "Age/Sex:  " + req.patient.ageSex,
            alignment: "right",
          },
        ],
        margin: [0, 5],
      },
      {
        columns: [
          {
            text: "Address:  " + req.patient.address,
            alignment: "left",
          },
          {
            text: "Date:  " + date,
            alignment: "right",
          },
        ],
      },
      {
        columns: [
          imageRender(req.patient.rtear),
          imageRender(req.patient.rtear)
            ? {
                text: req.patient.firstTitle,
                decoration: "underline",
                alignment: "left",
                margin: [0, 20],
              }
            : {},

          imageRender(req.patient.rtear)
            ? {
                ul: req.patient.rtearImpression,
                margin: [-80, 40],
                alignment: "left",
              }
            : { text: " ", margin: [0, 50] },
        ],
      },

      {
        columns: [
          imageRender(req.patient.ltear),
          imageRender(req.patient.ltear)
            ? {
                text: req.patient.secTitle,
                decoration: "underline",
                margin: [0, 20],
                alignment: "left",
              }
            : {},

          imageRender(req.patient.ltear)
            ? {
                // ul: req.patient.ltearImpression,
                ul: req.patient.ltearImpression,

                margin: [-80, 40],
                alignment: "left",
              }
            : { text: " ", margin: [0, 50] },
        ],
      },
      {
        columns: [
          imageRender(req.patient.rtnose),
          imageRender(req.patient.rtnose)
            ? {
                text: req.patient.thirdTitle,
                decoration: "underline",
                font: "Roboto",
                margin: [0, 20],
                alignment: "left",
              }
            : {},
          imageRender(req.patient.rtnose)
            ? {
                // ul: req.patient.rtnoseImpression,
                ul: req.patient.rtnoseImpression,
                margin: [-80, 40],
                alignment: "left",
              }
            : { text: " ", margin: [0, 50] },
        ],
      },
      {
        columns: [
          imageRender(req.patient.ltnose),
          imageRender(req.patient.ltnose)
            ? {
                text: req.patient.fourthTitle,
                decoration: "underline",
                margin: [0, 20],
                alignment: "left",
              }
            : {},
          imageRender(req.patient.ltnose)
            ? {
                // ul: req.patient.ltnoseImpression,
                ul: req.patient.ltnoseImpression,
                margin: [-80, 40],
                alignment: "left",
              }
            : { text: " ", margin: [0, 50] },
        ],
      },
      {
        columns: [
          imageRender(req.patient.lrynx),

          imageRender(req.patient.lrynx)
            ? {
                text: req.patient.fifthTitle,
                decoration: "underline",
                margin: [0, 20],
                alignment: "left",
              }
            : {},

          imageRender(req.patient.lrynx)
            ? {
                // ul: req.patient.lyrnxImpression,
                ul: req.patient.lrynxImpression,
                margin: [-80, 40],
                alignment: "left",
              }
            : { text: " ", margin: [0, 50] },
        ],
      },

      {
        text: "Dr.Amarnath Prasad \n M.B.B.S, M.S(ENT)",
        alignment: "right",
        bold: true,
      },
    ],
    styles: {
      sideText: {
        alignment: "right",
        lineHeight: 1.1,
      },
    },
    pageSize: "A4",
    pageOrientation: "portrait",
  };

  pdfMake.createPdf(document).getBase64((data) => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Dispositon": 'attachment;filename="filename.pdf"',
    });

    const download = Buffer.from(data.toString("utf-8"), "base64");
    res.end(download);
    next();
  });
};

module.exports = { getPdf };
