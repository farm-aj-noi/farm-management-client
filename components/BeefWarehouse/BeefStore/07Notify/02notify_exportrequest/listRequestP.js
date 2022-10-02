import React, { useState } from "react";
import Router from "next/router";
import dayjs from "dayjs";

import { Savebuttoncolor } from "../../../../../utils/buttonColor";
import { Savebutton } from "../../../../../utils/button";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { QUERYLISTP } from "./index"

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
          {infolist.status.id === "62b95adc1b771c3d8ae74a05" ? ("เสร็จสิ้น") : (
            <Savebuttoncolor onClick={handleSubmit}>
              <Savebutton />
            </Savebuttoncolor>
          )}
        </td>
      </tr>
    </>
  )
}

export default listRequestP