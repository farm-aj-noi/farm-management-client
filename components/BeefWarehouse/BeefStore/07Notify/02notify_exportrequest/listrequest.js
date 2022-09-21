import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import dayjs from 'dayjs';
import { Savebuttoncolor } from "../../../../../utils/buttonColor";
import { Savebutton } from "../../../../../utils/button";
import { QUERYLISTREQUEST } from "../../../../Saleonline/Request/index"

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
        <td>{infore.beeftype.nameTH}</td>
        <td>{infore.beeftype.code}</td>
        <td>grade</td>
        <td>{infore.quantity}</td>
        <td>
          {infore.status.id === "63299201e09fd895642f3cab" ? ("-") : (
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