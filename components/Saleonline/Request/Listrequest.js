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
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";
import { Icon } from "react-icons-kit";
import { QUERYREQUESTEX } from "../../BeefWarehouse/BeefStore/07Notify/02notify_exportrequest"

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
    const [deleteRequest] = useMutation(DELETEREQUEST, {
        onCompleted: {

        },
        refetchQueries: [
            {
                query: QUERYREQUESTEX,
            }
        ],
    });

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
                                Router.push("/saleonline/request").then(() => Router.reload())
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
                <td>{inforequest.typemeat ? inforequest.typemeat : "-"}</td>
                <td>{inforequest.beeftype.nameTH}</td>
                <td>{inforequest.beeftype.code}</td>
                <td>{inforequest.grade ? (inforequest.grade) : ("-")}</td>
                {/*  <td>{inforequest.quantity}</td> */}
                <td>{inforequest.status.id === "63299201e09fd895642f3cab" ?
                    (
                        <Icon
                            size={20}
                            icon={check}
                            style={{ color: "green" }}
                        />
                    ) : (
                        <Icon
                            size={20}
                            icon={close}
                            style={{ color: "red" }}
                        />
                    )}</td>
                <td>
                    {inforequest.status.id === "63299201e09fd895642f3cab" ? ("-") : (
                        <Removebuttoncolor onClick={DeleteAlert}>
                            <Removebutton />
                        </Removebuttoncolor>
                    )}

                </td>
            </tr>
        </>
    )
}

export default Listrequest