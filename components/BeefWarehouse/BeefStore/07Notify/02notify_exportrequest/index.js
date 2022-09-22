import React from "react";

import Sidemenu from "../Nav_notify";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor, DivBase1 } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

import { Removebuttoncolor } from "../../../../../utils/buttonColor";
import { Removebutton } from "../../../../../utils/button";
import Listrequest from "./listrequest"
import ListRequestP from "./listRequestP";

import Deltereq from "./deletereq";
import Paper_request from "./paper_request";
import Paper_requestP from "./paper_requestP";

export const QUERYREQUESTEX = gql`
  query QUERYREQUESTEX {
    listRequestEx {
    typemeat
    id
    name
    beeftype {
      code
      nameTH
    }
    requestdate
    grade
    status {
      id
      nameTH
    }
  }
  }
`;

export const QUERYLISTP = gql`
query QUERYLISTP {
  listRequestProduct {
    id
    name
    typemeat
    beeftype {
      nameTH
      code
    }
    requestdate
    status {
      id
      nameTH
    }
  }
}
`

const index = () => {
  const { data } = useQuery(QUERYREQUESTEX);
  const { data: data1 } = useQuery(QUERYLISTP);
  // console.log(data1)
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
          gridTemplateColumns: "1fr 237.5px 900px 1fr",
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
            รายการคำร้องขอเบิกนำจำหน่าย
          </DivFromTop>
          <DivFromDown>
            <div
              style={{ height: `${data && data.listRequestEx.length > 5 ? "300px" : ""}`, overflow: "auto" }}
            >
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>วันที่ร้องขอเบิก</th>
                    <th>ซากโค</th>
                    <th>ประเภทซาก</th>
                    <th>รหัสซาก</th>
                    <th>เกรด</th>
                    <th>ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.listRequestEx.length > 0 ? (
                    data.listRequestEx.map((prod) => (
                      <Listrequest key={prod.id} listre={prod} />
                    ))) : (<tr style={{ textAlign: "center" }}>
                      <td colSpan="6">ไม่พบข้อมูล</td>
                    </tr>)
                  }
                </tbody>
              </Table>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {data && data.listRequestEx.length > 0 ? (
                <div>
                  <Paper_request prod={data.listRequestEx} />
                </div>
              ) : (
                ""
              )}
            </div>
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "4",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการคำร้องขอเบิกแปรรูป
          </DivFromTop>
          <DivFromDown>
            <div
              style={{ height: `${data1 && data1.listRequestProduct.length > 5 ? "300px" : ""}`, overflow: "auto" }}
            >
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>วันที่ร้องขอเบิก</th>
                    <th>ซากโค</th>
                    <th>ประเภทซาก</th>
                    <th>รหัสซาก</th>
                    <th>ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {data1 && data1.listRequestProduct.length > 0 ? (
                    data1.listRequestProduct.map((prod) => (
                      <ListRequestP key={prod.id} list={prod} />

                    ))) : (<tr style={{ textAlign: "center" }}>
                      <td colSpan="6">ไม่พบข้อมูล</td>
                    </tr>)
                  }
                </tbody>
              </Table>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {data1 && data1.listRequestProduct.length > 0 ? (
                <div>
                  <Paper_requestP prod={data1.listRequestProduct} />
                </div>
              ) : (
                ""
              )}
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase1>
    </div >
  );
};

export default index;
