import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
import { ic_create } from "react-icons-kit/md/ic_create";
import { Button } from "react-bootstrap";


// import DatePicker from "react-datepicker";

import dayjs from "dayjs";

import { list } from "react-icons-kit/fa/list";

import {
    DivFrom,
    DivFromTop,
    DivFromDown,
    Searchinput,
    Gobutton,
    Wightinput,
    DivBase1,
    HeaderColor
} from "./ListcuttwoFrom";

import { Editbuttoncolor } from "../../../../utils/buttonColor";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY = gql`
query QUERY($barcode: String) {
  ProductTracking(barcode: $barcode) {
    id
    weight
    barcode
    MFG
    BBE
    producttype {
      code
      nameTH
    }
    chop {
      id
      weight
      barcode
      imslaughter {
        numcow
      }
      beeftype {
        code
        nameTH
      }
    }
    lump {
      id
      weight
      barcode
      imslaughter {
        numcow
      }
      beeftype {
        code
        nameTH
      }
    }
  }
}

`

const index = () => {
    const router = useRouter();
    const [inputbarcode, setInputbarcode] = useState();
    const { data, loading, error, refetch } = useQuery(QUERY, {
        variables: {
            barcode: router.query.trackingId,
        },
    });
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            router.replace(
                `/beefwarehouse/beefproduct/tracking/[trackingId]`,
                `/beefwarehouse/beefproduct/tracking/${inputbarcode}`,

            );
            setInputbarcode("");
        }
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <HeaderColor style={{
                    width: "fit-content",
                    height: "fit-content",
                    padding: "5px 30px",
                }}>ตรวจสอบข้อมูลสินค้าผลิตภัณฑ์</HeaderColor>
            </div>
            <DivBase1
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr  1200px 1fr",
                    gridRowGap: "15px",
                    gridColumnGap: "10px",

                }}>
                {data && data.ProductTracking.barcode ? (
                    <>
                        <DivFrom
                            style={{
                                marginTop: "0px",
                                width: "100%",
                                gridRowStart: "1",
                                gridRowEnd: "1",
                                gridColumnStart: "2",
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
                                        margin: "auto",
                                        minWidth: "100%",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                                        gridRowGap: "15px",
                                    }}
                                >
                                    <div>บาร์โค้ด : {data.ProductTracking.barcode}</div>
                                    <div>ประเภทสินค้า : {data.ProductTracking.producttype.nameTH}</div>
                                    <div>รหัสสินค้า : {data.ProductTracking.producttype.code}</div>
                                    <div>น้ำหนัก : {data.ProductTracking.weight} กก.</div>
                                    <div>
                                        วันที่ผลิต : {dayjs(data.ProductTracking.MFG)
                                            .add(543, "year")
                                            .format("DD/MM/YYYY")}
                                    </div>
                                    <div>
                                        วันหมดอายุ : {dayjs(data.ProductTracking.BBE)
                                            .add(543, "year")
                                            .format("DD/MM/YYYY")}
                                    </div>
                                </div>
                            </DivFromDown>
                        </DivFrom>
                    </>
                ) : (
                    <>
                        <DivFrom style={{ gridColumnStart: "3", gridColumnEnd: "3" }}>
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
                    </>
                )
                }
                <DivFrom
                    style={{
                        marginTop: "30px",
                        width: "100%",
                        gridRowStart: "2",
                        gridRowEnd: "2",
                        gridColumnStart: "2",
                    }}>
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        รายละเอียดข้อมูลก้อนเนื้อที่นำมาแปรรูป{" "}
                    </DivFromTop>
                    <DivFromDown>
                        <div style={{ height: "170px", overflow: "auto" }}>
                            <Table striped bordered responsive hover style={{ margin: "auto" }}>
                                <thead /* style={{ display: "table", tableLayout: "fixed", width: "100%" }} */>
                                    <tr style={{ textAlign: "center", /* display: "table", tableLayout: "fixed", width: "100%" */ }}>
                                        <th>ประเภทซาก</th>
                                        <th>รหัสซาก</th>
                                        <th>บาร์โค้ด</th>
                                        <th>ทะเบียนขุน</th>
                                        <th>น้ำหนัก (กก.)</th>
                                        <th>ตรวจสอบข้อมูล</th>
                                    </tr>
                                </thead>
                                <tbody /* style={{ display: "block", overflow: "auto", tableLayout: "fixed", maxHeight: "130px" }} */>
                                    {data && data.ProductTracking.lump.length > 0 ? (
                                        data.ProductTracking.lump.map((prod) => (
                                            <tr style={{ textAlign: "center", /* display: "table", tableLayout: "fixed", width: "100%" */ }}>
                                                <td>{prod.beeftype.nameTH}</td>
                                                <td>{prod.beeftype.code}</td>
                                                <td>{prod.imslaughter.numcow}</td>
                                                <td>{prod.barcode}</td>
                                                <td>{prod.weight}</td>
                                                <td>
                                                    <a href={"http://localhost:3000/slaughter/tracking/" + prod.barcode}
                                                        target="popup">
                                                        <Editbuttoncolor>
                                                            <Icon size={30} icon={iosSearchStrong} />
                                                        </Editbuttoncolor>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr style={{ textAlign: "center" }}>
                                            <td colspan="6">ไม่พบข้อมูล</td>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </div>
                    </DivFromDown>
                </DivFrom>
                <DivFrom
                    style={{
                        marginTop: "0px",
                        width: "100%",
                        gridRowStart: "3",
                        gridRowEnd: "3",
                        gridColumnStart: "2",
                    }}>
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        รายละเอียดข้อมูลชิ้นเนื้อที่นำมาแปรรูป{" "}
                    </DivFromTop>
                    <DivFromDown>
                        <div style={{ height: "170px", overflow: "auto" }}>
                            <Table striped bordered responsive hover style={{ margin: "auto" }}>
                                <thead>
                                    <tr style={{ textAlign: "center" }}>
                                        <th>ประเภทซาก</th>
                                        <th>รหัสซาก</th>
                                        <th>ทะเบียนขุน</th>
                                        <th>บาร์โค้ด</th>
                                        <th>น้ำหนัก (กก.)</th>
                                        <th>ตรวจสอบข้อมูล</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.ProductTracking.chop.length > 0 ? (
                                        data.ProductTracking.chop.map((prod) => (
                                            <tr style={{ textAlign: "center" }}>
                                                <td>{prod.beeftype.nameTH}</td>
                                                <td>{prod.beeftype.code}</td>
                                                <td>{prod.imslaughter.numcow}</td>
                                                <td>{prod.barcode}</td>
                                                <td>{prod.weight}</td>
                                                <td>
                                                    <a href={"http://localhost:3000/slaughter/tracking/" + prod.barcode}
                                                        target="popup">
                                                        <Editbuttoncolor>
                                                            <Icon size={30} icon={iosSearchStrong} />
                                                        </Editbuttoncolor>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))

                                    ) : (
                                        <tr style={{ textAlign: "center" }}>
                                            <td colspan="6">ไม่พบข้อมูล</td>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </div>

                    </DivFromDown>
                </DivFrom>
            </DivBase1 >
        </>
    )
}

export default index