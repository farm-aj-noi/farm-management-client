import React, { useState } from "react";

import { Savebuttoncolor, Editbuttoncolor } from "../../../../../utils/buttonColor";
import { Savebutton } from "../../../../../utils/button";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";

import dayjs from "dayjs";
import { QUERYREQUESTEXPORT } from "./index"
import Router from "next/router";

const UPDATESTATUSP = gql`
mutation UpdateRequestP($id: ID) {
  updateRequestP(id: $id) {
    id
    status {
      id
      nameTH
    }
  }
}
`

function listrequestP({ listrqP }) {
    const MySwal = withReactContent(Swal);
    const [inforeP, SetinforeP] = useState(listrqP);
    const [updateRequestP] = useMutation(UPDATESTATUSP, {
        onCompleted: (data) => {
            MySwal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: "ดำเนินการเสร็จสิ้น",
                showConfirmButton: false,
                timer: 1000
                /*  confirmButtonText: "ตกลง", */
                /* confirmButtonColor: "#3085d6", */
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Router.reload("beefwarehouse/beefproduct/notify/notify_exportrequest")
                }
                /* if (result.isConfirmed) {
                  Router.reload("beefwarehouse/beefstore/import/import_halves")
                } */
            });
        },
        refetchQueries: [
            {
                query: QUERYREQUESTEXPORT,
            },
        ],
    })

    const handleSubmit = async () => {
        try {
            await updateRequestP({
                variables: {
                    id: inforeP.id,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <tr style={{ textAlign: "center" }}>
                <td >{dayjs(inforeP.requestdate)
                    .add(543, "year")
                    .format("DD/MM/YYYY")}
                </td>
                <td >{inforeP.producttype.nameTH}</td>
                <td >{inforeP.producttype.code}</td>
                <td >
                    {inforeP.status.id === "63299201e09fd895642f3cab" ? (<Icon
                        size={20}
                        icon={check}
                        style={{ color: "green" }}
                    />) :
                        (
                            <Editbuttoncolor onClick={handleSubmit}>
                                <Savebutton />
                            </Editbuttoncolor>
                        )}
                </td>
            </tr>
        </>
    )
}

export default listrequestP