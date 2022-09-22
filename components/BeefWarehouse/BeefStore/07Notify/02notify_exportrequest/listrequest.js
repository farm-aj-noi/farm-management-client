import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import dayjs from 'dayjs';
import { Savebuttoncolor } from "../../../../../utils/buttonColor";
import { Savebutton } from "../../../../../utils/button";
import { QUERYREQUESTEX } from "./index"

const UPDATESTATUS = gql`
mutation UPDATESTATUS($id: ID) {
  updateRequestB(id: $id) {
    id
  }
}
`


function listrequest({ listre }) {
  const [infore, Setinfore] = useState(listre);
  const [updateRequestB] = useMutation(UPDATESTATUS, {
    onCompleted: (data) => {
    },
    refetchQueries: [
      {
        query: QUERYREQUESTEX,
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
        <td>{infore.beeftype.nameTH}</td>
        <td>{infore.beeftype.code}</td>
        <td>{infore.grade ? (infore.grade) : ("-")}</td>
        <td>
          {infore.status.id === "63299201e09fd895642f3cab" ? ("เสร็จสิ้น") : (
            <Savebuttoncolor onClick={handleSubmit}>
              <Savebutton />
            </Savebuttoncolor>
          )}
        </td>
      </tr>
    </>
  )
}

export default listrequest