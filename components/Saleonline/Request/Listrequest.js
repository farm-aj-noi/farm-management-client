import React, { useState } from 'react'
import { Card, Table, Form, Button } from "react-bootstrap"
import { Icon2 } from "../../../utils/naviconbeefstore"
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import dayjs from 'dayjs';
import { Removebutton } from '../../../utils/button';
import { Removebuttoncolor } from '../../../utils/buttonColor';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



const DELETEREQUEST = gql`
 mutation DELETEREQ($id: ID) {
    deleteRequest(id: $id) {
      id
      name
    }
  }
`

function Listrequest({ listrequest }) {
    const [inforequest, Setinforequest] = useState(listrequest);
    console.log(inforequest)
    const MySwal = withReactContent(Swal);
    const [deleteRequest] = useMutation(DELETEREQUEST);

    const DeleteAlert = () => {
        Swal.fire({
            title: 'ต้องการลบข้อมูล?',
            text: "ยืนยันการลบข้อมูลคำร้องขอเบิก!",
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
                                Router.push("beefwarehouse/beefstore/notify/notify_exportrequest").then(() => Router.reload())
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

    const handdleSubmitDelete = async () => {
        try {
            await deleteRequest({
                variables: {
                    id: inforequest.id,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <tr style={{ textAlign: "center" }}>
                <td>{dayjs(inforequest.requestdate)
                    .add(543, "year")
                    .format("DD/MM/YYYY")}
                </td>
                <td>{inforequest.beeftype.nameTH}</td>
                <td>grade</td>
                <td>{inforequest.quantity}</td>
                <td>{inforequest.status.nameTH}</td>
                <td>
                    <Removebuttoncolor onClick={DeleteAlert}>
                        <Removebutton />
                    </Removebuttoncolor>
                </td>
            </tr>
        </>
    )
}

export default Listrequest