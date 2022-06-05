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
const Paper_import = ({ prod }) => {
  const [data, setdata] = useState(prod);
  const { user } = useContext(AuthContext);

  if (data !== prod) setdata(prod);
  /* console.log(data)
   console.log(prod)  */

  const buildTableBody = (data, columns) => {
    var body = [];

    body.push([
      "เจ้าของซาก",
      "ประเภทซาก",
      "วันที่นำเข้า",
      "ทะเบียนขุน",
      "รหัสซาก",
      "รหัสบาร์โค้ด",
      "น้ำหนัก (กก.)",
      "ห้อง",
      "ชั้น",
      "ตะกร้า",
      "สถานะ",
      "ผู้นำเข้า",
    ]);
    console.log(data);

    data.forEach(function (row) {
      console.log(row);
      var dataRow = [];

      columns.forEach(function (column) {
        if (column === "importdate") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else if (column === "chop.imslaughter.namefarmer") {
          dataRow.push(row.chop.imslaughter.namefarmer);
        } else if (column === "beefroom.roomname") {
          dataRow.push(row.beefroom.roomname);
        } else if (column === "shelf.shelfname") {
          dataRow.push(row.shelf.shelfname);
        } else if (column === "chop.beeftype.nameTH") {
          dataRow.push(row.chop.beeftype.nameTH);
        } else if (column == "chop.imslaughter.numcow") {
          dataRow.push(row.chop.imslaughter.numcow);
        } else if (column === "chop.beeftype.code") {
          dataRow.push(row.chop.beeftype.code);
        } else if (column === "chop.barcode") {
          dataRow.push(row.chop.barcode);
        } else if (column === "chop.weight") {
          dataRow.push(row.chop.weight);
        } else if (column === "chop.status.nameTH") {
          dataRow.push(row.chop.status.nameTH);
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
          "auto",
          "star",
          "star",
          "auto",
          "auto",
          "auto",
          "star",
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
          text: "รายงานนำเข้าซากโคชิ้นเนื้อ\n\n",
          style: "header",
          alignment: "center",
        },
        table(data, [
          "chop.imslaughter.namefarmer",
          "chop.beeftype.nameTH",
          "importdate",
          "chop.imslaughter.numcow",
          "chop.beeftype.code",
          "chop.barcode",
          "chop.weight",
          "beefroom.roomname",
          "shelf.shelfname",
          "basket",
          "chop.status.nameTH",
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

export default Paper_import;
