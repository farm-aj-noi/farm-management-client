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
      "ใบแจ้งขุน",
      "เบอร์โค",
      "พันธุ์",
      "รหัสสมาชิก",
      "ชื่อสมาชิก",
      "น้ำหนักโค (กก.)",
      "ราคาประเมิน",
      "วันที่ส่งเชือด",                   

    ]);
    // console.log(data)

    data.forEach(function (row) {
      // console.log(row)
      var dataRow = [];

      columns.forEach(function (column) {
        if (column === "importDate") {
          dataRow.push(
            dayjs(row[column]).add(543, "y").locale("th").format("DD MMMM YYYY")
          );
        } else {
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
          "auto",
          "auto",
          "*",
          "auto",
          "auto",
          90,
        ],
        body: buildTableBody(data, columns),
      },
      layout: "headerLineOnly",
      fontSize: 15,
      alignment: "center",
    };
  };

  const printPDF = () => {
    var docDefinition = {
      pageMargins: [ 40, 40, 40, 120 ],
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
          text: "รายงานสรุปการรับโคเข้าเชือด\n\n",
          style: "header",
          alignment: "center",
        },
        table(data, [
          "numkun",
          "numcow",
          "pun",
          "numfarmer",
          "namefarmer",
          "weight",
          "price", 
          "importDate",
        ]),
        // {
        //   alignment: "justify",
        //   absolutePosition: {x: 40, y: 650},
        //   columns: [
        //     {
        //       style: "confirm",
        //       text:
        //         "ผู้พิมพ์รายงาน\n\n..........................................................\n\n( .......................................................... )\nตำแหน่ง..........................................................",
        //     },
        //     {
        //       style: "confirm",
        //       text:
        //         "ผู้รับรอง\n\n..........................................................\n\n( .......................................................... )\nตำแหน่ง..........................................................",
        //     },
        //   ],
        // },
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
    <input
      type="button"
      style={{ float: "right", marginBottom: "5px" }}
      value="print PDF"
      onClick={printPDF}
    />
  );
};

export default Index;
