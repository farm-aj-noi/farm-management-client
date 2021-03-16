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

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { Wightinput } from "./GetinFrom";
// import LoadingPage from "../../../helps/LoadingPage";

import { QUERY_LISTST } from "../03_Listslaughter/index";

const UPDATE_WEIGHT = gql`
  mutation UPDATE_WEIGHT($id: ID!, $weight: Float, $price: Float) {
    updateImslaughter(id: $id, weight: $weight, price: $price) {
      id
      weight
      price
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [firstsave, setFirstsave] = useState(false);
  // console.log(edit);
  const [imslaughterData, setImslaughterData] = useState(imslaughter);
  // console.log(imslaughterData);

  const [updateImslaughter, { loading, error }] = useMutation(UPDATE_WEIGHT, {
    onCompleted: (data) => {
      // console.log(data.updateImslaughter)
      setImslaughterData({
        ...imslaughterData,
        weight: data.updateImslaughter.weight,
        price: data.updateImslaughter.price,
      });
      setEdit(false);
    },
    refetchQueries: {
      query: QUERY_LISTST,
    },
  });

  const handleChange = (e) => {
    // const pricecal = imslaughterData.weight * 150;
    setImslaughterData({
      ...imslaughterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (imslaughterData === imslaughter) {
      setImslaughterData(imslaughter);
      setEdit(false);
      return;
    } else {
      await updateImslaughter({
        variables: {
          ...imslaughterData,
          weight: +imslaughterData.weight,
          price: +imslaughterData.weight * 150,
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
      <td>
        {!imslaughterData.price && !edit ? (
          <Wightinput
            type="number"
            name="weight"
            value={imslaughterData.weight}
            onChange={handleChange}
          />
        ) : imslaughterData.price && !edit ? (
          imslaughterData.weight
        ) : (
          <Wightinput
            type="number"
            name="weight"
            value={imslaughterData.weight}
            onChange={handleChange}
          />
        )}
      </td>

      {imslaughterData.price ? (
        <td>
          {imslaughterData.price.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </td>
      ) : (
        <td>ยังไม่ได้กรอกน้ำหนัก</td>
      )}

      {/* <td>{imslaughterData.statusIm.nameTH}</td> */}
      <td>
        {imslaughterData.price ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !imslaughterData.price && !edit ? (
          <Savebuttoncolor onClick={handleSubmit}>
            <Savebutton />
          </Savebuttoncolor>
        ) : imslaughterData.price && !edit ? (
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
