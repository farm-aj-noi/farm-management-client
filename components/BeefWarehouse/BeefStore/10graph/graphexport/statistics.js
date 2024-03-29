import React, { useState } from "react";
import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { Line, PolarArea, Doughnut, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";

import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  DivBase1,
} from "../GraphFrom";

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

  const allimport = [imdatahalve && imdatahalve.imhalveSearch.length,
  imdataquarter && imdataquarter.imquartSearch.length,
  imdatalump && imdatalump.imlumpSearch.length,
  imdatachop && imdatachop.imchopSearch.length,
  imdataen && imdataen.imentrailSearch.length
  ];

  const allexport = [datahalve && datahalve.exporthalve.length,
  dataquarter && dataquarter.exportquart.length,
  datalump && datalump.exportlump.length,
  datachop && datachop.exportchop.length,
  dataen && dataen.exportentrail.length
  ];

  const allweightimport = [parseFloat(imdatahalve &&
    imdatahalve.imhalveSearch.reduce(
      (sum, nex) => sum + nex.halve.weightcool,
      0
    ).toFixed(2)),
  parseFloat(imdataquarter &&
    imdataquarter.imquartSearch.reduce(
      (sum, nex) => sum + nex.quarter.weight,
      0
    ).toFixed(2)),
  parseFloat(imdatalump &&
    imdatalump.imlumpSearch.reduce(
      (sum, nex) => sum + nex.lump.weight,
      0
    ).toFixed(2)),
  parseFloat(imdatachop &&
    imdatachop.imchopSearch.reduce(
      (sum, nex) => sum + nex.chop.weight,
      0
    ).toFixed(2)),
  ];

  const allweightexport = [
    parseFloat(datahalve &&
      datahalve.exporthalve.reduce(
        (sum, nex) => sum + nex.halve.weightcool,
        0
      ).toFixed(2)),
    parseFloat(dataquarter &&
      dataquarter.exportquart.reduce(
        (sum, nex) => sum + nex.quarter.weight,
        0
      ).toFixed(2)),
    parseFloat(datalump &&
      datalump.exportlump.reduce(
        (sum, nex) => sum + nex.lump.weight,
        0
      ).toFixed(2)),
    parseFloat(datachop &&
      datachop.exportchop.reduce(
        (sum, nex) => sum + nex.chop.weight,
        0
      ).toFixed(2)),
  ];

  const store = [
    stock && stock.stockgraph[0].imhalves.length,
    stock && stock.stockgraph[0].imquarters.length,
    stock && stock.stockgraph[0].imlumps.length,
    stock && stock.stockgraph[0].imchops.length,
    stocken && stocken.listentrail.length
  ];

  const allweightstore = [
    parseFloat(stock && stock.stockgraph[0].imhalves.reduce(
      (sum, nex) => sum + nex.halve.weightcool,
      0
    ).toFixed(2)),
    parseFloat(stock && stock.stockgraph[0].imquarters.reduce(
      (sum, nex) => sum + nex.quarter.weight,
      0
    ).toFixed(2)),
    parseFloat(stock && stock.stockgraph[0].imlumps.reduce(
      (sum, nex) => sum + nex.lump.weight,
      0
    ).toFixed(2)),
    parseFloat(stock && stock.stockgraph[0].imchops.reduce(
      (sum, nex) => sum + nex.chop.weight,
      0
    ).toFixed(2)),
  ];


  const data = {
    labels: ["ผ่าซีก", "สี่เสี้ยว", "ก้อนเนื้อ", "ชิ้นเนื้อ", "ส่วนอื่น ๆ"],
    datasets: [
      {
        label: 'สถิติการนำเข้า',
        data: [allimport[0], allimport[1], allimport[2], allimport[3], allimport[4]],
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
        data: [allexport[0], allexport[1], allexport[2], allexport[3], allexport[4]],
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
        data: [store[0], store[1], store[2], store[3], store[4]],
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
    <>
      <DivFrom style={{ marginTop: "20px" }}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          ราลละเอียดข้อมูลสถิตินำเข้า
        </DivFromTop>
        <DivFromDown>
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "0.5fr 650px 350px 0.5fr",
              marginTop: "10px",
              gridGap: "40px"
            }}>
              <div></div>
              <div><Bar data={data} height={170} /></div>
              <div>
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
                        {allweightimport[0].toFixed(2)}
                      </td>
                    </tr>

                    <tr style={{ textAlign: "center" }}>
                      <td>ซากโคสี่เสี้ยว</td>
                      <td>{imdataquarter ? imdataquarter.imquartSearch.length : "0"}</td>
                      <td>
                        0.00 /{" "}
                        {allweightimport[1].toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ก้อนเนื้อ</td>
                      <td>{imdatalump ? imdatalump.imlumpSearch.length : "0"}</td>
                      <td>
                        0.00 /{" "}
                        {allweightimport[2].toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ชิ้นเนื้อ</td>
                      <td>{imdatachop ? imdatachop.imchopSearch.length : "0"}</td>
                      <td>
                        0.00 /{" "}
                        {allweightimport[3].toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ส่วนอื่น ๆ</td>
                      <td>{imdataen ? imdataen.imentrailSearch.length : "0"}</td>
                      <td>-</td>
                    </tr>
                    <tr style={{ textAlign: "center", }}>
                      <td style={{ fontWeight: "bold" }}>รวม</td>
                      <td>
                        {allimport.reduce(
                          (sum, nex) => sum + nex,
                          0
                        )}
                      </td>
                      <td>
                        {imdatahalve &&
                          imdatahalve.imhalveSearch.reduce(
                            (sum, nex) => sum + nex.halve.weightwarm,
                            0
                          ).toFixed(2)} /{" "}
                        {allweightimport.reduce(
                          (sum, nex) => sum + nex,
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </DivFromDown>
      </DivFrom >
      <DivFrom style={{ marginTop: "20px" }}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายละเอียดข้อมูลสถิตินำออก
        </DivFromTop>
        <DivFromDown>
          <div style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 650px 350px 0.5fr",
            marginTop: "10px",
            gridGap: "40px"
          }}>
            <div></div>
            <div><Bar data={data1} height={170} /></div>
            <div><Table striped bordered responsive hover style={{ marginTop: "20px" }}>
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
                    {/* {datahalve &&
                      datahalve.exporthalve.reduce(
                        (sum, nex) => sum + nex.halve.weightcool,
                        0
                      )} */}
                    {allweightexport[0].toFixed(2)}
                  </td>
                </tr>

                <tr style={{ textAlign: "center" }}>
                  <td>ซากโคสี่เสี้ยว</td>
                  <td>{dataquarter ? dataquarter.exportquart.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {allweightexport[1].toFixed(2)}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ก้อนเนื้อ</td>
                  <td>{datalump ? datalump.exportlump.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {allweightexport[2].toFixed(2)}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ชิ้นเนื้อ</td>
                  <td>{datachop ? datachop.exportchop.length : "0"}</td>
                  <td>
                    0.00 /{" "}
                    {allweightexport[3].toFixed(2)}
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>ส่วนอื่น ๆ</td>
                  <td>{dataen ? dataen.exportentrail.length : "0"}</td>
                  <td>-</td>
                </tr>
                <tr style={{ textAlign: "center", }}>
                  <td style={{ fontWeight: "bold" }}>รวม</td>
                  <td>
                    {allexport.reduce(
                      (sum, nex) => sum + nex,
                      0
                    )}
                  </td>
                  <td>
                    {datahalve &&
                      datahalve.exporthalve.reduce(
                        (sum, nex) => sum + nex.halve.weightwarm,
                        0
                      ).toFixed(2)} /{" "}
                    {allweightexport.reduce(
                      (sum, nex) => sum + nex,
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            </div>
          </div>
        </DivFromDown>
      </DivFrom>
      <DivFrom style={{ marginTop: "20px" }}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายละเอียดข้อมูลสถิติคงคลัง
        </DivFromTop>
        <DivFromDown>
          <div style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 650px 350px 0.5fr",
            marginTop: "10px",
            gridGap: "40px"
          }}>
            <div></div>
            <div><Bar data={data2} height={170} /></div>
            <div><Table striped bordered responsive hover style={{ marginTop: "20px" }}>
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
                        {allweightstore[0].toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ซากโคสี่เสี้ยว</td>
                      <td>{prod.imquarters.length}</td>
                      <td> 0.00 /{" "}{allweightstore[1].toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ก้อนเนื้อ</td>
                      <td>{prod.imlumps.length}</td>
                      <td> 0.00 /{" "}{allweightstore[2].toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>ชิ้นเนื้อ</td>
                      <td>{prod.imchops.length}</td>
                      <td> 0.00 /{" "}{allweightstore[3].toFixed(2)}
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
                <tr style={{ textAlign: "center", }}>
                  <td style={{ fontWeight: "bold" }}>รวม</td>
                  <td>
                    {store.reduce(
                      (sum, nex) => sum + nex,
                      0
                    )}
                  </td>
                  <td>
                    {stock && stock.stockgraph[0].imhalves.reduce(
                      (sum, nex) => sum + nex.halve.weightwarm,
                      0
                    ).toFixed(2)} /{" "}
                    {allweightstore.reduce(
                      (sum, nex) => sum + nex,
                    )}
                  </td>
                </tr>
              </tbody>
            </Table></div>
          </div>
        </DivFromDown>
      </DivFrom>
    </>
  );
};

export default statistics;
