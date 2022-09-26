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


const DELETEFREEZER = gql`
mutation DELETEFREEZER($id: ID) {
  deleteFreezer(id: $id) {
    id
  }
}
`

const UPDATEFREEZER = gql`
mutation UPDATEFREEZER($id: ID, $freezername: String) {
  updateFreezer(id: $id, freezername: $freezername) {
    id
    freezername
  }
}
`

const listfreezer = ({ listf }) => {
    const MySwal = withReactContent(Swal);
    const [infofreezer, setinfofreezer] = useState(listf)
    const [edit, setedit] = useState(false);
    const [updateFreezer] = useMutation(UPDATEFREEZER, {
        onCompleted: (data) => {
            setedit(false);
            MySwal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: "ทำการแก้ไขข้อมูลสิ้น",
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
    })

    const handleChange = (e) => {
        setinfofreezer({
            ...infofreezer,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        if (infofreezer === listf) {
            setinfofreezer(listf)
            setedit(false)
            return
        }
        try {
            await updateFreezer({
                variables: {
                    ...infofreezer
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteAlert = () => {
        Swal.fire({
            title: 'ต้องการลบข้อมูล?',
            text: "ยืนยันการลบข้อมูลประเภทชั้นจัดเก็บ!",
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
                                Router.push("beefwarehouse/beefproduct/setting/freezer").then(() => Router.reload())
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

    const [deleteFreezer] = useMutation(DELETEFREEZER, {
        onCompleted: (data) => {
            /*  MySwal.fire({
                 icon: "success",
                 title: "สำเร็จ",
                 text: "ทำการลบข้อมูลสิ้น",
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
             }); */
        }
    })

    const handdleSubmitDelete = async () => {
        try {
            await deleteFreezer({
                variables: {
                    id: infofreezer.id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <tr style={{ textAlign: "center" }}>

            <td>
                {edit ? (<Searchinput
                    value={infofreezer.freezername}
                    name="freezername"
                    style={{ width: "100px", textAlign: "center" }}
                    onChange={handleChange}
                />
                ) : (
                    infofreezer.freezername
                )}
            </td>
            <td>{infofreezer.productroom.roomname}
            </td>
            <td> {edit ? (
                <Savebuttoncolor onClick={handleSubmit}>
                    <Savebutton />
                </Savebuttoncolor>
            ) : (
                <Editbuttoncolor onClick={() => setedit(true)}>
                    <Editbutton />
                </Editbuttoncolor>
            )}
            </td>
            <td> <Removebuttoncolor onClick={DeleteAlert}>
                <Removebutton />
            </Removebuttoncolor>
            </td>
        </tr>
    )
}

export default listfreezer