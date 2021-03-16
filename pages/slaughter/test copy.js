import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
// import MyDoc1 from "../../components/Slaughter/99_Barcode/1_Halve";
import Testcss from "./test.module.css";

// import SerialPort from "serialport";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "db_adman_xregular",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

class Mydoc extends React.Component {
  render() {
    return (
      <>
        <Barcode value="http://github.com/kciter" />
      </>
    );
  }
}

// Create Document Component
const MyDocument = () => {
  const [data, setdata] = useState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    pageStyle: () => Testcss,
    content: () => componentRef.current,
  });

  // const port = new SerialPort('COM3')


  const generatePDF = () => {
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "This is the first title.");
    <Barcode value="http://github.com/kciter" />;
    doc.text(20, 60, "This is the second title.");

    doc.text(20, 100, "This is the thiRd title.");

    doc.text(10, 10, "This is a test");
    doc.autoPrint({ variant: "non-conform" });
    doc.save("autoprint.pdf");
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <Mydoc ref={componentRef} />
      </div>
      {/* {port} */}
      <button onClick={handlePrint}>Print this out!</button>
      <button onClick={generatePDF}>Print 2!</button>
      {/* <MyDoc /> */}
    </>
  );
};

export default MyDocument;
