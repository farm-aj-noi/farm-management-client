import React from "react";
import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const EXPORTHALVESSEARCH = gql`
  query EXPORTHALVESSEARCH {
    exporthalve {
      id
      halve {
        weightwarm
        weightcool
      }
    }
  }
`;

export const CREATEEXPORTLUMP = gql`
  query CREATEEXPORTLUMP {
    exportlump {
      id
      lump {
        weight
      }
    }
  }
`;

export const EXPORTQUARTERSEARCH = gql`
  query EXPORTQUARTERSEARCH {
    exportquart {
      id
      quarter {
        weight
      }
    }
  }
`;

export const EXPORTCHOPSEARCH = gql`
  query EXPORTCHOPSEARCH {
    exportchop {
      id
      chop {
        weight
      }
    }
  }
`;

export const EXPORTENTRAILSEARCH = gql`
  query EXPORTENTRAILSEARCH {
    exportentrail {
      id
    }
  }
`;

const statistics = () => {
  const { data: datahalve } = useQuery(EXPORTHALVESSEARCH);
  const { data: datalump } = useQuery(CREATEEXPORTLUMP);
  const { data: dataquarter } = useQuery(EXPORTQUARTERSEARCH);
  const { data: datachop } = useQuery(EXPORTCHOPSEARCH);
  const { data: dataen } = useQuery(EXPORTENTRAILSEARCH);
  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "24px" }}>
          สถิติการเบิกออก (ทั้งหมด)
        </h1>

        <Table striped bordered responsive hover>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>ประเภท</th>
              <th>จำนวน</th>
              <th>น้ำหนักอุ่น / เย็น (กก.)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "center" }}>
              <td>ซากโคผ่าซีก</td>
              <td>{datahalve ? datahalve.exporthalve.length : "0"}</td>
              <td>
                {datahalve &&
                  datahalve.exporthalve.reduce(
                    (sum, nex) => sum + nex.halve.weightwarm,
                    0
                  )}{" "}
                /{" "}
                {datahalve &&
                  datahalve.exporthalve.reduce(
                    (sum, nex) => sum + nex.halve.weightcool,
                    0
                  )}
              </td>
            </tr>

            <tr style={{ textAlign: "center" }}>
              <td>ซากโคสี่เสี้ยว</td>
              <td>{dataquarter ? dataquarter.exportquart.length : "0"}</td>
              <td>
                0 /{" "}
                {dataquarter &&
                  dataquarter.exportquart.reduce(
                    (sum, nex) => sum + nex.quarter.weight,
                    0
                  )}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td>ก้อนเนื้อ</td>
              <td>{datalump ? datalump.exportlump.length : "0"}</td>
              <td>
                0 /{" "}
                {datalump &&
                  datalump.exportlump.reduce(
                    (sum, nex) => sum + nex.lump.weight,
                    0
                  )}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td>ชิ้นเนื้อ</td>
              <td>{datachop ? datachop.exportchop.length : "0"}</td>
              <td>
                0 /{" "}
                {datachop &&
                  datachop.exportchop.reduce(
                    (sum, nex) => sum + nex.chop.weight,
                    0
                  )}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td>ส่วนอื่น ๆ</td>
              <td>{dataen ? dataen.exportentrail.length : "0"}</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default statistics;
