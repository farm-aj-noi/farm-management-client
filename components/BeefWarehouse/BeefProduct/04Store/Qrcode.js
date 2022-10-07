import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../utils/button";
import { Modal } from "react-bootstrap";
import QRcode from "qrcode.react";
import Router from "next/router";

const Qrcode = ({ alllist }) => {
  const [infodata, setinfodata] = useState(alllist);
  const [testshow, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    Router.reload("beefwarehouse/beefproduct/store");
  };
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
            <QRcode
              size={100}
              value={
                "https://farm-organization.herokuapp.com/beefwarehouse/beefproduct/tracking/" + infodata.barcode
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
            <a
              href={
                "http://localhost:3000/beefwarehouse/beefproduct/tracking/" + infodata.barcode
              }
              target="_blank"
              style={{
                fontSize: "16px",
                padding: "5px",
                color: "#3775e9",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              LinkURL คลิ๊ก
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Qrcode;
