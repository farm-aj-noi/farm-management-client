import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Gobutton,
  InputPrice,
} from "./ListcuttwoFrom";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const UPDATE_BEEFTYPE = gql`
  mutation UPDATE_BEEFTYPE(
    $id: ID!
    $BBE: Int
  ) {
    updateBeeftype(
      id: $id
      BBE: $BBE
    ) {
      id
      code
      nameTH
      nameEN
      BBE
    }
  }
`;

const Index = ({ List }) => {
  const router = useRouter();
  // console.log(router.query.trackingId);
  const [prod, setProd] = useState(List);
  // console.log(prod);
  const [edit, setEdit] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const [updateBeeftype, { loading, error }] = useMutation(UPDATE_BEEFTYPE, {
    onCompleted: (data) => {
      // console.log(data)
      setProd(data.updateBeeftype);
      setEdit(false);
    },
  });

  const handleChange = (e) =>
    setProd({ ...prod, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (prod === List) {
      setProd(List);
      setEdit(false);
      return;
    }

    try {
      await updateBeeftype({
        variables: {
          ...prod,
          BBE: +prod.BBE
        },
      });
    } catch (error) {
      setErrorAlert(true);
      // console.log(error);
    }
  };

  useEffect(() => {
    setErrorAlert(false);
  }, [prod.code]);

  return (
    <>
      <tr key={prod.id} style={{ textAlign: "center" }}>
        <td>{prod.code}</td>
        <td>{prod.nameTH}</td>
        <td>{prod.nameEN}</td>
        <td>
          {" "}
          {edit ? (
            <InputPrice
              name="BBE"
              type="Number"
              value={prod.BBE}
              onChange={handleChange}
            />
          ) : (
            prod.BBE
          )}
        </td>

        <td>
          {edit ? (
            <Savebuttoncolor onClick={handleSubmit}>
              <Savebutton />
            </Savebuttoncolor>
          ) : (
            <Editbuttoncolor onClick={() => setEdit(true)}>
              <Editbutton />
            </Editbuttoncolor>
          )}
        </td>
      </tr>
    </>
  );
};

export default Index;
