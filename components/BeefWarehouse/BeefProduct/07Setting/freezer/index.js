import React from "react";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
} from "../SettingFrom";
import { DivBase } from "../../../../../utils/divBase";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import Nav_seting from "../Nav_setting";

import Create from "./create"
import List from "./listfreezer"
import { Table } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { cog } from 'react-icons-kit/entypo/cog'

export const QUERYFREEZER = gql`
query QUERYFREEZER {
  allFreezer {
    id
    freezername
    productroom {
      roomname
    }
  }
}
`;

const index = () => {
  const { data } = useQuery(QUERYFREEZER);
/*   console.log(data) */
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          การตั้งค่า
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 550px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "20px",
          textAlign: "start",
        }}
      >
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_seting />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          {" "}
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px -5px" }}>
              <Icon size={20} icon={cog} />
            </div>
            ตั้งค่าชั้นจัดเก็บ
          </DivFromTop>
          <DivFromDown>
            <Create />
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_seting />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "3",
            gridRowEnd: "4",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          {" "}
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการชั้นจัดเก็บ
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.allFreezer.length > 8 ? "460px" : ""}`, overflow: `${data && data.allFreezer.length > 8 ? "auto" : ""}` }}>
              <Table striped bordered responsive hover style={{ margin: "auto" }}>
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>ชื่อชั้นจัดเก็บ</th>
                    <th>ชื่อตู้แช่จัดเก็บ</th>
                    <th>แก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.allFreezer.length > 0 ? (
                    data.allFreezer.map((prod) => (
                      <List key={prod.id} listf={prod} />
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="4">ไม่พบข้อมูล</td>
                    </tr>
                  )
                  }
                </tbody>
              </Table>
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
