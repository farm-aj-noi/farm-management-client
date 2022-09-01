import React from 'react'
import { Line, PolarArea, Doughnut, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Table } from 'react-bootstrap';
import PaperTop10 from "./Paper_Top10"
const TOP10PRODUCT = gql`
query Top10product {
  top10product {
    nameth
    nameen
    count
  }
}
`

const Top10 = () => {
    const { data: top10 } = useQuery(TOP10PRODUCT);
    const data = {
        labels: [top10 && top10.top10product.length >= 1 ? (top10.top10product[0].nameth) : (''),
        top10 && top10.top10product.length >= 2 ? (top10.top10product[1].nameth) : (''),
        top10 && top10.top10product.length >= 3 ? (top10.top10product[2].nameth) : (''),
        top10 && top10.top10product.length >= 4 ? (top10.top10product[3].nameth) : (''),
        top10 && top10.top10product.length >= 5 ? (top10.top10product[4].nameth) : (''),
        top10 && top10.top10product.length >= 6 ? (top10.top10product[5].nameth) : (''),
        top10 && top10.top10product.length >= 7 ? (top10.top10product[6].nameth) : (''),
        top10 && top10.top10product.length >= 8 ? (top10.top10product[7].nameth) : (''),
        top10 && top10.top10product.length >= 9 ? (top10.top10product[8].nameth) : (''),
        top10 && top10.top10product.length >= 10 ? (top10.top10product[9].nameth) : (''),
        ],
        datasets: [
            {
                label: '10 อันดับยอดนิยมเบิกออกจำหน่าย',
                data: [top10 && top10.top10product.length >= 1 ? (top10.top10product[0].count) : (''),
                top10 && top10.top10product.length >= 2 ? (top10.top10product[1].count) : (''),
                top10 && top10.top10product.length >= 3 ? (top10.top10product[2].count) : (''),
                top10 && top10.top10product.length >= 4 ? (top10.top10product[3].count) : (''),
                top10 && top10.top10product.length >= 5 ? (top10.top10product[4].count) : (''),
                top10 && top10.top10product.length >= 6 ? (top10.top10product[5].count) : (''),
                top10 && top10.top10product.length >= 7 ? (top10.top10product[6].count) : (''),
                top10 && top10.top10product.length >= 8 ? (top10.top10product[7].count) : (''),
                top10 && top10.top10product.length >= 9 ? (top10.top10product[8].count) : (''),
                top10 && top10.top10product.length >= 10 ? (top10.top10product[9].count) : ('')],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "200%", marginRight: "10px" }}>
                <Bar data={data} />
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
                        <td>{top10 && top10.top10product && top10.top10product.length >= 1 ? top10.top10product[0].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 1 ? top10.top10product[0].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>2</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 2 ? top10.top10product[1].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 2 ? top10.top10product[1].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>3</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 3 ? top10.top10product[2].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 3 ? top10.top10product[2].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>4</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 4 ? top10.top10product[3].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 4 ? top10.top10product[3].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>5</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 5 ? top10.top10product[4].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 5 ? top10.top10product[4].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>6</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 6 ? top10.top10product[5].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 6 ? top10.top10product[5].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>7</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 7 ? top10.top10product[6].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 7 ? top10.top10product[6].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>8</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 8 ? top10.top10product[7].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 8 ? top10.top10product[7].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>9</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 9 ? top10.top10product[8].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 9 ? top10.top10product[8].count : "-"}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td>10</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 10 ? top10.top10product[9].nameth : "-"}</td>
                        <td>{top10 && top10.top10product && top10.top10product.length >= 10 ? top10.top10product[9].count : "-"}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Top10