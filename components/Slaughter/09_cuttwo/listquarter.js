import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { Spinner, Modal ,Button} from "react-bootstrap";
import Barcodebutton from "../99_Barcode/3_Quarter";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { QUERYQUARTER } from "./index";

// import LoadingPage from "../../../helps/LoadingPage";

const DELETE_QUARTER = gql`
  mutation DELETE_QUARTER($id: ID!) {
    deleteQuarter(id: $id) {
      id
      weight
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(edit);
  const [quarterData, sethalveData] = useState(imslaughter);
  //  console.log(halveData.id);
  //  console.log(halveData.statusCa)
  const [deleteQuarter] = useMutation(DELETE_QUARTER, {
    onCompleted: (data) => {
      // console.log(data.deleteQuarter)
      window.globleweighthalve = window.globleweighthalve - data.deleteQuarter.weight;
    },
    refetchQueries: [
      {
        query: QUERYQUARTER,
        variables: {
          halve: quarterData.halve.id,
        },
      },
    ],
  });

  const handleSubmitDeletequarter = async () => {
    setLoading(true);
    // console.log(halveData)
    await handleClose;
    await deleteQuarter({
      variables: {
        id: quarterData.id,
      },
    });
    setLoading(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
    <tr key={quarterData.id} style={{ textAlign: "center" }}>
      <td>{quarterData.barcode}</td>
      <td>{quarterData.beeftype.code.toUpperCase()}</td>
      <td>{quarterData.beeftype.nameTH}</td>
      <td>{quarterData.imslaughter.grade}</td>
      <td>
        {quarterData.weight.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td>
        {/* {quarterData.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} */}
        {quarterData.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div>
            <Removebuttoncolor onClick={handleShow}>
              <Removebutton />
            </Removebuttoncolor>{" "}
            <Barcodebutton barcode={quarterData.barcode} />
          </div>
        )}
      </td>
    </tr>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>ยืนยันการลบ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        คุณต้องการลบข้อมูลหรือไม่?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ปิด
        </Button>
        <Button variant="primary" onClick={handleSubmitDeletequarter}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default Imslaughter;
