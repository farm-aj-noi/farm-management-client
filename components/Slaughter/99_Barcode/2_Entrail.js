import React, { useRef } from "react";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
import { Barcodebuttoncolor } from "../../../utils/buttonColor";
import { Barcodebutton } from "../../../utils/button";
import CssBarcode from "./barcode.module.css";
import QRCode from 'qrcode.react'

class Mydoc extends React.Component {
  render() {
    const barcode = this.props.barcode
    return (
      <div>
        <Barcode value={barcode} />
        <br/>
        <QRCode value={"http://localhost:3000/slaughter/tracking/"+barcode} />
      </div>
    );
  }
}

// Create Document Component
const MyDocument = ({ barcode, autoprint }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    pageStyle: () => CssBarcode,
    content: () => componentRef.current,
  });
  return (
    <>
      <div style={{ display: "none" }}>
        <Mydoc ref={componentRef} barcode={barcode} />
      </div>
      {autoprint && barcode ? (
        handlePrint()
      ) : barcode ? (
        <Barcodebuttoncolor  onClick={handlePrint}>
          <Barcodebutton />
        </Barcodebuttoncolor>
      ) : null}
    </>
  );
};

export default MyDocument;
