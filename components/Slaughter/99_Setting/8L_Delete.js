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

import { Spinner, Modal ,Button} from "react-bootstrap";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { now } from "moment";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { QUERY } from "./8_Delete";

const DELETE_BEEFTYPE = gql`
  mutation DELETE_BEEFTYPE($id: ID!) {
    deleteBeeftype(id: $id) {
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

  const [deleteBeeftype, { loading, error }] = useMutation(DELETE_BEEFTYPE, {
    onCompleted: (data) => {
      // console.log(data)
    },
    refetchQueries: [
      {
        query: QUERY,
      },
    ],
  });

  const handleSubmit = async () => {
    try {
      await handleClose;
      await deleteBeeftype({
        variables: {
          ...prod,
        },
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr key={prod.id} style={{ textAlign: "center" }}>
        <td>{prod.code}</td>
        <td>{prod.nameTH}</td>
        <td>{prod.nameEN}</td>

        <td>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Removebuttoncolor onClick={handleShow}>
              <Removebutton />
            </Removebuttoncolor>
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
          <Button variant="primary" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
