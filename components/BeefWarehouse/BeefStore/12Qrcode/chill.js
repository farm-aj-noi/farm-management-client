import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../utils/button";
import { Modal, Button } from "react-bootstrap";
import QRCode from "qrcode.react";
import Link from "next/link";

const index = ({ listchill }) => {
  const [infodata, setinfodata] = useState(listchill);
  console.log(infodata);
  const [testshow, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Barcodebuttoncolor onClick={handleShow}>
        <Qrcodebutton />
      </Barcodebuttoncolor>
      <Modal
        show={testshow}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Qrcode </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <QRCode
              size={100}
              value={
                "http://localhost:3000/slaughter/tracking/" +
                infodata.halve.barcode
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <Link
              href={
                "http://localhost:3000/slaughter/tracking/" +
                infodata.halve.barcode
              }
            >
              <p
                style={{
                  fontSize: "10px",
                  backgroundColor: "#f3f3f3",
                  padding: "5px",
                  color: "#3775e9",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                http://localhost:3000/slaughter/tracking/{infodata.halve.barcode}
              </p>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default index;
