import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

export const QUERY_EXHALVEDAY = gql`
  query QUERY_EXHALVEDAY {
    CardExh {
      id
      importdate
      user {
        name
      }
      halve {
        weightwarm
        weightcool
        beeftype {
          nameTH
          code
        }
        imslaughter {
          numcow
          namefarmer
        }
        barcode
        status {
          nameTH
        }
      }
      beefroom {
        roomname
      }
    }
  }
`;

const halveday = () => {
  const { data } = useQuery(QUERY_EXHALVEDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการเบิกออกซากโคผ่าซีก (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{
            margin: "auto",
            minWidth: "100%",
            float: "right",
            marginBottom: "15px",
          }}
        >
          <Table striped bordered responsive hover style={{ margin: "auto" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>เจ้าของซาก</th>
                <th>ประเภทซาก</th>
                <th>วันที่นำเข้า</th>
                <th>เวลา</th>
                <th>ทะเบียนขุน</th>
                <th>รหัสซาก</th>
                <th>รหัสบาร์โค้ด</th>
                <th>น้ำหนัก</th>
                <th>ห้อง</th>
                <th>ชั้น</th>
                <th>ตะกร้า</th>
                <th>สถานะ</th>
                <th>ผู้นำเข้า</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.CardImh.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>
                      {prod.halve.imslaughter.namefarmer
                        ? prod.halve.imslaughter.namefarmer
                        : "-"}
                    </td>
                    <td>
                      {prod.halve.beeftype.nameTH
                        ? prod.halve.beeftype.nameTH
                        : "-"}
                    </td>
                    <td>
                      {dayjs(prod.importdate)
                        .add(543, "year")
                        .format("DD/MM/YYYY")
                        ? dayjs(prod.importdate)
                            .add(543, "year")
                            .format("DD/MM/YYYY")
                        : "-"}
                    </td>
                    <td>
                      {dayjs(prod.importdate)
                        .add(543, "year")
                        .format("h:mm:ss A")
                        ? dayjs(prod.importdate)
                            .add(543, "year")
                            .format("h:mm:ss A")
                        : "-"}
                    </td>
                    <td>
                      {prod.halve.imslaughter.numcow
                        ? prod.halve.imslaughter.numcow
                        : "-"}
                    </td>
                    <td>
                      {prod.halve.beeftype.code
                        ? prod.halve.beeftype.code
                        : "-"}
                    </td>
                    <td>{prod.halve.barcode ? prod.halve.barcode : "-"}</td>
                    <td>
                      {prod.halve.weightwarm ? prod.halve.weightwarm : "-"}
                    </td>
                    <td>
                      {prod.beefroom.roomname ? prod.beefroom.roomname : "-"}
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {prod.halve.status.nameTH
                        ? prod.halve.status.nameTH
                        : "-"}
                    </td>
                    <td>{prod.user.name ? prod.user.name : "-"}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </DivFromDown>
    </div>
  );
};

export default halveday;
