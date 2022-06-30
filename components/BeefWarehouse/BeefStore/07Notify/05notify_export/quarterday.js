import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { NavItem, Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";
import dayjs from "dayjs";

import Modalqrcode from "../../12Qrcode/Notify/Export/exqqr";

export const QUERY_EXQUARTERDAY = gql`
  query QUERY_EXQUARTERDAY {
    CardExq {
      id
      exporter
      exportdate
      user {
        name
      }
      quarter {
        weight
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
      storestatus {
        nameTH
      }
    }
  }
`;

const quarterday = () => {
  const { data } = useQuery(QUERY_EXQUARTERDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการเบิกออกซากโคสี่เสี้ยว (วัน)
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
                <th>ประเภทซาก</th>
                <th>วันที่เบิกออก</th>
                <th>เวลา</th>
                <th>ทะเบียนขุน</th>
                <th>รหัสซาก</th>
                <th>รหัสบาร์โค้ด</th>
                <th>รหัสคิวอาร์โค้ด</th>
                <th>น้ำหนัก (กก.)</th>
                <th>สถานะ</th>
                <th>ผู้ขอเบิก</th>
                <th>ผู้เบิกออก</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardExq.length > 0 ? (
                data.CardExq.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.quarter.beeftype.nameTH}</td>
                    <td>
                      {dayjs(prod.exportdate)
                        .add(543, "year")
                        .format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {dayjs(prod.exportdate)
                        .add(543, "year")
                        .format("h:mm:ss A")}
                    </td>
                    <td>{prod.quarter.imslaughter.numcow}</td>
                    <td>{prod.quarter.beeftype.code}</td>
                    <td>{prod.quarter.barcode}</td>
                    <td>
                      <Modalqrcode key={prod.id} notifyquarter={prod} />
                    </td>
                    <td>{prod.quarter.weight}</td>
                    <td>{prod.storestatus.nameTH}</td>
                    <td>{prod.exporter}</td>
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
      </DivFromDown>
    </div>
  );
};

export default quarterday;
