import React from "react";

import Sidemenu from "../Nav_notify";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  DivBase1,
} from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Deletereq from "./deleterequest";
import Paper from "./paper";

import dayjs from "dayjs";

export const QUERYREQUESTEXPORT = gql`
query QUERYREQUESTEXPORT {
  listRequestExP {
    id
    producttype {
      nameTH
      code
    }
    quantity
    name
    requestdate
  }
}
`;
const index = () => {
  const { data } = useQuery(QUERYREQUESTEXPORT);
  return (
    <div style={{ marginTop: "100px" }}>
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
          การแจ้งเตือน
        </HeaderColor>
      </div>
      <DivBase1
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 1000px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "50px",
          textAlign: "start",
          /*  width:"950px",
        margin:"auto" */
        }}
      >
        <Sidemenu Sidenumber={2} />
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการคำร้องขอเบิก
          </DivFromTop>
          <DivFromDown>
            {" "}
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>วันที่ขอเบิก</th>
                  <th>ชื่อผู้ขอเบิก</th>
                  <th>ประเภทสินค้า</th>
                  <th>รหัสสินค้า</th>
                  <th>จำนวน</th>
                  <th>ลบ</th>
                </tr>
              </thead>
              <tbody>
                {data && data.listRequestExP.map((prod) => (
                  <tr style={{ textAlign: "center" }}>
                    <td>{dayjs(prod.requestdate)
                      .add(543, "year")
                      .format("DD/MM/YYYY")}</td>
                    <td>{prod.name}</td>
                    <td>{prod.producttype.nameTH}</td>
                    <td>{prod.producttype.code}</td>
                    <td>{prod.quantity}</td>
                    <td>
                      <Deletereq key={prod.id} listre={prod} />
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {data && data.listRequestExP.length > 0 ? (<Paper prod={data.listRequestExP} />) : ("")}

            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase1>
    </div>
  );
};

export default index;
