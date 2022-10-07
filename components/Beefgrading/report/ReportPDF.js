import React, { useState, useContext } from "react";

import dayjs from "dayjs";
import "dayjs/locale/th";
import { AuthContext } from "../../../appState/AuthProvider";
import { ButtonPDF } from "./buttom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { QUERYLOGOGRADE } from "../Setting/System1/detailsetting";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Pdf } from "../../../utils/Logograde";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

function ReportPDF({ prod }) {
  const [data, setdata] = useState(prod);
  const { data: logo } = useQuery(QUERYLOGOGRADE);
  console.log(logo);
  const { user } = useContext(AuthContext);
  if (data !== prod) setdata(prod);
  const buildTableBody = (data, columns) => {
    var body = [];

    body.push([
      "รหัสซากโค",
      "บาร์โค้ด",
      "น้ำหนักอุ่น Kg.",
      "วันที่เข้าบ่ม",
      "วันที่ตัดเกรด",
      "ห้องบ่ม",
      "สายพันธุ์",
      "เกรดจากระบบ",
      "เกรดจากผู้เชี่ยวชาญ",
    ]);
    /* console.log(data); */

    data.forEach(function (row) {
      var dataRow = [];
      columns.forEach(function (column) {
        if (column === "beeftype.code") {
          dataRow.push(row.beeftype.code);
        } else if (column === "chill[0].chilldateStart") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD-MM-YYYY")
          );
        } else if (column === "chill[0].chilldateEnd") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD-MM-YYYY")
          );
        } else if (column === "chill[0].chillroom.roomnum") {
          dataRow.push(row.chill[0].chillroom.roomnum);
        } else if (column === "imslaughter.pun") {
          dataRow.push(row.imslaughter.pun);
        } else if (column === "grade[0].SystemGrade") {
          dataRow.push(row.grade[0].SystemGrade);
        } else if (column === "grade[0].ExpertGrade") {
          dataRow.push(row.grade[0].ExpertGrade);
        } else {
          console.log(row[column]);
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
          "star",
          "auto",
          "star",
          "star",
          "auto",
          "auto",
          "star",
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
      pageOrientation: "portrait",
      pageMargins: [40, 40, 40, 120],
      content: [
        {
          columns: [
            // {
            //   image: `${reportlogo1 && reportlogo1.reportlogo[0].logo}`,
            //   width: 50,
            //   height: 50,
            //   style: "printer",
            // },
            {
              // auto-sized columns have their widths based on their content
              width: 150,
              text: `${logo && logo.gradeLogo[0].address}`,
              /* text: `ผู้พิมพ์ ${user.name}`, */
              style: "printer",
            },
            {
              // auto-sized columns have their widths based on their content
              width: "*",
              text: `${dayjs()
                .add(543, "y")
                .locale("th")
                .format("วันที่พิมพ์ วันdddd ที่ DD เดือนMMMM พ.ศ.YYYY")}`,
              style: "date",
            },
          ],
          columnGap: 10,
        },
        {
          image: `${logo && logo.gradeLogo[0].logo}`,
          width: 100,
          height: 100,
          alignment: "center",
        },

        {
          text: "รายงานประวัติการตัดเกรด\n\n",
          style: "header",
          alignment: "center",
        },
        table(data, [
          "beeftype.code",
          "barcode",
          "weightwarm",
          "chill[0].chilldateStart",
          "chill[0].chilldateEnd",
          "chill[0].chillroom.roomnum",
          "imslaughter.pun",
          "grade[0].SystemGrade",
          "grade[0].ExpertGrade",
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
                  text: `ผู้พิมพ์รายงาน\n..........................................................\n( .......................................................... )\nตำแหน่ง ${user.name}`,
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
    <div>
      <button style={{border: "none", backgroundColor: "#fff"}} type="button" value="print PDF" onClick={printPDF}>
      <Pdf height="40px" weight="40px" />
      </button>
    </div>
  );
}

export default ReportPDF;
