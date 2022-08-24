import React from "react";
import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Line, PolarArea, Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";

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
  const { data: datahalve } = useQuery(EXPORTHALVESSEARCH);
  const { data: datalump } = useQuery(CREATEEXPORTLUMP);
  const { data: dataquarter } = useQuery(EXPORTQUARTERSEARCH);
  const { data: datachop } = useQuery(EXPORTCHOPSEARCH);
  const { data: dataen } = useQuery(EXPORTENTRAILSEARCH);
  const { data: imdatahalve } = useQuery(IMPORTHALVESEARCH);
  const { data: imdataquarter } = useQuery(IMPORTQUARTERSEARCH);
  const { data: imdatalump } = useQuery(IMPORTLUMPSEARCH);
  const { data: imdatachop } = useQuery(IMPORTCHOPSEARCH);
  const { data: imdataen } = useQuery(IMPOERTENTRAILSEARCH);
  // console.log(imdatahalve)

  const data = {
    labels: ["ซากโคผ่าซีก", "ซากโคสี่เสี้ยว", "ก้อนเนื้อ", "ชิ้นเนื้อ", "ส่วนอื่น ๆ"],
    datasets: [
      {
        label: '# of Votes',
        data: [imdatahalve && imdatahalve.imhalveSearch.length,
        imdataquarter && imdataquarter.imquartSearch.length,
        imdatalump && imdatalump.imlumpSearch.length,
        imdatachop && imdatachop.imchopSearch.length,
        imdataen && imdataen.imentrailSearch.length,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      },
    ],
  };

  const data1 = {
    labels: ["ซากโคผ่าซีก", "ซากโคสี่เสี้ยว", "ก้อนเนื้อ", "ชิ้นเนื้อ", "ส่วนอื่น ๆ"],
    datasets: [
      {
        label: '# of Votes',
        data: [datahalve && datahalve.exporthalve.length,
        dataquarter && dataquarter.exportquart.length,
        datalump && datalump.exportlump.length,
        datachop && datachop.exportchop.length,
        dataen && dataen.exportentrail.length,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      },
    ],
  };


  return (
    <div>
      <div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px 350px 1fr",
          marginBottom: "10px",
          gap: "100px"
        }}>
          <p></p>
          <p style={{ textAlign: "center", margin: "0px", fontSize: "24px", fontWeight: "bold" }}>สถิติการนำเข้า</p>
          <p style={{ textAlign: "center", margin: "0px", fontSize: "24px", fontWeight: "bold" }}>สถิติการเบิกออก</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px 350px 1fr",
          marginTop: "10px",
          gap: "100px"
        }}>
          <div></div>
          <div>
            <Doughnut data={data}
            />
            <Table striped bordered responsive hover style={{ marginTop: "20px" }}>
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
                  <td>{imdatahalve ? imdatahalve.imhalveSearch.length : "0"}</td>
                  <td>
                    {imdatahalve &&
                      imdatahalve.imhalveSearch.reduce(
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
                  <td>{imdataquarter ? imdataquarter.imquartSearch.length : "0"}</td>
                  <td>
                    0 /{" "}
                    {imdataquarter &&
                      imdataquarter.imquartSearch.reduce(
                        (sum, nex) => sum + nex.quarter.weight,
                        0
                      )}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ก้อนเนื้อ</td>
                  <td>{imdatalump ? imdatalump.imlumpSearch.length : "0"}</td>
                  <td>
                    0 /{" "}
                    {imdatalump &&
                      imdatalump.imlumpSearch.reduce(
                        (sum, nex) => sum + nex.lump.weight,
                        0
                      )}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ชิ้นเนื้อ</td>
                  <td>{imdatachop ? imdatachop.imchopSearch.length : "0"}</td>
                  <td>
                    0 /{" "}
                    {imdatachop &&
                      imdatachop.imchopSearch.reduce(
                        (sum, nex) => sum + nex.chop.weight,
                        0
                      )}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ส่วนอื่น ๆ</td>
                  <td>{imdataen ? imdataen.imentrailSearch.length : "0"}</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <Doughnut data={data1} />
            <Table striped bordered responsive hover style={{ marginTop: "20px" }}>
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
      </div>
    </div >
  );
};

export default statistics;
