import React, { useState, useContext } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./RequestFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from '../../../../appState/AuthProvider';
import Router from "next/router";
import { QUERYRE } from "./index"

const CREATEREQUESTPRODUCT = gql`
mutation CREATEREQUESTPRODUCT($name: String, $typemeat: String, $beeftype: String) {
    createRequestProduct(name: $name, typemeat: $typemeat, beeftype: $beeftype) {
    id
  }
}

`


function create() {
    const MySwal = withReactContent(Swal);
    const { user, signout } = useContext(AuthContext);
    const [infore, setinfore] = useState({
        name: user.name,
        typemeat: "",
        beeftype: "",
    });
    const [createRequestProduct] = useMutation(CREATEREQUESTPRODUCT, {
        variables: {
            ...infore
        },
        onCompleted: (data) => {
            if (data) {
                setinfore({
                    typemeat: "",
                    beeftype: "",
                });
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ทำการร้องขอเบิกเสร็จสิ้น",
                    showConfirmButton: false,
                    timer: 1000
                    /*  confirmButtonText: "ตกลง", */
                    /* confirmButtonColor: "#3085d6", */
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        // Router.reload("beefwarehouse/beefstore/import/import_halves")
                    }
                    /* if (result.isConfirmed) {
                      Router.reload("beefwarehouse/beefstore/import/import_halves")
                    } */
                });
            }
        },
        refetchQueries: [
            {
                query: QUERYRE
            }
        ]
    }
    )


    const handleChange = (e) => {
        setinfore({
            ...infore,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await createRequestProduct();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <form>
                <DivFromInsideLeft style={{ marginTop: "5px" }}>
                    ซากโค :
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                        }}
                    >
                        <div style={{ display: "inline", width: "170px" }}>
                            <select
                                value={infore.typemeat}
                                name="typemeat"
                                onChange={handleChange}
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
                                <option value="ก้อนเนื้อ">ก้อนเนื้อ</option>
                                <option value="ชิ้นเนื้อ">ชิ้นเนื้อ</option>
                            </select>
                        </div>
                    </div>
                </DivFromInsideLeft>
                <DivFromInsideLeft style={{ marginTop: "5px" }}>
                    ประเภทซาก :
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                        }}
                    >
                        <div style={{ display: "inline", width: "170px" }}>
                            <select
                                value={infore.beeftype}
                                name="beeftype"
                                onChange={handleChange}
                                disabled={!infore.typemeat}
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
                                <option value="5f446195ecd6732ad8108684">เนื้อสันคอ</option>
                                <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                                <option value="5f4461bfecd6732ad8108686">เนื้อสันนอก</option>
                                <option value="5f4461d6ecd6732ad8108687">ที-โบน สเต็ก</option>
                                <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                                <option value="5f446224ecd6732ad8108689">ใบบัวสเต็ก</option>
                                <option value="5f44623aecd6732ad810868a">เนื้อสันใน</option>
                                <option value="5f44624fecd6732ad810868b">สันสะโพก</option>
                                <option value="5f446262ecd6732ad810868c">เสือร้องไห้</option>
                                <option value="5f44628decd6732ad810868d">เนื้อซี่โครง</option>
                                <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                                <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                                <option value="5f4462c8ecd6732ad8108690">ลูกมะพร้าว</option>
                                <option value="5f4462ddecd6732ad8108691">ปลาบู่ทอง</option>
                                <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                                <option value="5f4462feecd6732ad8108693">หางตะเข้</option>
                                <option value="5f44630fecd6732ad8108694">น่อง</option>
                                <option value="5f446320ecd6732ad8108695">พับนอก</option>
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
                    <Savebutton1 onClick={handleSubmit} disabled={!infore.beeftype || !infore.typemeat}
                        style={{ backgroundColor: `${!infore.beeftype || !infore.typemeat ? "gray" : ""}`, }}>บันทึก</Savebutton1>
                </div>
            </form>
        </div>
    )
}

export default create
