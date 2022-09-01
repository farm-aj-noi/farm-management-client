import React, { useRef, useState } from "react";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
import { Barcodebuttoncolor } from "../../../../utils/buttonColor";
import { Barcodebutton } from "../../../../utils/button";
import CssBarcode from "./barcode.module.css";
import QRCode from "qrcode.react";
import dayjs from "dayjs";

import Logo from "../../../../images/slaughter/slip/logo.png";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

class Mydoc extends React.Component {
    render() {
        const prod = this.props.prod;
        return (
            <div
                style={{
                    width: "8.9cm",
                    height: "8.8cm",
                    // border: "1px solid black",
                    display: "inline-grid",
                    gridTemplateColumns: "1fr",
                }}
            >
                <div
                    style={{
                        display: "inline-grid",
                        gridTemplateColumns: "0.25fr 1fr",
                        padding: "5px",
                        borderBottom: "1px dashed black",
                    }}
                >
                    <img
                        src={Logo}
                        width={95}
                        height={95}
                        style={{ display: "inline", marginRight: "auto" }}
                    />
                    <div
                        style={{
                            display: "inline-grid",
                            gridTemplateColumns: "1fr",
                            height: 95,
                        }}
                    >
                        <label
                            style={{
                                marginBottom: "-20px",
                                textAlign: "center",
                                width: "100%",
                                color: "black",
                                fontWeight: "bolder",
                                fontSize: "20px",
                                marginTop: "-3px",
                            }}
                        >
                            FARM PROJECT
                        </label>
                        <label
                            style={{
                                marginBottom: 0,
                                textAlign: "center",
                                width: "100%",
                                backgroundColor: "black",
                                color: "white",
                                fontSize: "15px",
                                margin: "auto",
                            }}
                        >
                            Tel. 099-999999 099-999-9999
                        </label>
                        <label
                            style={{
                                marginBottom: "-5px",
                                textAlign: "left",
                                marginLeft: "5px",
                                marginTop: "1px",
                                width: "100%",
                                color: "black",
                                fontWeight: "bolder",
                                fontSize: "15px",
                            }}
                        >
                            {prod.producttype.code.toUpperCase()} {prod.producttype.nameTH}
                        </label>
                        <label
                            style={{
                                marginBottom: "-20px",
                                textAlign: "left",
                                marginLeft: "5px",
                                marginTop: "-2px",
                                width: "100%",
                                color: "black",
                                fontWeight: "bolder",
                                fontSize: "15px",
                            }}
                        >
                            {prod.producttype.nameEN}
                        </label>
                    </div>
                </div>
                <div
                    style={{
                        display: "inline-grid",
                        gridTemplateColumns: "0.20fr 1fr 0.20fr",
                        padding: "2px 5px",
                        fontWeight: "bolder",
                        color: "black",
                    }}
                >
                    <label style={{ marginBottom: 0 }}>Weight</label>
                    <label
                        style={{
                            marginBottom: 0,
                            textAlign: "center",
                            fontSize: "25px",
                            marginTop: "-6px",
                        }}
                    >
                        {prod.weight}
                    </label>
                    <label style={{ marginBottom: 0, textAlign: "right" }}>Kgs</label>
                </div>
                <div
                    style={{
                        display: "inline-grid",
                        gridTemplateColumns: "1fr",
                        // borderBottom: "1px dashed black",
                        marginTop: "-16px",
                        marginBottom: "-16px",
                        fontSize: "15px",
                        gridColumnGap: "3px",
                        fontWeight: "bolder",
                    }}
                >
                    <div
                        style={{
                            display: "inline-grid",
                            gridTemplateColumns: "1fr 1fr",
                            paddingLeft: "3px" ,
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    marginBottom: 0,
                                    textAlign: "center",
                                    width: "100%",
                                    backgroundColor: "black",
                                    color: "white",
                                    height: "25px"
                                }}
                            >
                                วันที่ผลิต / MFD
                            </label>
                            <label
                                style={{
                                    marginBottom: 0,
                                    textAlign: "center",
                                    width: "100%",
                                    backgroundColor: "black",
                                    color: "white",
                                    height: "25px"
                                }}
                            >
                                วันหมดอายุ / BBE
                            </label>
                        </div>
                        <div>
                            <label
                                style={{
                                    marginBottom: 0,
                                    textAlign: "center",
                                    width: "100%",
                                    color: "black",
                                    border: "1px solid black",
                                    height: "25px"
                                }}
                            >
                                {dayjs(prod.MFG)
                                    .add(543, "y")
                                    .locale("th")
                                    .format("DD/MM/YYYY")}
                            </label>
                            <label
                                style={{
                                    marginBottom: 0,
                                    textAlign: "center",
                                    width: "100%",
                                    color: "black",
                                    border: "1px solid black",
                                    height: "25px"
                                }}
                            >
                                {dayjs(prod.BBE)
                                    .add(543, "y")
                                    .locale("th")
                                    .format("DD/MM/YYYY")}
                            </label>
                        </div>

                    </div>
                </div>
                <div
                    style={{
                        display: "inline-grid",
                        /* padding: "5px 2px 0px 5px", */
                        margin: "auto",
                        color: "black",
                        gridTemplateColumns: "1fr 0.35fr",
                        gridColumnGap: "5px",
                        borderTop: "1px dashed black",
                        width: "100%",
                        fontWeight: "bolder",

                    }}
                >
                    <div
                        style={{
                            margin: "auto",
                            width: "100%",
                            textAlign: "center",
                            paddingTop: "2px",
                            marginLeft: "3px"
                        }}
                    >
                        <Barcode
                            value={prod.barcode}
                            height={70}
                            width={1.65} //1.6
                            margin={0}
                            fontSize={0}
                        />
                    </div>

                    <div style={{ margin: "auto" }}>
                        <QRCode
                            size={68}
                            value={"http://localhost:3000//beefwarehouse/beefproduct/tracking" + prod.barcode}
                            style={{ marginBottom: 0 }}
                        />
                    </div>
                    {/*  <label style={{ marginBottom: 0, textAlign: "left", height: 15 }}>
                        {prod.imslaughter.pun}
                    </label> 
                    <label style={{ marginBottom: 0, textAlign: "right", height: 15 }}>
                        {prod.barcode.slice(11)}
                    </label> */}
                </div>
                <div
                    style={{
                        display: "inline-grid",
                        margin: "auto",
                        color: "black",
                        gridTemplateColumns: "1fr  1fr",
                        width: "100%",
                        fontWeight: "bolder",
                        marginTop: "-5px",
                    }}
                >
                    <label style={{ marginBottom: 0, textAlign: "left", height: 15 }}>
                        {prod.barcode}
                    </label>
                    <label style={{ marginBottom: 0, textAlign: "right", height: 15 }}>
                        {prod.barcode.slice(11)}
                    </label>
                </div>
            </div>
        );
    }
}


const MyDocument = ({ allinfo }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        pageStyle: () => CssBarcode,
        content: () => componentRef.current,
    });
    const [infoprint, setInfoprint] = useState(allinfo)

    return (
        <>
            <div style={{ display: "none" }}>
                <Mydoc ref={componentRef} prod={infoprint} />
            </div>
            {/*  <p>{allinfo ? allinfo.length : "-"}</p> */}
            <Barcodebuttoncolor onClick={handlePrint}>
                <Barcodebutton />
            </Barcodebuttoncolor>
        </>
    )
}

export default MyDocument