import React, { useState } from "react";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  ButtonExcel,
  ButtonPDF,
} from "../ReportFrom";
import { DivBase } from "../../../../../utils/divBase";
import { Table } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Paper from "./paper";
import Excel from "./excel";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import dayjs from "dayjs";

export const EXPRODUCTSEARCH = gql`
  query EXPRODUCTSEARCH(
    $startdate: String
    $enddate: String
    $userName: String
    $producttype: String
  ) {
    exproductSearch(
      startdate: $startdate
      enddate: $enddate
      userName: $userName
      producttype: $producttype
    ) {
      id
      exportdate
      name
      user {
        name
      }
      beefproduct {
        weight
        barcode
        MFG
        BBE
        status {
          code
          nameTH
        }
        producttype {
          code
          nameTH
        }
      }
    }
  }
`;

const QUERYTYPE = gql`
  query QUERYTYPE {
    allproducttype {
      id
      code
      nameTH
    }
  }
`;

const index = () => {
  const [selectstartdate, setselectstartdate] = useState("");
  const [selectenddate, setselectenddate] = useState("");
  const [exporter, setexporter] = useState("");
  const [producttype, setproducttype] = useState("");
  const { data: type } = useQuery(QUERYTYPE);
  const { data } = useQuery(EXPRODUCTSEARCH, {
    variables: {
      startdate: selectstartdate,
      enddate: selectenddate,
      userName: exporter,
      producttype: producttype,
    },
  });
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          ออกรายงานเบิกออก
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr  1100px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          textAlign: "start",
        }}
      >
        {" "}
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "2",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={iosSearchStrong} />
            </div>
            ค้นหารายการ
          </DivFromTop>
          <DivFromDown>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <from style={{ fontSize: "20px" }}>
                <label
                  for="producttype"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  ประเภทสินค้า
                </label>
                <select
                  name="producttype"
                  id="producttype"
                  style={{
                    height: "35px",
                    width: "120px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  onChange={(event) => setproducttype(event.target.value)}
                >
                  <option value="">ทั้งหมด</option>
                  {type &&
                    type.allproducttype.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.nameTH}
                      </option>
                    ))}
                </select>
                <label
                  for="beef"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  ผู้ขอเบิก
                </label>
                <input
                  style={{
                    height: "35px",
                    width: "110px",
                    borderRadius: "4px",
                    border: "1px solid #AFAFAF",
                    fontSize: "14px",
                    textAlign: "center",
                    marginRight: "10px",
                  }}
                />
                <label
                  for="beef"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  ผู้เบิกออก
                </label>
                <input
                  style={{
                    height: "35px",
                    width: "110px",
                    borderRadius: "4px",
                    border: "1px solid #AFAFAF",
                    fontSize: "14px",
                    textAlign: "center",
                    marginRight: "10px",
                  }}
                  onChange={(event) => setexporter(event.target.value)}
                />
                <label
                  for="date"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  วันที่นำเข้า
                </label>
                <input
                  type="date"
                  id="startdate"
                  name="startdate"
                  style={{
                    height: "35px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",

                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  onChange={(event) => setselectstartdate(event.target.value)}
                />
                <label
                  for="date"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    margin: "10px 10px",
                  }}
                >
                  ถึงวันที่
                </label>
                <input
                  type="date"
                  id="enddate"
                  name="enddate"
                  style={{
                    height: "35px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                  onChange={(event) => setselectenddate(event.target.value)}
                />
              </from>
            </div>
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "3",
            gridRowEnd: "3",
            gridColumnStart: "2",
            gridColumnEnd: "2",
            marginTop: "10px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการนำเข้าซากเนื้อโคผ่าซีก
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: "380px", overflow: "auto" }}>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>ประเภทสินค้า</th>
                    <th>วันที่เบิกออก</th>
                    <th>เวลา</th>
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>น้ำหนัก (กก.)</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>ผู้ขอเบิก</th>
                    <th>ผู้เบิกออก</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.exproductSearch.length > 0 ? (
                    data.exproductSearch.map((prod) => (
                      <tr style={{ textAlign: "center" }}>
                        <td>{prod.beefproduct.producttype.nameTH}</td>
                        <td>
                          {dayjs(prod.exportdate)
                            .locale("th")
                            .add(543, "year")
                            .format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {dayjs(prod.exportdate)
                            .locale("th")
                            .add(543, "year")
                            .format("h:mm:ss A")}
                        </td>
                        <td>{prod.beefproduct.producttype.code}</td>
                        <td>{prod.beefproduct.barcode}</td>
                        <td>{prod.beefproduct.weight}</td>
                        <td>
                          {dayjs(prod.beefproduct.MFG)
                            .locale("th")
                            .add(543, "year")
                            .format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {dayjs(prod.beefproduct.BBE)
                            .locale("th")
                            .add(543, "year")
                            .format("DD/MM/YYYY")}
                        </td>
                        <td>{prod.name}</td>
                        <td>{prod.user.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {data && data.exproductSearch.length > 0 ? (
                <>
                  <Paper prod={data.exproductSearch} />
                  <Excel prod={data.exproductSearch} />
                </>
              ) : (
                "-"
              )}
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
