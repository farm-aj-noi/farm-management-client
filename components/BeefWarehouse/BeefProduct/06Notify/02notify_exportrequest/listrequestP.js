import React, { useState } from "react";

import { Savebuttoncolor } from "../../../../../utils/buttonColor";
import { Savebutton } from "../../../../../utils/button";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
                text: "ทำการดำเนินการเสร็จสิ้น",
                confirmButtonText: (
                    <span
                        onClick={() =>
                            Router.reload("beefwarehouse/beefproduct/notify/notify_exportrequest")
                        }
                    >
                        ตกลง
                    </span>
                ),
                confirmButtonColor: "#3085d6",
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
                    {inforeP.status.id === "63299201e09fd895642f3cab" ? ("เสร็จสิ้น") :
                        (
                            <Savebuttoncolor onClick={handleSubmit}>
                                <Savebutton />
                            </Savebuttoncolor>
                        )}
                </td>
            </tr>
        </>
    )
}

export default listrequestP