import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Searchinput } from "../SettingFrom";
import { Savebuttoncolor } from "../../../../../utils/buttonColor";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const QUERYROOM = gql`
  query QUERYROOM {
    allproductroom {
      id
      roomname
    }
  }
`;

const CREATEFREEZER = gql`
mutation CREATEFREEZER($freezername: String, $productroom: String) {
  createFreezer(freezername: $freezername, productroom: $productroom) {
    id
    freezername
  }
}
`

const create = () => {
    const MySwal = withReactContent(Swal);
    const { data } = useQuery(QUERYROOM);
    const [infofreezer, setinfofreezer] = useState({
        freezername: "",
        productroom: ""
    });
    console.log(infofreezer);
    const [createFreezer] = useMutation(CREATEFREEZER, {
        variables: {
            freezername: infofreezer.freezername,
            productroom: infofreezer.productroom
        },
        onCompleted: (data) => {
            if (data) {
                setinfofreezer({
                    freezername: "",
                    productroom: "",
                });
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ทำการบึนทึกข้อมูลสิ้น",
                    confirmButtonText: (
                        <span
                            onClick={() =>
                                Router.reload("beefwarehouse/beefproduct/setting/freezer")
                            }
                        >
                            ตกลง
                        </span>
                    ),
                    confirmButtonColor: "#3085d6",
                });
            }
        },
        onError: (error) => {
            if (error) {
                setinfofreezer({
                    freezername: "",
                    productroom: "",
                });
                MySwal.fire({
                    icon: "error",
                    title: <p>{error.graphQLErrors[0].message}</p>,
                    text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
                    confirmButtonText: (
                        <span
                            onClick={() => Router.reload("beefwarehouse/beefproduct/setting/freezer")}
                        >
                            ตกลง
                        </span>
                    ),
                    confirmButtonColor: "#3085d6",
                });
            }
        },
    })
    const handleChange = (e) => {
        setinfofreezer({
            ...infofreezer,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            await createFreezer();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                ห้องจัดเก็บ : { }
                <select
                    name="productroom"
                    value={infofreezer.productroom}
                    style={{
                        height: "38px",
                        width: "156px",
                        border: "1px solid #AFAFAF",
                        borderRadius: "4px",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                    onChange={handleChange}
                >
                    <option value="">เลือก</option>
                    {data &&
                        data.allproductroom.map((prod) => (
                            <option key={prod.id} value={prod.id}>
                                {prod.roomname}
                            </option>
                        ))}
                </select> { }
                ชื่อตู้แช่ : { }
                <Searchinput
                    value={infofreezer.freezername}
                    disabled={!infofreezer.productroom}
                    name="freezername"
                    style={{ width: "150px", textAlign: "center", backgroundColor: `${!infofreezer.productroom ? "#ececec" : ""}`, }}
                    onChange={handleChange}
                />
                <Savebuttoncolor
                    onClick={handleSubmit}
                    style={{
                        height: "38px",
                        width: " 50px",
                        marginLeft: "10px",
                        backgroundColor: `${!infofreezer.productroom || !infofreezer.freezername ? "gray" : ""}`,
                    }}
                    disabled={!infofreezer.productroom || !infofreezer.freezername}
                >
                    บันทึก
                </Savebuttoncolor>
            </div>
        </>
    )
}

export default create