import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../../../../appState/AuthProvider";

import dayjs from "dayjs";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { ButtonPDF } from "../ReportFrom";

import Image from "../../../../../images/logo/logo-store.png";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const QUERYREPORTSETTTING = gql`
query QUERYREPORTSETTTING {
  reportlogo {
    logo
    address
  }
}
`

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

const Paper_chill = ({ prod }) => {
  const [data, setdata] = useState(prod);
  const { user } = useContext(AuthContext);
  const { data: reportlogo1 } = useQuery(QUERYREPORTSETTTING);


  /* 
    const getBase64FromUrl = async (url) => {
  
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        }
      }
      );
    }
  
    const test = async () => {
      const result = await getBase64FromUrl(reportlogo1 && reportlogo1.reportlogo[0].logo);
      console.log(result)
      return result
    } */

  /*   getBase64FromUrl(test).then(console.log) */
  /* const test = getBase64FromUrl(reportlogo1 && reportlogo1.reportlogo[0].address)
  console.log(test)



  if (data !== prod) setdata(prod);
  /* console.log(data)
   console.log(prod)  */

  const buildTableBody = (data, columns) => {
    var body = [];

    body.push([
      "ผู้บ่มซาก",
      "วันที่บ่ม",
      "วันที่บ่มเสร็จ",
      "ประเภทซาก",
      "จำนวนวันที่บ่ม",
      "ทะเบียนขุน",
      "รหัสซาก",
      "รหัสบาร์โค้ด",
      "น้ำหนักอุ่น",
      "ห้องบ่ม",
      "สถานะ",
    ]);
    // console.log(data);

    data.forEach(function (row) {
      // console.log(row);
      var dataRow = [];

      columns.forEach(function (column) {
        if (column === "chilldateEnd") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else if (column === "chilldateStart") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else if (column === "halve.beeftype.nameTH") {
          dataRow.push(row.halve.beeftype.nameTH);
        } else if (column === "chillday.day") {
          dataRow.push(row.chillday.day);
        } else if (column == "halve.imslaughter.numcow") {
          dataRow.push(row.halve.imslaughter.numcow);
        } else if (column === "halve.beeftype.code") {
          dataRow.push(row.halve.beeftype.code);
        } else if (column === "halve.barcode") {
          dataRow.push(row.halve.barcode);
        } else if (column === "halve.weightwarm") {
          dataRow.push(row.halve.weightwarm);
        } else if (column === "chillstatus.nameTH") {
          dataRow.push(row.chillstatus.nameTH);
        } else if (column === "user.name") {
          dataRow.push(row.user.name);
        } else if (column === "chillroom.roomnum") {
          dataRow.push(row.chillroom.roomnum);
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
          "star",
          "star",
          "star",
          "star",
          "auto",
          "star",
          "auto",
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
    /*    getBase64FromUrl(test).then(console.log) */
    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [40, 40, 40, 120],

      content: [
        {
          columns: [
            {
              image: `${reportlogo1 && reportlogo1.reportlogo[0].logo}`,
              width: 50,
              height: 50,
              style: "printer"
            },
            {
              // auto-sized columns have their widths based on their content
              width: 150,
              text: `${reportlogo1 && reportlogo1.reportlogo[0].address}`,
              /* text: `ผู้พิมพ์ ${user.name}`, */
              style: "printer",
            },
            {
              // auto-sized columns have their widths based on their content
              width: "*",
              text: `${dayjs()
                .add(543, "y")
                .locale("th")
                .format("วันที่พิมพ์ วันdddd ที่ DD เดือนMMMM พ.ศ.YYYY")
                }`,
              style: "date",
            },
          ],
          columnGap: 10
        },
        /* {
          columns: [
            {

            },
            {
              // auto-sized columns have their widths based on their content
              width: "*",
              text: `${dayjs()
                .add(543, "y")
                .locale("th")
                .format("วันที่พิมพ์ วันdddd ที่ DD เดือนMMMM พ.ศ.YYYY")
                }`,
              style: "date",
            },
          ]
        }, */
        /*  {
           image: `${reportlogo1 && reportlogo1.reportlogo[0].logo}`,
           width: 100,
           height: 100,
           alignment: "center",
         }, */
        {
          text: "รายงานบ่มซาก\n\n",
          style: "header",
          alignment: "center",
          margin: 0,
        },
        table(data, [
          "user.name",
          "chilldateStart",
          "chilldateEnd",
          "halve.beeftype.nameTH",
          "chillday.day",
          "halve.imslaughter.numcow",
          "halve.beeftype.code",
          "halve.barcode",
          "halve.weightwarm",
          "chillroom.roomnum",
          "chillstatus.nameTH",
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
                  text: `ผู้พิมพ์รายงาน\n..........................................................\n(..........................................................) \nตำแหน่ง ${user.name} `,
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
            text: `${currentPage.toString() + " of " + pageCount} `,
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

export default Paper_chill;
