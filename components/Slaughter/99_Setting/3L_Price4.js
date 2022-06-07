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
    $priceG2h: Float
    $priceG3: Float
    $priceG3h: Float
    $priceG4: Float
    $priceG4h: Float
    $priceG5: Float
  ) {
    updateBeeftype(
      id: $id
      priceG2h: $priceG2h
      priceG3: $priceG3
      priceG3h: $priceG3h
      priceG4: $priceG4
      priceG4h: $priceG4h
      priceG5: $priceG5
    ) {
      id
      code
      nameTH
      priceG2h
      priceG3
      priceG3h
      priceG4
      priceG4h
      priceG5
    }
  }
`;

const Index = ({ List }) => {
  const router = useRouter();
  // console.log(router.query.trackingId);
  const [prod, setProd] = useState(List);
  //console.log(prod);
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
          priceG2h: +prod.priceG2h,
          priceG3: +prod.priceG3,
          priceG3h: +prod.priceG3h,
          priceG4: +prod.priceG4,
          priceG4h: +prod.priceG4h,
          priceG5: +prod.priceG5,
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
        <td>
          {" "}
          {edit ? (
            <InputPrice
              name="priceG2h"
              value={prod.priceG2h}
              onChange={handleChange}
            />
          ) : (
            prod.priceG2h
          )}
        </td>
        <td>
          {" "}
          {edit ? (
            <InputPrice
              name="priceG3"
              value={prod.priceG3}
              onChange={handleChange}
            />
          ) : (
            prod.priceG3
          )}
        </td>
        <td>
          {" "}
          {edit ? (
            <InputPrice
              name="priceG3h"
              value={prod.priceG3h}
              onChange={handleChange}
            />
          ) : (
            prod.priceG3h
          )}
        </td>
        <td>
          {" "}
          {edit ? (
            <InputPrice
              name="priceG4"
              value={prod.priceG4}
              onChange={handleChange}
            />
          ) : (
            prod.priceG4
          )}
        </td>
        <td>
          {" "}
          {edit ? (
            <InputPrice
              name="priceG4h"
              value={prod.priceG4h}
              onChange={handleChange}
            />
          ) : (
            prod.priceG4h
          )}
        </td>
        <td>
          {" "}
          {edit ? (
            <InputPrice
              name="priceG5"
              value={prod.priceG5}
              onChange={handleChange}
            />
          ) : (
            prod.priceG5
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
