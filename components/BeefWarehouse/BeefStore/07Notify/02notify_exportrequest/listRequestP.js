import React, { useState } from "react";
import Router from "next/router";
import dayjs from "dayjs";

import { Savebuttoncolor, Editbuttoncolor } from "../../../../../utils/buttonColor";
import { Savebutton } from "../../../../../utils/button";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { QUERYLISTP } from "./index"


import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
const UPDATESTATUSP = gql`
mutation UpdateRequestProduct($id: ID) {
  updateRequestProduct(id: $id) {
    id
  }
}
`
function listRequestP({ list }) {
  const MySwal = withReactContent(Swal);
  const [infolist, SetinfoList] = useState(list)
  const [UpdateRequestProduct] = useMutation(UPDATESTATUSP, {
    onCompleted: (data) => {
      if (data) {
        /* SetinfoList(data.UpdateRequestProduct) */
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
        query: QUERYLISTP,
      },
    ],
  })
  const handleSubmit = async () => {
    try {
      await UpdateRequestProduct({
        variables: {
          id: infolist.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td>{dayjs(infolist.requestdate)
          .add(543, "year")
          .format("DD/MM/YYYY")}
        </td>
        <td>{infolist.typemeat}</td>
        <td>{infolist.beeftype.nameTH}</td>
        <td>{infolist.beeftype.code}</td>

        <td>
          {infolist.status.id === "62b95adc1b771c3d8ae74a05" ? (
            <Icon
              size={20}
              icon={check}
              style={{ color: "green" }}
            />) : (
            <Editbuttoncolor onClick={handleSubmit} >
              <Savebutton />
            </Editbuttoncolor>
          )}
        </td>
      </tr>
    </>
  )
}

export default listRequestP