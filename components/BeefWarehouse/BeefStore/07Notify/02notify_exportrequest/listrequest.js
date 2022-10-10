import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import dayjs from 'dayjs';
import { Savebuttoncolor, Editbuttoncolor } from "../../../../../utils/buttonColor";
import { Savebutton } from "../../../../../utils/button";
import { QUERYLISTREQUEST } from "../../../../Saleonline/Request/index"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import Router from "next/router";
const UPDATESTATUS = gql`
mutation UPDATESTATUS($id: ID) {
  updateRequestB(id: $id) {
    id 
  }
}
`
function listrequest({ listre }) {
  const MySwal = withReactContent(Swal);
  const [infore, Setinfore] = useState(listre);
  const [updateRequestB] = useMutation(UPDATESTATUS, {
    onCompleted: (data) => {
      if (data) {
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
            Router.reload("beefwarehouse/beefstore/notify/notify_exportrequest")
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: QUERYLISTREQUEST,
      },
    ],
  })
  const handleSubmit = async () => {
    try {
      await updateRequestB({
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
          .format("DD/MM/YYYY")}
        </td>
        <td>{infore.typemeat ? infore.typemeat : "-"}</td>
        <td>{infore.beeftype.nameTH ? infore.beeftype.nameTH : "-"}</td>
        <td>{infore.beeftype.code}</td>
        <td>{infore.grade ? (infore.grade) : ("-")}</td>
        <td>
          {infore.status.id === "63299201e09fd895642f3cab" ? (
            <Icon
              size={20}
              icon={check}
              style={{ color: "green" }}
            />) : (
            <Editbuttoncolor style={{ BackGroundcolor: "yellow" }} onClick={handleSubmit}>
              <Savebutton />
            </Editbuttoncolor>
          )}
        </td>
      </tr>
    </>
  )
}

export default listrequest