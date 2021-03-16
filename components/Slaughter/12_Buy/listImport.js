import React, { useState } from "react";
import Router from 'next/router'
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { Wightinput } from "./ListcuttwoFrom";
import { QUERY_CARD } from "../../../pages/slaughter/buy";
// import LoadingPage from "../../../helps/LoadingPage";

const UPDATE_FEES = gql`
  mutation UPDATE_FEES($id: ID!, $fees: Float!) {
    updateFees(id: $id, fees: $fees) {
      id
      numcow
      numkun
      pun
      numfarmer
      namefarmer
      weight
      price
      importDate
      importslaughterDate
      statusIm {
        code
        nameTH
      }
      fees
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [fees, setFees] = useState("");
  const [loading, setLoading] = useState(false);
  const [imslaughterData, setImslaughterData] = useState(imslaughter);

  // console.log(fees);
  // console.log(imslaughterData);
  // console.log(imslaughterData.fees);

  const [updateFees] = useMutation(UPDATE_FEES, {
    onCompleted: (data) => {
      // console.log(data.updateFees);
      setImslaughterData({
        ...imslaughterData,
        fees: data.updateFees.fees,
      });
      setEdit(false);
      setLoading(false);
      // Router.reload(window.location.pathname);
    },
    refetchQueries: {
      query: QUERY_CARD,
    },
  });

  const handleSubmit = async () => {
    if (imslaughterData.fees === +fees) {
      // console.log(1)
      setImslaughterData(imslaughter);
      setEdit(false);
    } else {
      // console.log(imslaughterData.id);
      setLoading(true);
      await updateFees({
        variables: {
          id: imslaughterData.id,
          fees: +fees,
        },
      });
    }
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <td>{imslaughterData.numkun}</td>
      <td>{imslaughterData.numcow}</td>
      <td>{imslaughterData.pun}</td>
      <td>{imslaughterData.numfarmer}</td>
      <td>{imslaughterData.namefarmer}</td>
      <td>{imslaughterData.weight}</td>
      <td>
        {imslaughterData.fees === null && !edit ? (
          <Wightinput
            type="number"
            // value={imslaughterData.fees}
            onChange={(event) => setFees(event.target.value)}
          />
        ) : imslaughterData.fees > -1 && !edit ? (
          imslaughterData.fees
        ) : (
          <Wightinput
            type="number"
            value={fees}
            onChange={(event) => setFees(event.target.value)}
          />
        )}
      </td>

      {/* <td>{imslaughterData.statusIm.nameTH}</td> */}
      <td>
        {imslaughterData.fees || imslaughterData.fees === 0 ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : imslaughterData.fees === null && !edit ? (
          <Savebuttoncolor onClick={handleSubmit}>
            <Savebutton />
          </Savebuttoncolor>
        ) : (imslaughterData.fees || imslaughterData.fees > -1) && !edit ? (
          <Editbuttoncolor onClick={() => setEdit(true)}>
            <Editbutton />
          </Editbuttoncolor>
        ) : (
          <div>
            <Savebuttoncolor onClick={handleSubmit}>
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
