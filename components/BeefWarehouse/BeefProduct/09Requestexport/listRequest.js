import React, { useState } from "react";

import { Removebutton } from '../../../../utils/button';
import { Removebuttoncolor } from '../../../../utils/buttonColor';

import { Icon } from "react-icons-kit";
import { close } from "react-icons-kit/fa/close";
import { check } from "react-icons-kit/fa/check";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const DELETEREQUESTPRODUCT = gql`
mutation DELETEREQUESTPRODUCT($id: ID) {
  deleteRequestProduct(id: $id) {
    id
  }
}
`

function listRequest({ list }) {
    const MySwal = withReactContent(Swal);
    const [infore, SetinfoRe] = useState(list);
    const [deleteRequestProduct] = useMutation(DELETEREQUESTPRODUCT, {
        onCompleted: {

        },
        /* refetchQueries: [
            {
                query: QUERYLISTREQUESTP,
            }
        ], */
    })
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
                                Router.push("beefwarehouse/beefproduct/requestexport").then(() => Router.reload())
                            }
                        >
                            ตกลง
                        </span>
                    ),
                    confirmButtonColor: "#3085d6",
                });
            }
        })
    };

    const handdleSubmitDelete = async () => {
        try {
            await deleteRequestProduct({
                variables: {
                    id: infore.id,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <tr style={{ textAlign: "center" }}>
                <td>{dayjs(infore.requestdate)
                    .add(543, "year")
                    .format("DD/MM/YYYY")}</td>
                <td>{infore.typemeat}</td>
                <td>{infore.beeftype.nameTH}</td>
                <td>{infore.beeftype.code}</td>
                <td>
                    {infore.status.id === "62b95adc1b771c3d8ae74a05" ?
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
                    {infore.status.id === "62b95adc1b771c3d8ae74a05" ? ("-") : (
                        <Removebuttoncolor onClick={DeleteAlert}>
                            <Removebutton />
                        </Removebuttoncolor>
                    )}
                </td>
            </tr>
        </>
    )
}

export default listRequest