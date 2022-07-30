import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "./RequestFrom";
import { DivBase } from "../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import Create from "./create";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

const QUERYRE = gql`
query QUERYRE {
  listRequestExP {
    id
    producttype {
    code
    nameTH
    }
    quantity
    name
    requestdate
  }
}
`;

function index() {
    const { data } = useQuery(QUERYRE);
    return (
        <div style={{ marginTop: "100px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <HeaderColor
                    style={{
                        width: "fit-content",
                        height: "fit-content",
                        padding: "5px 30px",
                    }}
                >
                    คำร้องขอเบิก
                </HeaderColor>
            </div>
            <DivBase
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 270px 700px 1fr",
                    gridRowGap: "15px",
                    gridColumnGap: "20px",
                    textAlign: "start",
                }}
            >
                <DivFrom
                    style={{
                        width: "100%",
                        marginTop: "0",
                        gridRowStart: "2",
                        gridRowEnd: "5",
                        gridColumnStart: "2",
                    }}
                >
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        ดำเนินรายการร้องขอเบิก
                    </DivFromTop>
                    <DivFromDown>
                        <Create />
                    </DivFromDown>
                </DivFrom>
                <DivFrom
                    style={{
                        width: "100%",
                        gridRowStart: "2",
                        gridRowEnd: "3",
                        gridColumnStart: "3",
                        marginTop: "0px",
                    }}
                >
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        รายการร้องขอเบิก
                    </DivFromTop>
                    <DivFromDown>
                        <div style={{ height: `${data && data.listRequestExP.length > 9 ? "500px" : ""}`, overflow: `${data && data.listRequestExP.length > 9 ? "auto" : ""}` }}>
                            <Table
                                striped
                                bordered
                                responsive
                                hover
                                style={{ margin: "auto" }}
                            >
                                <thead>
                                    <tr style={{ textAlign: "center" }}>
                                        <th>วันที่ขอเบิก</th>
                                        <th>ชื่อผู้ขอเบิก</th>
                                        <th>ประเภทสินค้า</th>
                                        <th>รหัสสินค้า</th>
                                        <th>จำนวน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.listRequestExP.map((prod) => (
                                        <tr style={{ textAlign: "center" }}>
                                            <td>{dayjs(prod.requestdate)
                                                .add(543, "year")
                                                .format("DD/MM/YYYY")}</td>
                                            <td>{prod.name}</td>
                                            <td>{prod.producttype.nameTH}</td>
                                            <td>{prod.producttype.code}</td>
                                            <td>{prod.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </DivFromDown>
                </DivFrom>
            </DivBase>
        </div>
    )
}

export default index