import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { AuthContext } from "../../../../appState/AuthProvider";

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

const Index = ({ prod }) => {
  const [data, setdata] = useState(prod);
  const { user } = useContext(AuthContext);

  if (data !== prod) setdata(prod);

  // console.log(data)
  // console.log(prod)
  const buildTableBody = (data, columns) => {
    var body = [];

    body.push([
      "บาร์โค๊ด",
      "ประเภทเนื้อ",
      "เกรด",
      "น้ำหนัก",
      "ราคา",
      "วันผลิต",
      "วันหมดอายุ",
    ]);
    // console.log(data)

    data.forEach(function (row) {
      // console.log(row)
      var dataRow = [];

      columns.forEach(function (column) {
        if (column === "createdAt") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else if (column === "beeftype.nameTH") {
          dataRow.push(row.beeftype.nameTH);
        } else if (column === "imslaughter.grade") {
          dataRow.push(row.imslaughter.grade);
        } else if (column === "price") {
          dataRow.push(
            row[column].toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
        } else if (column === "BBE") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else {
          // console.log(column);
          // console.log(row[column]);
          // console.log(row.imslaughter.numkun);
          // console.log(imslaughter.numkun
          //   dayjs(row[column]).add(543, "y").locale("th").format("DD-MMMM-YYYY")
          // );
          dataRow.push(row[column]);
        }
      });
      // dataRow.push({colSpan: 7, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time'})
      body.push(dataRow);
    });

    return body;
  };

  const table = (data, columns) => {
    // console.log(data)
    return {
      table: {
        headerRows: 1,
        widths: ["auto", "star", "auto", "auto", "auto", "star", "star"],

        body: buildTableBody(data, columns),
      },
      layout: "headerLineOnly",
      fontSize: 15,
      alignment: "center",
      // margin: [0, 0, 0, 60],
      // pageBreak: 'after',
    };
  };

  const printPDF = () => {
    var docDefinition = {
      pageMargins: [ 40, 60, 40, 90 ],
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
          text: "รายงานสรุปชิ้นเนื้อ\n\n",
          style: "header",
          alignment: "center",
        },
        table(data, [
          "barcode",
          "beeftype.nameTH",
          "imslaughter.grade",
          "weight",
          "price",
          "createdAt",
          "BBE",
        ]),
      ],

       footer: function(currentPage, pageCount) {
        if(currentPage == pageCount) {
            return [{
              alignment: "justify",
                columns: [
                  {
                    style: "confirm",
                    text:
                      "ผู้พิมพ์รายงาน\n..........................................................\n( .......................................................... )\nตำแหน่ง..........................................................",
                  },
                  {
                    style: "confirm",
                    text:
                      "ผู้รับรอง\n............................................................\n( .......................................................... )\nตำแหน่ง..........................................................",
                  },
                ],
            },
            // {
            //   absolutePosition: {x:-80, y: 50 },
            //   text: `${currentPage.toString() + ' of ' + pageCount}`, 
            //   alignment: 'right'
            // }
          ]
      } else {
        return {
          // absolutePosition: { y: 20 },
          margin: [0, 50, 20, 0],
          text: `${currentPage.toString() + ' of ' + pageCount}`, 
          alignment: 'right'
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
          alignment: "center",
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
          margin: [0, 0, 0, 0],
        },
      },
    };
    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <input
      type="button"
      style={{ float: "right", marginBottom: "5px" }}
      value="print PDF"
      onClick={printPDF}
    />
  );
};

export default Index;
