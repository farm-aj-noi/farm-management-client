import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Searchinput } from "../SettingFrom";
import { Savebuttoncolor } from "../../../../../utils/buttonColor";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";


const CREATEPBASKET = gql`
mutation CREATEPBASKET($productroom: String, $freezer: String, $basketname: String) {
  createPbasket(productroom: $productroom, freezer: $freezer, basketname: $basketname) {
    id
    basketname
  }
}
`;

const QUERYROOM = gql`
  query QUERYROOM {
    allproductroom {
      id
      roomname
    }
  }
`;

const QUERYFREEZER = gql`
query QUERYFREEZER($id: ID) {
  listFreezer(id: $id) {
    id
    freezername
  }
}
`;

const create = () => {
    const MySwal = withReactContent(Swal);
    const [infopbasket, setinfopbasket] = useState({
        productroom: "",
        freezer: "",
        basketname: "",
    })
    const { data: room } = useQuery(QUERYROOM);
    const { data: freezer } = useQuery(QUERYFREEZER, {
        variables: {
            id: infopbasket.productroom,
        }
    });
    const [createPbasket] = useMutation(CREATEPBASKET, {
        variables: {
            productroom: infopbasket.productroom,
            freezer: infopbasket.freezer,
            basketname: infopbasket.basketname,
        },
        onCompleted: (data) => {
            if (data) {
                setinfopbasket({
                    productroom: "",
                    freezer: "",
                    basketname: "",
                });
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ทำการบึนทึกข้อมูลสิ้น",
                    showConfirmButton: false,
                    timer: 1000
                    /*  confirmButtonText: "ตกลง", */
                    /* confirmButtonColor: "#3085d6", */
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        Router.reload("beefwarehouse/beefproduct/setting/shelf")
                    }
                    /* if (result.isConfirmed) {
                      Router.reload("beefwarehouse/beefstore/import/import_halves")
                    } */
                });
            }
        },
    });

    const handleChange = (e) => {
        setinfopbasket({
            ...infopbasket,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await createPbasket();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <> <div>
            ตู้แช่เก็บ : { }
            <select
                value={infopbasket.productroom}
                name="productroom"
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
                {room &&
                    room.allproductroom.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                            {prod.roomname}
                        </option>
                    ))}
            </select> { }
            ชั้นจัดเก็บ : { }
            <select
                value={infopbasket.freezer}
                name="freezer"
                style={{
                    height: "38px",
                    width: "156px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                    backgroundColor: `${!infopbasket.productroom ? "#ececec" : ""}`,
                }}
                disabled={!infopbasket.productroom}
                onChange={handleChange}
            >
                <option value="">เลือก</option>
                {freezer && freezer.listFreezer.map((prod) => (
                    <option key={prod.id} value={prod.id}>{prod.freezername}</option>
                ))}

            </select> { }
            ชื่อตะกร้าจัดเก็บ : { }
            <Searchinput
                value={infopbasket.basketname}
                name="basketname"
                style={{ width: "150px", textAlign: "center", backgroundColor: `${!infopbasket.productroom || !infopbasket.freezer ? "#ececec" : ""}`, }}
                disabled={!infopbasket.productroom || !infopbasket.freezer}
                onChange={handleChange}
            />
            <Savebuttoncolor
                onClick={handleSubmit}
                style={{
                    height: "38px",
                    width: " 50px",
                    marginLeft: "10px",
                    backgroundColor: `${!infopbasket.productroom || !infopbasket.freezer || !infopbasket.basketname ? "gray" : ""}`,
                }}
                disabled={!infopbasket.productroom || !infopbasket.freezer || !infopbasket.basketname}
            >
                บันทึก
            </Savebuttoncolor>
        </div></>
    )
}

export default create