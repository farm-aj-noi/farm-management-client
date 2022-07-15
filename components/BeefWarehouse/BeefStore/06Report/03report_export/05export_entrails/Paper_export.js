import React, { useState, useContext } from "react";

import { AuthContext } from "../../../../../../appState/AuthProvider";

import dayjs from "dayjs";
import "dayjs/locale/th";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { ButtonPDF, ButtonExcel } from "../../ReportFrom";

pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf",
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

const Paper_export = ({ prod }) => {
  const [data, setdata] = useState(prod);
  const { user } = useContext(AuthContext);

  if (data !== prod) setdata(prod);
  /* console.log(data)
   console.log(prod)  */

  const buildTableBody = (data, columns) => {
    var body = [];

    body.push([

      "วันที่เบิกออก",
      "ทะเบียนขุน",
      "เครื่องใน",
      "ปลายเท้า",
      "หัว",
      "หนังสด",
      "ตับ",
      "ไขมันอุ่น",
      "องแคล",
      "หาง",
      "ถุงน้ำดี",
      "เศษซาก",
      "รหัสบาร์โค้ด",
      "ผู้เบิกออก",
    ]);
    console.log(data);

    data.forEach(function (row) {
      console.log(row);
      var dataRow = [];

      columns.forEach(function (column) {
        if (column === "exportdate") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else if (column === "entrail.offal") {
          dataRow.push(row.entrail.offal);
        } else if (column === "entrail.toe") {
          dataRow.push(row.entrail.toe);
        } else if (column === "entrail.head") {
          dataRow.push(row.entrail.head);
        } else if (column === "entrail.skin") {
          dataRow.push(row.entrail.skin);
        } else if (column === "entrail.liver") {
          dataRow.push(row.entrail.liver);
        } else if (column === "entrail.fat") {
          dataRow.push(row.entrail.fat);
        } else if (column === "entrail.onkale") {
          dataRow.push(row.entrail.onkale);
        } else if (column === "entrail.tail") {
          dataRow.push(row.entrail.tail);
        } else if (column === "entrail.gallbladder") {
          dataRow.push(row.entrail.gallbladder);
        } else if (column === "entrail.scrap") {
          dataRow.push(row.entrail.scrap);
        } else if (column === "entrail.barcode") {
          dataRow.push(row.entrail.barcode);
        } else if (column == "entrail.imslaughter.numcow") {
          dataRow.push(row.entrail.imslaughter.numcow);
        } else if (column === "user.name") {
          dataRow.push(row.user.name);
        } else {
          /* console.log(row[column]) */
          // console.log(column);
          // console.log(
          //   dayjs(row[column]).add(543, "y").locale("th").format("DD-MMMM-YYYY")
          // );
          dataRow.push(row[column]);
        }
      });
      body.push(dataRow);
    });

    return body;
  };

  const table = (data, columns) => {
    // console.log(data)
    return {
      table: {
        headerRows: 1,
        // alignment: 'center'
        widths: [
          "auto",
          "auto",
          "star",
          "star",
          "star",
          "star",
          "star",
          "star",
          "star",
          "star",
          "star",
          "auto",
          "auto",
          "auto",
        ],

        body: buildTableBody(data, columns),
      },
      layout: "headerLineOnly",
      fontSize: 12,
      alignment: "center",
    };
  };

  const printPDF = () => {
    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [40, 40, 40, 120],
      content: [
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: "*",
              text: `ผู้พิมพ์ ${user.name}`,
              style: "printer",
            },
            {
              width: "*",
              text: `${dayjs()
                .add(543, "y")
                .locale("th")
                .format("วันที่พิมพ์ วันdddd ที่ DD เดือนMMMM พ.ศ.YYYY")}`,
              style: "date",
            },
          ],
        },
        {
          text: "รายงานเบิกออกซากโคส่วนอื่น ๆ\n\n",
          style: "header",
          alignment: "center",
        },
        table(data, [
         
          "exportdate",
          "entrail.imslaughter.numcow",
          "entrail.offal",
          "entrail.toe",
          "entrail.head",
          "entrail.skin",
          "entrail.liver",
          "entrail.fat",
          "entrail.onkale",
          "entrail.tail",
          "entrail.gallbladder",
          "entrail.scrap",
          "entrail.barcode",
          "user.name",
        ]),
      ],

      footer: function (currentPage, pageCount) {
        if (currentPage == pageCount) {
          return [
            {
              alignment: "justify",
              columns: [
                {
                  style: "confirm",
                  text: "ผู้พิมพ์รายงาน\n..........................................................\n( .......................................................... )\nตำแหน่ง..........................................................",
                },
                {
                  style: "confirm",
                  text: "ผู้รับรอง\n............................................................\n( .......................................................... )\nตำแหน่ง..........................................................",
                },
              ],
            },
          ];
        } else {
          return {
            // absolutePosition: { y: 20 },
            margin: [0, 50, 20, 0],
            text: `${currentPage.toString() + " of " + pageCount}`,
            alignment: "right",
          };
        }
      },
      defaultStyle: {
        font: "THSarabunNew",
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "justify",
        },

        date: {
          fontSize: 10,
          color: "black",
          alignment: "right",
        },
        printer: {
          fontSize: 10,
          color: "black",
          alignment: "left",
        },
        confirm: {
          fontSize: 14,
          color: "black",
          alignment: "center",
          margin: [0, 30, 0, 0],
        },
      },
    };
    pdfMake.createPdf(docDefinition).open();
  };
  return (
    <ButtonPDF type="button" value="print PDF" onClick={printPDF}>
      <Icon
        style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
        icon={printer}
        size={20}
      />
      รายงานPDF
    </ButtonPDF>
  );
};

export default Paper_export;
