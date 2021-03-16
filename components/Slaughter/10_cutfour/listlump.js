import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";
import Barcodebutton from "../99_Barcode/4_Lump";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { QUERY_LUMP } from "./index";

// import LoadingPage from "../../../helps/LoadingPage";

const DELETE_LUMP = gql`
  mutation DELETE_LUMP($id: ID!) {
    deleteLump(id: $id) {
      id
      weight
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(edit);
  const [lumpData, sethalveData] = useState(imslaughter);
  //  console.log(halveData.id);
  //  console.log(halveData.statusCa)
  const [deleteQuarter] = useMutation(DELETE_LUMP, {
    onCompleted: (data) => {
      // console.log(data.deleteLump)
      window.globleweight = window.globleweight - data.deleteLump.weight;
    },
    refetchQueries: [
      {
        query: QUERY_LUMP,
        variables: {
          quarter: lumpData.quarter.id,
        },
      },
    ],
  });

  const handleSubmitDeletequarter = async () => {
    setLoading(true);
    // console.log(halveData)
    await deleteQuarter({
      variables: {
        id: lumpData.id,
      },
    });
    setLoading(false);
  };

  return (
    <tr key={lumpData.id} style={{ textAlign: "center" }}>
      <td>{lumpData.barcode}</td>
      <td>{lumpData.beeftype.code.toUpperCase()}</td>
      <td>{lumpData.beeftype.nameTH}</td>
      <td>{lumpData.imslaughter.grade}</td>
      <td>
        {lumpData.weight.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td>
        {lumpData.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div>
            <Removebuttoncolor onClick={handleSubmitDeletequarter}>
              <Removebutton />
            </Removebuttoncolor>{" "}
            <Barcodebutton barcode={lumpData.barcode} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
