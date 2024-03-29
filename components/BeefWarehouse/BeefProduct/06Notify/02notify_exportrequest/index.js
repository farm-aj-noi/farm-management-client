import React from "react";

import Sidemenu from "../Nav_notify";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

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
import ListrequestP from "./listrequestP";

export const QUERYREQUESTEXPORT = gql`
query QUERYREQUESTEXPORT {
  listRequestExP {
    id
    name
    producttype {
      code
      nameTH
    }
    status {
      id
      nameTH
    }
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
            <div style={{ height: `${data && data.listRequestExP.length > 9 ? "500px" : ""}`, overflow: `${data && data.listRequestExP.length > 9 ? "auto" : ""}` }}>
              <Table striped bordered responsive hover style={{ margin: "auto" }}>
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>วันที่ขอเบิก</th>
                    <th>ประเภทสินค้า</th>
                    <th>รหัสสินค้า</th>
                    <th>ดำเนินรายการ</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.listRequestExP.length > 0 ? (
                    data.listRequestExP.map((prod) => (
                      <ListrequestP key={prod.id} listrqP={prod} />
                    ))) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="4">ไม่พบข้อมูล</td>
                    </tr>
                  )
                  }
                </tbody>
              </Table>
            </div>
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
