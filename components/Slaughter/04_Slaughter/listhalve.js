import React, { useState } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";
import Barcodebutton from "../99_Barcode/1_Halve";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { QUERY_CARD } from "../../../pages/slaughter/slaughter";
import { Wightinput } from "./SlaughterFrom";
// import LoadingPage from "../../../helps/LoadingPage";

const UPDATE_STATUSCA = gql`
  mutation UPDATE_STATUSCA($id: ID!) {
    updateImslaughterStatusCa(id: $id) {
      statusCa {
        id
        nameTH
        code
      }
    }
  }
`;

const UPDATE_HALVE = gql`
  mutation UPDATE_HALVE($id: ID!, $weightwarm: Float!) {
    updateHalve(id: $id, weightwarm: $weightwarm) {
      id
      weightwarm
      barcode
    }
  }
`;

const CREATE_HALVEL = gql`
  mutation CREATE_HALVEL($weightwarm: Float!, $imslaughter: String!) {
    createHalveL(weightwarm: $weightwarm, imslaughter: $imslaughter) {
      id
      weightwarm
      barcode
    }
  }
`;

const CREATE_HALVER = gql`
  mutation CREATE_HALVER($weightwarm: Float!, $imslaughter: String!) {
    createHalveR(weightwarm: $weightwarm, imslaughter: $imslaughter) {
      id
      weightwarm
      barcode
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(edit);
  const [halveData, sethalveData] = useState(imslaughter);
  //  console.log(halveData.id);
  //  console.log(halveData.statusCa)
  const left = halveData.halves.find(
    (prod) => prod.beeftype.id.toString() === "5f1000e28d55662dcc23d95e"
  );
  const right = halveData.halves.find(
    (prod) => prod.beeftype.id.toString() === "5f1000ee8d55662dcc23d960"
  );

  const [leftData, setLeftData] = useState({
    id: !!left ? left.id : "none",
    weightwarm: !!left ? left.weightwarm : 0,
    barcode: !!left ? left.barcode : null,
  });
  const [rightData, setRightData] = useState({
    id: !!right ? right.id : "none",
    weightwarm: !!right ? right.weightwarm : 0,
    barcode: !!right ? right.barcode : null,
  });
  // console.log(left);
  // console.log(leftData);

  const [updateStatusCa, { error }] = useMutation(UPDATE_STATUSCA, {
    onCompleted: (data) => {
      // console.log(data.updateImslaughterStatusCa.statusCa)
      // console.log(halveData.statusCa)
      sethalveData({
        ...halveData,
        statusCa: data.updateImslaughterStatusCa.statusCa,
      });
      setEdit(false);
    },
    refetchQueries: [
      {
        query: QUERY_CARD,
      },
    ],
  });

  const [createHalveL] = useMutation(CREATE_HALVEL, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      setLeftData({
        id: data.createHalveL.id,
        weightwarm: data.createHalveL.weightwarm,
        barcode: data.createHalveL.barcode,
      });
      setEdit(false);
    },
  });

  const [createHalveR] = useMutation(CREATE_HALVER, {
    onCompleted: (data) => {
      // console.log(data.createHalveR)
      setRightData({
        id: data.createHalveR.id,
        weightwarm: data.createHalveR.weightwarm,
        barcode: data.createHalveR.barcode,
      });
      setEdit(false);
    },
  });

  const [updateHalveL] = useMutation(UPDATE_HALVE, {
    onCompleted: async (data) => {
      // console.log(data.createHalveL)
      await setLeftData({
        id: data.updateHalve.id,
        weightwarm: data.updateHalve.weightwarm,
        barcode: data.updateHalve.barcode,
      });
      setEdit(false);
    },
  });

  const [updateHalveR] = useMutation(UPDATE_HALVE, {
    onCompleted: async (data) => {
      // console.log(data.createHalveR)
      await setRightData({
        id: data.updateHalve.id,
        weightwarm: data.updateHalve.weightwarm,
        barcode: data.updateHalve.barcode,
      });
      setEdit(false);
    },
  });

  //autoprint
  const [autoprint, setAutoprint] = useState();
  const [barcodeLautoprint, setBarcodeLAutoprint] = useState();
  const [barcodeRautoprint, setBarcodeRAutoprint] = useState();
  const autoPrintRun = async (e, n) => {
    // console.log(e + " ----- " + n);
    setBarcodeLAutoprint(e);
    setBarcodeRAutoprint(n);
    setAutoprint(true);
    setBarcodeLAutoprint(null);
    setBarcodeRAutoprint(null);
    setAutoprint(false);
  };

  const handleSubmitFirst = async () => {
    setLoading(true);
    await createHalveL({
      variables: {
        weightwarm: leftData.weightwarm,
        imslaughter: halveData.id,
      },
    });
    await createHalveR({
      variables: {
        weightwarm: rightData.weightwarm,
        imslaughter: halveData.id,
      },
    });
    await updateStatusCa({
      variables: {
        id: halveData.id,
      },
    });
    // Router.reload(window.location.pathname);
    // console.log(leftData.barcode + " ----- " + rightData.barcode);
    autoPrintRun(leftData.barcode, rightData.barcode);
    setEdit(false);
    setLoading(false);
  };

  const handleSubmitUpdate = async () => {
    setLoading(true);
    await updateHalveL({
      variables: {
        weightwarm: leftData.weightwarm,
        id: leftData.id,
      },
    });
    await updateHalveR({
      variables: {
        weightwarm: rightData.weightwarm,
        id: rightData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <Barcodebutton
        autoprint={autoprint}
        barcodeL={barcodeLautoprint}
        barcodeR={barcodeRautoprint}
      />
      <td>{halveData.numkun}</td>
      <td>{halveData.numcow}</td>
      <td>{halveData.pun}</td>
      <td>{halveData.numfarmer}</td>
      <td>{halveData.weight}</td>
      <td>
        {leftData.id === "none" && !edit ? (
          <Wightinput
            type="number"
            name="weightwarm"
            onChange={(event) =>
              setLeftData({
                ...leftData,
                [event.target.name]: +event.target.value,
              })
            }
          />
        ) : leftData.id !== "none" && !edit ? (
          leftData.weightwarm.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        ) : (
          <Wightinput
            type="number"
            name="weightwarm"
            value={leftData.weightwarm}
            onChange={(event) =>
              setLeftData({
                ...leftData,
                [event.target.name]: +event.target.value,
              })
            }
          />
        )}
      </td>

      <td>
        {rightData.id === "none" && !edit ? (
          <Wightinput
            type="number"
            name="weightwarm"
            onChange={(event) =>
              setRightData({
                ...rightData,
                [event.target.name]: +event.target.value,
              })
            }
          />
        ) : rightData.id !== "none" && !edit ? (
          rightData.weightwarm.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        ) : (
          <Wightinput
            type="number"
            name="weightwarm"
            value={rightData.weightwarm}
            onChange={(event) =>
              setRightData({
                ...rightData,
                [event.target.name]: +event.target.value,
              })
            }
          />
        )}
      </td>

      {/* <td>{halveData.statusIm.nameTH}</td> */}
      <td>
        {halveData.statusCa.id === "5f0fdb8b02b40c2ab8506567" ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : halveData.statusCa.id !== "5f0fdb8b02b40c2ab8506567" && !edit ? (
          <Savebuttoncolor
            style={{
              backgroundColor: `${
                !leftData.weightwarm ||
                !rightData.weightwarm ||
                halveData.weight < rightData.weightwarm + leftData.weightwarm
                  ? "gray"
                  : ""
              }`,
            }}
            onClick={handleSubmitFirst}
            disabled={
              !leftData.weightwarm ||
              !rightData.weightwarm ||
              halveData.weight < rightData.weightwarm + leftData.weightwarm
            }
          >
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.statusCa.id === "5f0fdb8b02b40c2ab8506567" && !edit ? (
          <div>
            <Editbuttoncolor onClick={() => setEdit(true)}>
              <Editbutton />
            </Editbuttoncolor>{" "}
            <Barcodebutton
              barcodeL={leftData.barcode}
              barcodeR={rightData.barcode}
            />
          </div>
        ) : (
          <div>
            <Savebuttoncolor
              style={{
                backgroundColor: `${
                  !leftData.weightwarm ||
                  !rightData.weightwarm ||
                  halveData.weight < rightData.weightwarm + leftData.weightwarm
                    ? "gray"
                    : ""
                }`,
              }}
              onClick={handleSubmitUpdate}
              disabled={
                !leftData.weightwarm ||
                !rightData.weightwarm ||
                halveData.weight < rightData.weightwarm + leftData.weightwarm
              }
            >
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
