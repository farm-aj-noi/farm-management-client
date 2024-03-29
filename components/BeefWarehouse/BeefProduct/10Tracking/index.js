import React, { useState } from "react";
import { useRouter } from "next/router";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";

// import DatePicker from "react-datepicker";

import dayjs from "dayjs";
import "dayjs/locale/th";

import { list } from "react-icons-kit/fa/list";

import {
    DivFrom,
    DivFromTop,
    DivFromDown,
    DivBase1,
    HeaderColor,
    DivContainer,
    DivItem,
    DivList,
    DivData
} from "./ListcuttwoFrom";

import { Editbuttoncolor } from "../../../../utils/buttonColor";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { fileText } from 'react-icons-kit/icomoon/fileText'
import { ic_assignment_turned_in } from 'react-icons-kit/md/ic_assignment_turned_in'

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
        <div style={{ marginTop: "100px", marginBottom: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <HeaderColor style={{
                    width: "fit-content",
                    height: "fit-content",
                    padding: "5px 30px",
                }}>
                    ตรวจสอบข้อมูลสินค้าผลิตภัณฑ์</HeaderColor>
            </div>
            <DivContainer>
                {data && data.ProductTracking.barcode ? (
                    <DivItem>
                        <DivFrom
                            style={{
                                width: "100%",
                            }}>
                            <DivFromTop>
                                <div style={{ margin: "-3px 5px 0px 0px" }}>
                                    <Icon size={20} icon={fileText} />
                                </div>
                                รายละเอียดสินค้าผลิตภัณฑ์
                            </DivFromTop>
                            <DivFromDown>
                                <DivList>
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
                                </DivList>
                            </DivFromDown>
                        </DivFrom>
                    </DivItem>
                ) : (
                    <DivItem>
                        <DivFrom style={{
                            width: "100%",
                        }}>
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
                    </DivItem>
                )}

                <DivItem style={{ marginTop: "30px" }}>
                    <DivFrom
                        style={{
                            width: "100%",
                        }}>
                        <DivFromTop>
                            <div style={{ margin: "-3px 5px 0px 0px" }}>
                                <Icon size={20} icon={list} />
                            </div>
                            รายการข้อมูลก้อนเนื้อที่นำมาแปรรูป{" "}
                        </DivFromTop>
                        <DivFromDown>
                            <div style={{ height: `${data && data.ProductTracking.lump.length > 2 ? "170px" : ""}`, overflow: "auto" }}>
                                <Table striped bordered responsive hover style={{ margin: "auto" }}>
                                    <thead /* style={{ display: "table", tableLayout: "fixed", width: "100%" }} */>
                                        <tr style={{ textAlign: "center", fontSize: "18px" /* display: "table", tableLayout: "fixed", width: "100%" */ }}>
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
                                                <tr style={{ textAlign: "center",/* display: "table", tableLayout: "fixed", width: "100%" */ }}>
                                                    <td>{prod.beeftype.nameTH}</td>
                                                    <td>{prod.beeftype.code}</td>
                                                    <td>{prod.imslaughter.numcow}</td>
                                                    <td>{prod.barcode}</td>
                                                    <td>{prod.weight}</td>
                                                    <td>
                                                        <a href={"https://farm-organization.herokuapp.com/slaughter/tracking/" + prod.barcode}
                                                            target="_blank">
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
                </DivItem>
                <DivItem style={{ marginTop: "30px" }}>
                    <DivFrom
                        style={{
                            width: "100%",
                        }}>
                        <DivFromTop>
                            <div style={{ margin: "-3px 5px 0px 0px" }}>
                                <Icon size={20} icon={list} />
                            </div>
                            รายการข้อมูลชิ้นเนื้อที่นำมาแปรรูป{" "}
                        </DivFromTop>
                        <DivFromDown>
                            <div style={{ height: `${data && data.ProductTracking.chop.length > 2 ? "170px" : ""}`, overflow: "auto" }}>
                                <Table striped bordered responsive hover style={{ margin: "auto" }}>
                                    <thead>
                                        <tr style={{ textAlign: "center", fontSize: "18px" }}>
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
                                                        <a href={"https://farm-organization.herokuapp.com/slaughter/tracking/" + prod.barcode}
                                                            target="_blank">
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
                </DivItem>
            </DivContainer>
        </div>
    )
}

export default index