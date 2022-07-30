import React, { useState } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

import { Icon } from "react-icons-kit";
import { Table, Accordion, Card, Button } from "react-bootstrap";

import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
import { list } from "react-icons-kit/fa/list";


import dayjs from "dayjs";
import "dayjs/locale/th";
import { DivBase } from '../../../../utils/divBase';

import {
    HeaderColor, DivFrom,
    DivFromTop,
    DivFromDown,
    Searchinput,
    Gobutton1,
} from "./SlaughterFrom"

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


export const QUERY = gql`
query ProductTrace($barcode: String) {
  ProductTrace(barcode: $barcode) {
    weight
    barcode
    MFG
    BBE
    producttype {
      id
      code
      nameTH
    }
    producttransport {
      date
      name
      place
      note
    }
  }
}
`
const complete = () => {
    const router = useRouter();
    const [inputbarcode, setInputbarcode] = useState("")
    const { data, refetch } = useQuery(QUERY, {
        variables: {
            barcode: router.query.trackingId,
        }
    })
    console.log(data)
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            router.replace(
                `/beefwarehouse/beefproduct/trace/[trackingId]`, `/beefwarehouse/beefproduct/trace/${inputbarcode}`
            );
            setInputbarcode("");
        }
    }


    return (
        <div style={{ marginTop: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <HeaderColor style={{
                    width: "fit-content",
                    height: "fit-content",
                    padding: "5px 30px",
                }}>
                    ตรวจสอบสินค้า
                </HeaderColor>
            </div>
            <DivBase style={{
                display: "grid",
                gridTemplateColumns: "1fr 237.5px 712.5px 1fr",
                gridRowGap: "15px",
                gridColumnGap: "10px",
                // width:"950px",
                // margin:"auto"
            }}>
                <DivFrom style={{
                    gridColumnStart: "2",
                    gridColumnEnd: "3",
                    width: "100%",
                    gridColumnStart: "2",
                    gridColumnEnd: "4",
                }}>
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        ติดตามสินค้า{" "}
                    </DivFromTop>
                    <DivFromDown style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                    }}>
                        <div className="mb-3" style={{ margin: "auto" }}>
                            กรุณากรอกบาร์โค้ด : { }
                            <Searchinput
                                value={inputbarcode}
                                onChange={(event) => setInputbarcode(event.target.value)}
                                style={{
                                    marginRight: 10,
                                }}
                                autoFocus
                                onFocus={(e) => e.currentTarget.select()}
                                onKeyDown={handleKeyDown}
                            />
                            <Link href="[trackingId]" as={`${inputbarcode}`}>
                                <Gobutton1 onClick={() => refetch()}>ค้นหา</Gobutton1>
                            </Link>
                        </div>
                    </DivFromDown>
                </DivFrom>
                {data && data.ProductTrace ? (
                    <>
                        <DivFrom style={{
                            width: "100%",
                            gridRowStart: "2",
                            gridRowEnd: "3",
                            gridColumnStart: "2",
                            gridColumnEnd: "4",
                        }}>
                            <DivFromTop>
                                <div style={{ margin: "-3px 5px 0px 0px" }}>
                                    <Icon size={20} icon={list} />
                                </div>
                                รายละเอียดสินค้าผลิตภัณฑ์
                            </DivFromTop>
                            <DivFromDown>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <div style={{ marginRight: "35px" }}>บาร์โค้ด : {data.ProductTrace.barcode}</div>
                                    <div style={{ marginRight: "35px" }}>ประเภทสินค้า : {data.ProductTrace.producttype.nameTH}</div>
                                    <div style={{ marginRight: "35px" }}>รหัสสินค้า : {data.ProductTrace.producttype.code}</div>
                                    <div style={{ marginRight: "35px" }}>น้ำหนัก : {data.ProductTrace.weight}</div>
                                    <div style={{ marginRight: "35px" }}>วันที่ผลิต : {dayjs(data.ProductTrace.MFG).add(543, "y").locale("th").format("DD MMMM YYYY")}</div>
                                    <div>วันหมดอายุ : {dayjs(data.ProductTrace.BBE).add(543, "y").locale("th").format("DD MMMM YYYY")}</div>
                                </div>
                            </DivFromDown>
                        </DivFrom>
                        <DivFrom style={{
                            width: "100%",
                            gridRowStart: "3",
                            gridRowEnd: "3",
                            gridColumnStart: "2",
                            gridColumnEnd: "4",
                        }}>

                            <DivFromTop>
                                <div style={{ margin: "-3px 5px 0px 0px" }}>
                                    <Icon size={20} icon={list} />
                                </div>
                                ข้อมูลการขนส่ง
                            </DivFromTop>
                            <DivFromDown>
                                <div >
                                    <Table
                                        striped
                                        bordered
                                        responsive
                                        hover
                                        style={{ margin: "auto" }}
                                    >
                                        <thead>
                                            <tr style={{ textAlign: "center" }}>
                                                <th>วันที่่</th>
                                                <th>เวลา</th>
                                                <th>ผู้รับ/ส่ง</th>
                                                <th>สถานที่</th>
                                                <th>หมายเหตุ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ textAlign: "center" }}>
                                                <td>
                                                    {data.ProductTrace.MFG
                                                        ? dayjs(data.ProductTrace.MFG)
                                                            .add(543, "y")
                                                            .locale("th")
                                                            .format("DD MMMM YYYY")
                                                        : "ไม่ระบุ"}
                                                </td>
                                                <td>
                                                    {data.ProductTrace.MFG
                                                        ? dayjs(data.ProductTrace.MFG)
                                                            .add(543, "y")
                                                            .locale("th")
                                                            .format("HH : mm น.")
                                                        : "ไม่ระบุ"}
                                                </td>
                                                <td>-</td>
                                                <td>สหกรณ์</td>
                                                <td>-</td>
                                            </tr>
                                            {data && data.ProductTrace.producttransport.length > 0 ? (
                                                data.ProductTrace.producttransport.map((prod) => (
                                                    <tr style={{ textAlign: "center" }}>
                                                        <td>{dayjs(prod.date)
                                                            .add(543, "y")
                                                            .locale("th")
                                                            .format("DD MMMM YYYY")}
                                                        </td>
                                                        <td>{dayjs(prod.date)
                                                            .add(543, "y")
                                                            .locale("th")
                                                            .format("HH : mm น.")}
                                                        </td>
                                                        <td>{prod.name}</td>
                                                        <td>{prod.place}</td>
                                                        <td>{prod.note}</td>
                                                    </tr>
                                                ))
                                            ) : ("")}
                                        </tbody>
                                    </Table>
                                </div>
                            </DivFromDown>
                        </DivFrom>
                    </>
                ) : (
                    <DivFrom style={{ gridColumnStart: "2", gridColumnEnd: "3" }}>
                        <DivFromTop>
                            <div style={{ margin: "-3px 5px 0px 0px" }}>
                                <Icon size={20} icon={list} />
                            </div>
                            ผลการค้นหา{" "}
                        </DivFromTop>
                        <DivFromDown
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gridRowGap: "5px",
                            }}
                        >
                            <div
                                className="mb-3"
                                style={{
                                    margin: "auto",
                                    textAlign: "center",
                                    color: "#ff0000",
                                }}
                            >
                                <Icon size={150} icon={ic_info_outline} />
                                <br />
                                ไม่พบข้อมูล
                            </div>
                        </DivFromDown>
                    </DivFrom>
                )}
            </DivBase>
        </div >
    )
}

export default complete