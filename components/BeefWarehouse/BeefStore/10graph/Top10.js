import React from 'react'
import { Line, PolarArea, Doughnut, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Table } from 'react-bootstrap';
import PaperTop10 from "./Paper_Top10"

const TOP10BEEF = gql`
query Top10beef {
  top10beef {
    nameth
    nameen
    count
  }
}
`

const Top10 = () => {
    const { data: top10 } = useQuery(TOP10BEEF);
    // console.log(top10);
    const data = {
        labels: [top10 && top10.top10beef.length >= 1 ? (top10.top10beef[0].nameth) : (''),
        top10 && top10.top10beef.length >= 2 ? (top10.top10beef[1].nameth) : (''),
        top10 && top10.top10beef.length >= 3 ? (top10.top10beef[2].nameth) : (''),
        top10 && top10.top10beef.length >= 4 ? (top10.top10beef[3].nameth) : (''),
        top10 && top10.top10beef.length >= 5 ? (top10.top10beef[4].nameth) : (''),
        top10 && top10.top10beef.length >= 6 ? (top10.top10beef[5].nameth) : (''),
        top10 && top10.top10beef.length >= 7 ? (top10.top10beef[6].nameth) : (''),
        top10 && top10.top10beef.length >= 8 ? (top10.top10beef[7].nameth) : (''),
        top10 && top10.top10beef.length >= 9 ? (top10.top10beef[8].nameth) : (''),
        top10 && top10.top10beef.length >= 10 ? (top10.top10beef[9].nameth) : (''),
        ],
        datasets: [
            {
                label: "10 อันดับยอดนิยมเบิกออก",
                data: [top10 && top10.top10beef.length >= 1 ? (top10.top10beef[0].count) : (''),
                top10 && top10.top10beef.length >= 2 ? (top10.top10beef[1].count) : (''),
                top10 && top10.top10beef.length >= 3 ? (top10.top10beef[2].count) : (''),
                top10 && top10.top10beef.length >= 4 ? (top10.top10beef[3].count) : (''),
                top10 && top10.top10beef.length >= 5 ? (top10.top10beef[4].count) : (''),
                top10 && top10.top10beef.length >= 6 ? (top10.top10beef[5].count) : (''),
                top10 && top10.top10beef.length >= 7 ? (top10.top10beef[6].count) : (''),
                top10 && top10.top10beef.length >= 8 ? (top10.top10beef[7].count) : (''),
                top10 && top10.top10beef.length >= 9 ? (top10.top10beef[8].count) : (''),
                top10 && top10.top10beef.length >= 10 ? (top10.top10beef[9].count) : ('')],
                backgroundColor: [
                    '#f6e49f',
                    '#fdd17e',
                    '#f7aa5a',
                    '#ed8b68',
                    '#f48791',
                    '#f495b9',
                    '#e5b9d2',
                    '#8c8bc0',
                    '#96c8e3',
                    '#9fd8da',
                ],
                borderColor: [
                    '#ecd43b',
                    '#f2b22f',
                    '#f27428',
                    '#ee571b',
                    '#ef453e',
                    '#ec5485',
                    '#ba5c9d',
                    '#935da2',
                    '#5689c7',
                    '#25bbb7',
                ],
            },
        ],
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "70%", marginRight: "10px" }}>
                <Doughnut data={data} />
                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                    <PaperTop10>พิมพ์รายการ</PaperTop10>
                </div>

            </div>
            <Table
                striped
                bordered
                responsive
                hover
            >
                <thead>
                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                        <th>ลำดับที่</th>
                        <th>ประเภทซาก</th>
                        <th>จำนวน</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ textAlign: "center" }}>
                        <td>1</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 1 ? top10.top10beef[0].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 1 ? top10.top10beef[0].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>2</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 2 ? top10.top10beef[1].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 2 ? top10.top10beef[1].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>3</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 3 ? top10.top10beef[2].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 3 ? top10.top10beef[2].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>4</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 4 ? top10.top10beef[3].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 4 ? top10.top10beef[3].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>5</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 5 ? top10.top10beef[4].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 5 ? top10.top10beef[4].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>6</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 6 ? top10.top10beef[5].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 6 ? top10.top10beef[5].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>7</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 7 ? top10.top10beef[6].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 7 ? top10.top10beef[6].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>8</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 8 ? top10.top10beef[7].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 8 ? top10.top10beef[7].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>9</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 9 ? top10.top10beef[8].nameth : "-"}</td>
                        <td>{top10 && top10.top10beef && top10.top10beef.length >= 9 ? top10.top10beef[8].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td style={{ height: "35px", }}>10</td>
                        <td style={{ height: "35px", }}>{top10 && top10.top10beef && top10.top10beef.length >= 10 ? top10.top10beef[9].nameth : "-"}</td>
                        <td style={{ height: "35px", }}>{top10 && top10.top10beef && top10.top10beef.length >= 10 ? top10.top10beef[9].count : "-"}</td>
                    </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default Top10