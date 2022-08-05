import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./RequestFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

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

const CREATERE = gql`
mutation Mutation($name: String, $producttype: String, $quantity: String, $status: String) {
  createRequestExportP(name: $name, producttype: $producttype, quantity: $quantity, status: $status) {
    id
    name
  }
}
`;


function create() {
    const MySwal = withReactContent(Swal);
    const [infore, setinfore] = useState({
        name: "",
        producttype: "",
        quantity: "",
    });
    const { data } = useQuery(QUERYTYPE);
    const [createRequestExportP] = useMutation(CREATERE, {
        variables: {
            name: infore.name,
            producttype: infore.producttype,
            quantity: infore.quantity,
            status: "6280fac6d3dbf7345093676f",

        },
        onCompleted: (data) => {
            if (data) {
                setinfore({
                    name: "",
                    producttype: "",
                    quantity: "",
                });
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ทำการบึนทึกข้อมูลสิ้น",
                    confirmButtonText: (
                        <span
                            onClick={() =>
                                Router.reload("beefwarehouse/beefproduct/requestexport")
                            }
                        >
                            ตกลง
                        </span>
                    ),
                    confirmButtonColor: "#3085d6",
                });
            }
        }
    });

    const handleChange = (e) => {
        setinfore({
            ...infore,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await createRequestExportP();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <form>
                <DivFromInsideLeft>
                    ชื่อผู้ขอเบิก :
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                        }}
                    >
                        <Searchinput
                            value={infore.name}
                            name="name"
                            onChange={handleChange}
                            style={{
                                borderColor: `${!infore.name ? "red" : ""}`,
                                height: "35px",
                                textAlign: "center"
                            }}
                        />
                        {!infore.name ? (
                            <label style={{ color: "red" }}>กรุณากรอกชื่อ</label>
                        ) : (
                            ""
                        )}
                    </div>
                </DivFromInsideLeft>
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
                                value={infore.producttype}
                                name="producttype"
                                onChange={handleChange}
                                disabled={!infore.name}
                                style={{
                                    height: "35px",
                                    width: "160px",
                                    border: "1px solid #AFAFAF",
                                    borderRadius: "4px ",
                                    textAlign: "center",
                                    fontSize: "14px",
                                }}
                            >
                                <option value="">เลือก</option>
                                {data && data.allproducttype.map((prod) => (
                                    <option key={prod.id} value={prod.id}>{prod.nameTH}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </DivFromInsideLeft>
                <DivFromInsideLeft>
                    จำนวน :
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                        }}
                    >
                        <Searchinput
                            value={infore.quantity}
                            name="quantity"
                            onChange={handleChange}
                            disabled={!infore.producttype || !infore.name}
                            style={{ textAlign: "center", backgroundColor: `${!infore.producttype || !infore.name ? "#ececec" : ""}`, }}
                        />
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
                    <Savebutton1 onClick={handleSubmit} disabled={!infore.producttype || !infore.name || !infore.quantity} style={{ backgroundColor: `${!infore.producttype || !infore.name || !infore.quantity ? "gray" : ""}`, }}>บันทึก</Savebutton1>
                </div>
            </form>
        </div>
    )
}

export default create
