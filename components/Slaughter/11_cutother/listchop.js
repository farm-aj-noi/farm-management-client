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
import Barcodebutton from "../99_Barcode/5_Chop";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { QUERY_CHOP } from "./index";

// import LoadingPage from "../../../helps/LoadingPage";

const DELETE_CHOP = gql`
  mutation DELETE_CHOP($id: ID!) {
    deleteChop(id: $id) {
      id
      weight
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(this.props.key);
  const [chopData, sethalveData] = useState(imslaughter);
  const [id, setId] = useState(chopData.id);
  // console.log(chopData.id);
  //  console.log(halveData.statusCa)
  const [deleteQuarter] = useMutation(DELETE_CHOP, {
    onCompleted: (data) => {
      // console.log(data.deleteChop.id+"------"+chopData.id)
      window.globleweightother = window.globleweightother - data.deleteChop.weight;
    },
    refetchQueries: [
      {
        query: QUERY_CHOP,
        variables: {
          lump: chopData.lump.id,
        },
      },
    ],
  });

  const handleSubmitDeletequarter = async () => {
    setLoading(true);
    // console.log('------->'+chopData.id+"-----"+id)
    await deleteQuarter({
      variables: {
        id: id,
      },
    });
    setLoading(false);
  };

  return (
    <tr accessKey={chopData.id} style={{ textAlign: "center" }}>
      <td>{chopData.barcode}</td>
      <td>{chopData.beeftype.code.toUpperCase()}</td>
      <td>{chopData.beeftype.nameTH}</td>
      <td>{chopData.imslaughter.grade}</td>
      <td>{chopData.weight.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</td>
      <td>
        {chopData.price.toLocaleString(undefined, {
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
            </Removebuttoncolor>
            {' '}
            <Barcodebutton key={chopData.id} barcode={chopData.barcode} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
