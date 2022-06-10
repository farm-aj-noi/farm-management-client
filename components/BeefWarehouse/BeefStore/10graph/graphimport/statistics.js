import React from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const IMPORTHALVESEARCH = gql`
  query IMPORTHALVESEARCH {
    imhalveSearch {
      id
      halve {
        weightwarm
        weightcool
      }
    }
  }
`;

export const IMPORTQUARTERSEARCH = gql`
  query IMPORTQUARTERSEARCH {
    imquartSearch {
      id
      quarter {
        weight
      }
    }
  }
`;

export const IMPORTLUMPSEARCH = gql`
  query IMPORTLUMPSEARCH {
    imlumpSearch {
      id
      lump {
        weight
      }
    }
  }
`;

export const IMPORTCHOPSEARCH = gql`
  query IMPORTCHOPSEARCH {
    imchopSearch {
      id
      chop {
        weight
      }
    }
  }
`;

export const IMPOERTENTRAILSEARCH = gql`
  query IMPOERTENTRAILSEARCH {
    imentrailSearch {
      id
    }
  }
`;

const statistics = () => {
  const { data: datahalve } = useQuery(IMPORTHALVESEARCH);
  const { data: dataquarter } = useQuery(IMPORTQUARTERSEARCH);
  const { data: datalump } = useQuery(IMPORTLUMPSEARCH);
  const { data: datachop } = useQuery(IMPORTCHOPSEARCH);
  const { data: dataen } = useQuery(IMPOERTENTRAILSEARCH);
  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "24px" }}>
          สถิติการนำเข้า (ทั้งหมด)
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
              <td>{datahalve ? datahalve.imhalveSearch.length : "0"}</td>
              <td>
                {datahalve &&
                  datahalve.imhalveSearch.reduce(
                    (sum, nex) => sum + nex.halve.weightwarm,
                    0
                  )}{" "}
                /{" "}
                {datahalve &&
                  datahalve.imhalveSearch.reduce(
                    (sum, nex) => sum + nex.halve.weightcool,
                    0
                  )}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td>ซากโคสี่เสี้ยว</td>
              <td>{dataquarter ? dataquarter.imquartSearch.length : "0"}</td>
              <td>
                0 /{" "}
                {dataquarter &&
                  dataquarter.imquartSearch.reduce(
                    (sum, nex) => sum + nex.quarter.weight,
                    0
                  )}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td>ก้อนเนื้อ</td>
              <td>{datalump ? datalump.imlumpSearch.length : "0"}</td>
              <td>
                0 /{" "}
                {datalump &&
                  datalump.imlumpSearch.reduce(
                    (sum, nex) => sum + nex.lump.weight,
                    0
                  )}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td>ชิ้นเนื้อ</td>
              <td>{datachop ? datachop.imchopSearch.length : "0"}</td>
              <td>
                0 /{" "}
                {datachop &&
                  datachop.imchopSearch.reduce(
                    (sum, nex) => sum + nex.chop.weight,
                    0
                  )}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td>ส่วนอื่น ๆ</td>
              <td>{dataen ? dataen.imentrailSearch.length : "0"}</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default statistics;
