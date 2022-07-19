import React, { useState, useRef, useEffect } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor, DivFromInsideLeft, Searchinput, Savebutton1 } from "./CreateFrom";
import { DivBase } from "../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import Listp from "./Listproduct";

import Listlump from "./listlump";
import Listchop from "./listchop";

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
export const PRODUCTSEARCH = gql`
query PRODUCTSEARCH {
  ProductSearch {
    id
    barcode
    weight
    MFG
    BBE
    producttype {
      code
      nameTH
    }
  }
}
`
const UPDATETYPEPRODUCT = gql`
mutation UPDATETYPEPRODUCT($id: ID!, $barcode: String) {
  updateBeefProduct(id: $id, barcode: $barcode) {
    id
  }
}
`

export const PRODUCTSEARCH2 = gql`
query PRODUCTSEARCH2($id: ID) {
  ProductSearch2(id: $id) {
    id
    chop {
      id
      weight
      barcode
      beeftype {
        code
        nameTH
      }
      imslaughter {
        numcow
      }
      id
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
    const MySwal = withReactContent(Swal);
    const [success, setsuccess] = useState(false);
    const [successtype, setsuccesstype] = useState(false);
    const { data: type } = useQuery(QUERYTYPE)
    const [idcreate, setidcreate] = useState("")
    console.log(idcreate)

    const [createpro, setcreatepro] = useState({
        weight: "",
        producttype: "",
    })

    const [typebeef, settypebeef] = useState({
        barcode: "",
    })

    const { data } = useQuery(PRODUCTSEARCH2, {
        variables: {
            id: idcreate,
        }
    })

    const [UpdateBeefProduct] = useMutation(UPDATETYPEPRODUCT, {
        refetchQueries: [
            {
                query: PRODUCTSEARCH2,
                variables: { id: idcreate }
            }
        ],
        onCompleted: (data) => {
            if (data) {
                settypebeef({
                    barcode: "",
                })
                setsuccesstype(true)
                /*   MySwal.fire({
                      icon: "success",
                      title: "สำเร็จ",
                      text: "เสร็จสิ้นกระบวนการแปรรูป",
                      confirmButtonText: (
                          <span
                          >
                              ตกลง
                          </span>
                      ),
                      confirmButtonColor: "#3085d6",
                  }); */
            }
        },

    }
    )
    const handleChangeupdate = (e) => {
        settypebeef({
            ...typebeef,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmitupdate = async (e) => {
        try {
            e.preventDefault();
            await UpdateBeefProduct({
                variables: {
                    barcode: typebeef.barcode,
                    id: idcreate,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const [createBeefproduct] = useMutation(CREATEPRODUCT, {
        variables: {
            weight: (createpro.weight = parseInt(createpro.weight)),
            producttype: createpro.producttype,
        },
        onCompleted: (data) => {
            if (data) {
                setsuccess(true);
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
    const { data: Psearch } = useQuery(PRODUCTSEARCH)
    const handleClick = () => {
        MySwal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "ทำการเลือกซากแปรรูปเสร็จสิ้น",
            confirmButtonText: (
                <span onClick={() =>
                    Router.reload("beefwarehouse/beefproduct/createproduct")
                }
                >
                    ตกลง
                </span>
            ),
            confirmButtonColor: "#3085d6",
        })
    }
    return (
        <div style={{ marginTop: "100px" }}>
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
                    gridTemplateColumns: "1fr 270px 1000px  1fr",
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
                        ดำเนินการเลือกผลิตภัณฑ์แปรรูป
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
                                                disabled={success}
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
                                    น้ำหนัก (กก.) :
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateRows: "1fr 15px",
                                        }}
                                    >
                                        <Searchinput type="number" name="weight" value={createpro.weight} style={{
                                            backgroundColor: `${!createpro.producttype ? "#ececec" : ""}`,
                                            textAlign: "center",
                                            height: "35px",
                                        }}
                                            onChange={handleChangeCreate} disabled={!createpro.producttype || success} />
                                    </div>
                                </DivFromInsideLeft>
                                {!success && (
                                    <div
                                        style={{
                                            display: "inline-block",
                                            justifySelf: "right",
                                            float: "right",
                                            paddingRight: "10px",
                                            paddingBottom: "10px",
                                        }}
                                    >
                                        <Savebutton1
                                            disabled={!createpro.weight}
                                            style={{
                                                backgroundColor: `${!createpro.weight
                                                    ? "gray"
                                                    : ""
                                                    }`,
                                            }} onClick={handleSubmitCreate}>บันทึก</Savebutton1>
                                    </div>
                                )}
                            </from>
                        </div>
                    </DivFromDown>
                </DivFrom>
                <DivFrom
                    style={{
                        width: "100%",
                        gridRowStart: "2",
                        gridRowEnd: "2",
                        gridColumnStart: "3",
                    }}
                >
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        ดำเนินรายการแปรรูปสินค้าผลิตภัณฑ์
                    </DivFromTop>
                    <DivFromDown>
                        {success && (
                            <div>
                                บาร์โค้ด : { }
                                <Searchinput
                                    style={{ width: "170px", height: "35px" }}
                                    type="text"
                                    id="barcode"
                                    name="barcode"
                                    onChange={handleChangeupdate}
                                    value={typebeef.barcode}>
                                </Searchinput>
                                <Savebutton1 style={{
                                    height: "35px",
                                    width: " 50px",
                                    marginBottom: "4px",
                                    backgroundColor: `${!typebeef.barcode ? "gray" : ""}`
                                }}
                                    onClick={handleSubmitupdate}
                                    disabled={!typebeef.barcode}>
                                    บันทึก</Savebutton1>
                            </div>
                        )}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px"
                        }}>
                            <div style={{ height: `${!success ? "" : "200px"}`, overflow: `${!success ? "" : "auto"}`, marginRight: "20px" }}>
                                <p style={{ textAlign: "center", margin: "0px", fontSize: "16px" }}>รายการซากโคก้อนเนื้อ</p>
                                <Table
                                    striped
                                    bordered
                                    responsive
                                    hover
                                    style={{ margin: "auto" }}
                                >
                                    <thead>
                                        <tr style={{ textAlign: "center", fontSize: "18px" }}>
                                            <th>ประเภทซาก</th>
                                            <th>รหัสซาก</th>
                                            <th>ทะเบียนขุน</th>
                                            <th>น้ำหนัก (กก.)</th>
                                            <th>รหัสบาร์โค้ด</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {success ? (
                                            <>
                                                {data && data.ProductSearch2.map((prod) => (
                                                    <Listlump key={prod.id} listl={prod} />
                                                ))}
                                            </>
                                        ) : (
                                            <tr style={{ textAlign: "center" }}>
                                                <td colspan="6">กรุณาเลือกประเภทสินค้า</td>
                                            </tr>
                                        )}


                                    </tbody>
                                </Table>
                            </div>
                            <div style={{ height: `${!success ? "" : "200px"}`, overflow: `${!success ? "" : "auto"}` }}>
                                {data && data.ProductSearch2 ? (<>{data && data.ProductSearch2 && data.ProductSearch2.chop && data.ProductSearch2.chop.map((prod) => (
                                    <> <p>{prod.beeftype.nameTH}</p>
                                        <p>{prod.barcode}</p></>

                                ))}</>) : ("")}
                                { }
                                <p style={{ textAlign: "center", margin: "0px" }}>รายการซากโคชิ้นเนื้อ</p>
                                <Table
                                    striped
                                    bordered
                                    responsive
                                    hover
                                    style={{ margin: "auto" }}
                                >
                                    <thead>
                                        <tr style={{ textAlign: "center", fontSize: "18px" }}>
                                            <th>ประเภทซาก</th>
                                            <th>รหัสซาก</th>
                                            <th>ทะเบียนขุน</th>
                                            <th>น้ำหนัก (กก.)</th>
                                            <th>รหัสบาร์โค้ด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            {success ? (<>
                                                {data && data.ProductSearch2.map((prod) => (
                                                    <Listchop key={prod.id} listc={prod} />
                                                ))}
                                            </>) : (<tr style={{ textAlign: "center" }}>
                                                <td colspan="6">กรุณาเลือกประเภทสินค้า</td>
                                            </tr>)}

                                        </>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        {successtype && (
                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
                                <Savebutton1 style={{ width: "150px" }}
                                    onClick={handleClick}>
                                    เสร็จสิ้น</Savebutton1>

                            </div>
                        )}

                    </DivFromDown>
                </DivFrom>
                <DivFrom
                    style={{
                        width: "100%",
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
                        <div style={{
                            height: `${Psearch && Psearch.ProductSearch.length > 5 ? "250px" : ""}`,
                            overflow: `${Psearch && Psearch.ProductSearch.length > 5 ? "auto" : ""}`
                        }}>
                            <Table
                                striped
                                bordered
                                responsive
                                hover
                                style={{ margin: "auto" }}
                            >
                                <thead>
                                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                                        <th>ประเภทสินค้า</th>
                                        <th>รหัสสินค้า</th>
                                        <th>น้ำหนัก (กก.)</th>
                                        <th>วันที่ผลิต</th>
                                        <th>วันหมดอายุ</th>
                                        <th>บาร์โค้ด</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {Psearch && Psearch.ProductSearch.length > 0 ? (
                                        Psearch.ProductSearch.map((prod) => (
                                            <Listp key={prod.id} listp={prod} />
                                        ))
                                    ) : (
                                        <tr style={{ textAlign: "center" }}>
                                            <td colSpan="6">ไม่พบข้อมูล</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </Table>
                        </div>

                    </DivFromDown>
                </DivFrom>
            </DivBase >
        </div >
    );
};

export default index;