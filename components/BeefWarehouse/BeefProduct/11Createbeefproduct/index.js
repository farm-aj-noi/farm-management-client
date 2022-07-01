import React, { useState, useRef, useEffect } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor, DivFromInsideLeft, Searchinput, Savebutton1 } from "./CreateFrom";
import { DivBase } from "../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";


import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Test from "./test"


const QUERYTYPE = gql`
  query QUERYTYPE {
    allproducttype {
      id
      code
      nameTH
      nameEN
      BBE
      unit {
        name
        id
      }
    }
  }
`;

const CREATEPRODUCT = gql`
mutation CREATEPRODUCT($weight: Int, $producttype: String) {
  createBeefproduct(weight: $weight, producttype: $producttype) {
    id
    weight
    barcode
    MFG
    BBE
  }
}
`

export const QUERYLUMP = gql`
query QUERYLUMP {
  LumpForProduct {
    id
    weight
    beeftype {
      nameTH
      code
    }
    barcode
  }
}
`

export const QUERYCHOP = gql`
query QUERYCHOP {
  ChopForProduct {
    id
    weight
    barcode
    beeftype {
      code
      nameTH
    }
  }
}
`

const index = () => {
    const { data: type } = useQuery(QUERYTYPE)
    const { data: lump } = useQuery(QUERYLUMP)
    const { data: chop } = useQuery(QUERYCHOP)

    const [idcreate, setidcreate] = useState("")
    /* console.log(idcreate) */
    const [createpro, setcreatepro] = useState({
        weight: "",
        producttype: "",
    })
    /* console.log(createpro) */
    const [createBeefproduct] = useMutation(CREATEPRODUCT, {
        variables: {
            weight: (createpro.weight = parseInt(createpro.weight)),
            producttype: createpro.producttype,
        },
        onCompleted: (data) => {
            if (data) {
                setidcreate(data.createBeefproduct.id);
            }
        }
    })
    const handleChangeCreate = (e) => {
        setcreatepro({
            ...createpro,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmitCreate = async (e) => {
        try {
            e.preventDefault();
            await createBeefproduct();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div
                style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
            >
                <HeaderColor
                    style={{
                        width: "fit-content",
                        height: "fit-content",
                        padding: "5px 30px",
                    }}
                >
                    แปรรูปสินค้าผลิตภัณฑ์
                </HeaderColor>
            </div>
            <DivBase
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 270px 1300px  1fr",
                    gridRowGap: "15px",
                    gridColumnGap: "10px",
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
                        ดำเนินการแปรรูปสินค้าผลิตภัณฑ์
                    </DivFromTop>
                    <DivFromDown>
                        <div>
                            <from>
                                <DivFromInsideLeft style={{ marginTop: "5px" }}>
                                    ประเภทสินค้า :
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateRows: "1fr 15px",
                                        }}
                                    >
                                        <div style={{ display: "inline", width: "170px" }}>
                                            <select
                                                name="producttype"
                                                value={createpro.producttype}
                                                onChange={handleChangeCreate}
                                                style={{
                                                    height: "35px",
                                                    width: "160px",
                                                    border: "1px solid #AFAFAF",
                                                    borderRadius: "4px",
                                                    textAlign: "center",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <option value="">เลือก</option>
                                                {type && type.allproducttype.map((prod) => (
                                                    <option key={prod.id} value={prod.id}>{prod.nameTH}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </DivFromInsideLeft>
                                <DivFromInsideLeft>
                                    น้ำหนัก :
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateRows: "1fr 15px",
                                        }}
                                    >
                                        <Searchinput type="number" name="weight" value={createpro.weight} style={{
                                            textAlign: "center"
                                        }}
                                            onChange={handleChangeCreate} />
                                    </div>
                                </DivFromInsideLeft>
                                <div
                                    style={{
                                        display: "inline-block",
                                        justifySelf: "right",
                                        float: "right",
                                        paddingRight: "10px",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <Savebutton1 /* onClick={handleSubmit} */
                                      /*   disabled={}
                                        style={{
                                            backgroundColor: `${
                                                ? "gray"
                                                : ""
                                                }`,
                                        }} */  onClick={handleSubmitCreate}>บันทึก</Savebutton1>
                                </div>
                            </from>
                        </div>
                    </DivFromDown>
                </DivFrom>
                <DivFrom
                    style={{
                        width: "100%",
                        gridRowStart: "2",
                        gridRowEnd: "3",
                        gridColumnStart: "3",
                    }}
                >
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        รายการซากโค
                    </DivFromTop>
                    <DivFromDown>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridColumnGap: "10px",
                        }}>
                            <div style={{ height: "250px", overflow: "auto" }}>
                                <p style={{ textAlign: "center" }}>รายการซากโคก้อนเนื้อ</p>
                                <Table
                                    striped
                                    bordered
                                    responsive
                                    hover
                                    style={{ margin: "auto" }}
                                >
                                    <thead>
                                        <tr style={{ textAlign: "center" }}>
                                            <th>ประเภทซาก</th>
                                            <th>รหัสซาก</th>
                                            <th>ทะเบียนขุน</th>
                                            <th>น้ำหนัก</th>
                                            <th>รหัสบาร์โค้ด</th>
                                            <th>เลือก</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lump && lump.LumpForProduct.map((prod) => (
                                            <tr style={{ textAlign: "center" }}>
                                                <td>{prod.beeftype.nameTH}</td>
                                                <td>{prod.beeftype.code}</td>
                                                <td>{ }</td>
                                                <td>{prod.weight}</td>
                                                <td>{prod.barcode}</td>
                                                <td ><input type="checkbox" name="id" id="prod.id" /></td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div style={{ height: "250px", overflow: "auto" }}>
                                <p style={{ textAlign: "center" }}>รายการซากโคชิ้นเนื้อ</p>
                                <Table
                                    striped
                                    bordered
                                    responsive
                                    hover
                                    style={{ margin: "auto" }}
                                >
                                    <thead>
                                        <tr style={{ textAlign: "center" }}>
                                            <th>ประเภทซาก</th>
                                            <th>รหัสซาก</th>
                                            <th>ทะเบียนขุน</th>
                                            <th>น้ำหนัก</th>
                                            <th>รหัสบาร์โค้ด</th>
                                            <th>เลือก</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chop && chop.ChopForProduct.map((prod) => (
                                            <tr style={{ textAlign: "center" }}>
                                                <td>{prod.beeftype.nameTH}</td>
                                                <td>{prod.beeftype.code}</td>
                                                <td>{ }</td>
                                                <td>{prod.weight}</td>
                                                <td>{prod.barcode}</td>
                                                <td><input type="checkbox" value={prod.id} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>


                    </DivFromDown>
                </DivFrom>

                <DivFrom
                    style={{
                        width: "1010px",
                        gridRowStart: "3",
                        gridRowEnd: "3",
                        gridColumnStart: "3",
                    }}
                ><DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        รายการสินค้าผลิตภัณฑ์
                    </DivFromTop>
                    <DivFromDown>
                        <div style={{ height: "200px", overflow: "auto" }}>
                            <Table
                                striped
                                bordered
                                responsive
                                hover
                                style={{ margin: "auto" }}
                            >
                                <thead>
                                    <tr style={{ textAlign: "center" }}>
                                        <th>ประเภทสินค้า</th>
                                        <th>รหัสสินค้า</th>
                                        <th>บาร์โค้ด</th>
                                        <th>น้ำหนัก (กก.)</th>
                                        <th>วันที่ผลิต</th>
                                        <th>วันหมดอายุ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ textAlign: "center" }}>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                    </DivFromDown>
                </DivFrom>
            </DivBase>
        </div >
    );
};

export default index;
