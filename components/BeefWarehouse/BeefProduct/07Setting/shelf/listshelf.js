import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
    Searchinput,
} from "../SettingFrom";


import {
    Savebuttoncolor,
    Editbuttoncolor,
    Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import {
    Removebutton,
    Editbutton,
    Savebutton,
} from "../../../../../utils/button";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

const UPDATEPBASKET = gql`
mutation Mutation($id: ID, $basketname: String) {
  updatePbasket(id: $id, basketname: $basketname) {
    id
    basketname
  }
}
`;

const DELETEPBASKET = gql`
mutation DeletePbasket($id: ID) {
  deletePbasket(id: $id) {
    id
    basketname
  }
}
`;


const listshelf = ({ listpbasket }) => {
    const MySwal = withReactContent(Swal);
    const [edit, setedit] = useState(false);
    const [infopbasket, setpbasket] = useState(listpbasket);
    const [updatePbasket] = useMutation(UPDATEPBASKET, {
        onCompleted: (data) => {
            setedit(false);
            MySwal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: "ทำการแก้ไขข้อมูลสิ้น",
                confirmButtonText: (
                    <span
                        onClick={() =>
                            Router.reload("beefwarehouse/beefproduct/setting/shelf")
                        }
                    >
                        ตกลง
                    </span>
                ),
                confirmButtonColor: "#3085d6",
            });
        }
    })

    const handleChange = (e) => {
        setpbasket({
            ...infopbasket,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async () => {
        if (infopbasket === listpbasket) {
            setpbasket(listpbasket);
            setedit(false);
            return;
        }
        try {
            await updatePbasket({
                variables: {
                    ...infopbasket
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteAlert = () => {
        Swal.fire({
            title: 'ต้องการลบข้อมูล?',
            text: "ยืนยันการลบข้อมูลประเภทตะกร้าจัดเก็บ!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                handdleSubmitDelete();
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ทำการลบข้อมูลสิ้น",
                    confirmButtonText: (
                        <span
                            onClick={() =>
                                Router.push("beefwarehouse/beefproduct/setting/shelf").then(() => Router.reload())
                            }
                        >
                            ตกลง
                        </span>
                    ),
                    confirmButtonColor: "#3085d6",
                });
            }
        })
    }

    const [deletePbasket] = useMutation(DELETEPBASKET, {
        onCompleted: (data) => {
           /*  MySwal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: "ทำการลบข้อมูลสิ้น",
                confirmButtonText: (
                    <span
                        onClick={() =>
                            Router.reload("beefwarehouse/beefproduct/setting/shelf")
                        }
                    >
                        ตกลง
                    </span>
                ),
                confirmButtonColor: "#3085d6",
            }); */
        }
    })

    const handdleSubmitDelete = async () => {
        try {
            await deletePbasket({
                variables: {
                    id: infopbasket.id,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <tr style={{ textAlign: "center" }}>
            <td>
                {edit ? (
                    <Searchinput
                        value={infopbasket.basketname}
                        name="basketname"

                        style={{ width: "100px", textAlign: "center" }}
                        onChange={handleChange}
                    />
                ) : (
                    infopbasket.basketname
                )}
            </td>
            <td>{infopbasket.productroom.roomname}</td>
            <td>{infopbasket.freezer.freezername}</td>
            <td>
                {edit ? (
                    <Savebuttoncolor onClick={handleSubmit}>
                        <Savebutton />
                    </Savebuttoncolor>
                ) : (
                    <Editbuttoncolor onClick={() => setedit(true)}>
                        <Editbutton />
                    </Editbuttoncolor>
                )}
            </td>
            <td>
                <Removebuttoncolor onClick={DeleteAlert}>
                    <Removebutton />
                </Removebuttoncolor>
            </td>
        </tr>
    )
}

export default listshelf