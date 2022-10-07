import React, { useState, useContext } from "react";

import { AuthContext } from "../../../../../appState/AuthProvider";

import dayjs from "dayjs";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { ButtonPDF } from "../ReportFrom";
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

const paper = ({ prod }) => {
  const [data, setdata] = useState(prod);
  const { user } = useContext(AuthContext);
  const { data: reportlogo1 } = useQuery(QUERYREPORTSETTTING);

  if (data !== prod) setdata(prod);
  /* console.log(data)
   console.log(prod)  */

  const buildTableBody = (data, columns) => {
    var body = [];

    body.push([
      "ประเภทสินค้า",
      "วันที่นำเข้า",
      "รหัสสินค้า",
      "รหัสบาร์โค้ด",
      "น้ำหนัก (กก.)",
      "วันที่ผลิต",
      "วันหมดอายุ",
      "ตู้แช่",
      "ชั้น",
      "ตะกร้า",
      "ผู้นำเข้า",
    ]);
   /*  console.log(data); */

    data.forEach(function (row) {
      /* console.log(row); */
      var dataRow = [];

      columns.forEach(function (column) {
        if (column === "importdate") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else if (column === "beefproduct.MFG") {
          dataRow.push(
            dayjs(row.beefproduct.MFG)
              .add(543, "y")
              .locale("th")
              .format("DD MMMM YYYY")
          );
        } else if (column === "beefproduct.BBE") {
          dataRow.push(
            dayjs(row.beefproduct.BBE)
              .add(543, "y")
              .locale("th")
              .format("DD MMMM YYYY")
          );
        } else if (column === "beefproduct.producttype.nameTH") {
          dataRow.push(row.beefproduct.producttype.nameTH);
        } else if (column == "beefproduct.producttype.code") {
          dataRow.push(row.beefproduct.producttype.code);
        } else if (column === "beefproduct.barcode") {
          dataRow.push(row.beefproduct.barcode);
        } else if (column === "halve.barcode") {
          dataRow.push(row.beefproduct.weight);
        } else if (column === "beefproduct.weight") {
          dataRow.push(row.beefproduct.weight);
        } else if (column === "productroom.roomname") {
          dataRow.push(row.productroom.roomname);
        } else if (column === "freezer.freezername") {
          dataRow.push(row.freezer.freezername);
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
        {
          text: "รายงานนำเข้าผลิตภัณฑ์\n\n",
          style: "header",
          alignment: "center",
        },
        table(data, [
          "beefproduct.producttype.nameTH",
          "importdate",
          "beefproduct.producttype.code",
          "beefproduct.barcode",
          "beefproduct.weight",
          "beefproduct.MFG",
          "beefproduct.BBE",
          "productroom.roomname",
          "freezer.freezername",
          "pbasket",
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
      <ButtonPDF type="button" value="print PDF" onClick={printPDF}>
        <Icon
          style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
          icon={printer}
          size={20}
        />
        รายงานPDF
      </ButtonPDF>
    </div>
  );
};

export default paper;
