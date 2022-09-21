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

const CREATEREQUESTPRODUCT = gql`
mutation CreateRequestProduct($name: String, $typemeat: String, $beeftype: String) {
    CREATEREQUESTPRODUCT(name: $name, typemeat: $typemeat, beeftype: $beeftype) {
    id
  }
}

`


function create() {
    const MySwal = withReactContent(Swal);
    const [infore, setinfore] = useState({
        name: "",
        producttype: "",
        quantity: "",
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
                               /*  onChange={handleChange}
                                disabled={!infore.name} */
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
                                
                            </select>
                        </div>
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
                                /* onChange={handleChange}
                                disabled={!infore.name} */
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
                                
                            </select>
                        </div>
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
                    <Savebutton1 /* onClick={handleSubmit} disabled={!infore.producttype || !infore.name || !infore.quantity} style={{ backgroundColor: `${!infore.producttype || !infore.name || !infore.quantity ? "gray" : ""}`, }} */>บันทึก</Savebutton1>
                </div>
            </form>
        </div>
    )
}

export default create
