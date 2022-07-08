import React, { useState, useContext } from "react";

import { AuthContext } from "../../../../../appState/AuthProvider";

import dayjs from "dayjs";
import "dayjs/locale/th";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { ButtonExcel } from "../NavFrom";

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

const paperh = ({ prod }) => {
  const [data, setdata] = useState(prod);
  const { user } = useContext(AuthContext);

  if (data !== prod) setdata(prod);
  /* console.log(data)
   console.log(prod)  */

  const buildTableBody = (data, columns) => {
    var body = [];

    body.push(["ประเภทซาก", "รหัสซาก", "รหัสบาร์โค้ด", "ห้อง", "วันหมดอายุ"]);
    console.log(data);

    data.forEach(function (row) {
      console.log(row);
      var dataRow = [];

      columns.forEach(function (column) {
        if (column === "Expdate") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else if (column === "halve.beeftype.nameTH") {
          dataRow.push(row.halve.beeftype.nameTH);
        } else if (column === "halve.beeftype.code") {
          dataRow.push(row.halve.beeftype.code);
        } else if (column === "halve.barcode") {
          dataRow.push(row.halve.barcode);
        } else if (column == "beefroom.roomname") {
          dataRow.push(row.beefroom.roomname);
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
        widths: ["star", "star", "star", "star", "star"],

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
          text: "รายงานนำเข้าซากโคผ่าซีก\n\n",
          style: "header",
          alignment: "center",
        },
        table(data, [
          "halve.beeftype.nameTH",
          "halve.beeftype.code",
          "halve.barcode",
          "beefroom.roomname",
          "Expdate",
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
    <ButtonExcel type="button" value="print PDF" onClick={printPDF}>
      <Icon
        style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
        icon={printer}
        size={20}
      />
      พิมพ์รายการ
    </ButtonExcel>
  );
};

export default paperh;
