import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Input,
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
    $code: String
    $nameTH: String
    $nameEN: String
  ) {
    updateBeeftype(id: $id, code: $code, nameTH: $nameTH, nameEN: $nameEN) {
      id
      code
      nameTH
      nameEN
    }
  }
`;

const Index = ({ List }) => {
  const router = useRouter();
  // console.log(router.query.trackingId);
  const [prod, setProd] = useState(List);
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
        <td>
          {" "}
          {edit ? (
            <Input name="code" value={prod.code} onChange={handleChange} />
          ) : (
            prod.code
          )}
          {errorAlert && (
            <p style={{ color: "red", margin: "0 0" }}>
              {error.graphQLErrors[0].message}
            </p>
          )}
        </td>
        <td>
          {" "}
          {edit ? (
            <Input
              name="nameTH"
              value={prod.nameTH}
              onChange={handleChange}
              style={{ width: "170px" }}
            />
          ) : (
            prod.nameTH
          )}
        </td>
        <td>
          {" "}
          {edit ? (
            <Input
              name="nameEN"
              value={prod.nameEN}
              onChange={handleChange}
              style={{ width: "170px" }}
            />
          ) : (
            prod.nameEN
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
