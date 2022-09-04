import React, { useState } from "react";
import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Line, PolarArea, Doughnut, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";
import storeen from "../../12Qrcode/storeen";

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

export const GRAPHSTORE = gql`
query GRAPHSTORE {
  stockgraph {
    id
    imhalves {
      halve {
        weightwarm
        weightcool
      }
    }
    imquarters {
      quarter {
        weight
      }
    }
    imlumps {
      lump {
        weight
      }
    }
    imchops {
      chop {
        weight
      }
    }
  }
}
`

export const STOREENTRAIL = gql`
  query STOREENTRAIL {
    listentrail {
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
  const { data: stock } = useQuery(GRAPHSTORE);
  const { data: stocken } = useQuery(STOREENTRAIL);
  // console.log(stock)

  const data = {
    labels: ["ผ่าซีก", "สี่เสี้ยว", "ก้อนเนื้อ", "ชิ้นเนื้อ", "ส่วนอื่น ๆ"],
    datasets: [
      {
        label: 'สถิติการนำเข้า',
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
    labels: ["ผ่าซีก", "สี่เสี้ยว", "ก้อนเนื้อ", "ชิ้นเนื้อ", "ส่วนอื่น ๆ"],
    datasets: [
      {
        label: 'สถิติการเบิกออก',
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

  const data2 = {
    labels: ["ผ่าซีก", "สี่เสี้ยว", "ก้อนเนื้อ", "ชิ้นเนื้อ", "ส่วนอื่น ๆ"],
    datasets: [
      {
        label: 'สถิติยอดคงคลัง',
        data: [stock && stock.stockgraph[0].imhalves.length,
        stock && stock.stockgraph[0].imquarters.length,
        stock && stock.stockgraph[0].imlumps.length,
        stock && stock.stockgraph[0].imchops.length,
        stocken ? stocken.listentrail.length : "0",],
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
  }
  return (
    <div>
      <div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.5fr 300px 300px 300px 0.5fr",
          marginTop: "10px",
          gridGap: "40px"
        }}>
          <div></div>
          <div>
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>สถิติการนำเข้า</div>
            <Bar data={data} height={250}
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
                      ).toFixed(2)}{" "}
                    /{" "}
                    {datahalve &&
                      datahalve.exporthalve.reduce(
                        (sum, nex) => sum + nex.halve.weightcool,
                        0
                      ).toFixed(2)}
                  </td>
                </tr>

                <tr style={{ textAlign: "center" }}>
                  <td>ซากโคสี่เสี้ยว</td>
                  <td>{imdataquarter ? imdataquarter.imquartSearch.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {imdataquarter &&
                      imdataquarter.imquartSearch.reduce(
                        (sum, nex) => sum + nex.quarter.weight,
                        0
                      ).toFixed(2)}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ก้อนเนื้อ</td>
                  <td>{imdatalump ? imdatalump.imlumpSearch.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {imdatalump &&
                      imdatalump.imlumpSearch.reduce(
                        (sum, nex) => sum + nex.lump.weight,
                        0
                      ).toFixed(2)}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ชิ้นเนื้อ</td>
                  <td>{imdatachop ? imdatachop.imchopSearch.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {imdatachop &&
                      imdatachop.imchopSearch.reduce(
                        (sum, nex) => sum + nex.chop.weight,
                        0
                      ).toFixed(2)}
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
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>สถิติการนำออก</div>
            <Bar data={data1} height={250} />
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
                      ).toFixed(2)}{" "}
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
                    0.00 /{" "}
                    {dataquarter &&
                      dataquarter.exportquart.reduce(
                        (sum, nex) => sum + nex.quarter.weight,
                        0
                      ).toFixed(2)}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ก้อนเนื้อ</td>
                  <td>{datalump ? datalump.exportlump.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {datalump &&
                      datalump.exportlump.reduce(
                        (sum, nex) => sum + nex.lump.weight,
                        0
                      ).toFixed(2)}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ชิ้นเนื้อ</td>
                  <td>{datachop ? datachop.exportchop.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {datachop &&
                      datachop.exportchop.reduce(
                        (sum, nex) => sum + nex.chop.weight,
                        0
                      ).toFixed(2)}
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
          <div>
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>สถิติยอดคงคลัง</div>
            <Bar data={data2} height={250} />
            <Table striped bordered responsive hover style={{ marginTop: "20px" }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>ประเภท</th>
                  <th>จำนวน</th>
                  <th>น้ำหนักอุ่น / เย็น (กก.)</th>
                </tr>
              </thead>
              <tbody>
                {stock && stock.stockgraph.map((prod) => (
                  <>
                    <tr style={{ textAlign: "center" }}>
                      <td>ซากโคผ่าซีก</td>
                      <td>{prod.imhalves.length}</td>
                      <td>{prod.imhalves.reduce(
                        (sum, nex) => sum + nex.halve.weightwarm, 0
                      ).toFixed(2)}{" "}
                        /{" "}
                        {prod.imhalves.reduce(
                          (sum, nex) => sum + nex.halve.weightcool,
                          0
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ซากโคสี่เสี้ยว</td>
                      <td>{prod.imquarters.length}</td>
                      <td> 0.00 /{" "}{prod.imquarters.reduce(
                        (sum, nex) => sum + nex.quarter.weight, 0
                      ).toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ก้อนเนื้อ</td>
                      <td>{prod.imlumps.length}</td>
                      <td> 0.00 /{" "}{prod.imlumps.reduce(
                        (sum, nex) => sum + nex.lump.weight, 0
                      ).toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ชิ้นเนื้อ</td>
                      <td>{prod.imchops.length}</td>
                      <td> 0.00 /{" "}{prod.imchops.reduce(
                        (sum, nex) => sum + nex.chop.weight, 0
                      ).toFixed(2)}
                      </td>
                    </tr>
                  </>
                ))}
                <tr style={{ textAlign: "center" }}>
                  <td>ส่วนอื่น ๆ </td>
                  <td>
                    {stocken ? stocken.listentrail.length : "0"}</td>
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
