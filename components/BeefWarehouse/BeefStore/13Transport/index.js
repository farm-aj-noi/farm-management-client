import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { list } from "react-icons-kit/fa/list";
/* import ListHalve from "./listhalve"; */
import {
    DivFrom,
    DivFromTop,
    DivFromDown,
    Searchinput,
    HeaderColor,
    Gobutton,
    Gobutton1
} from "./SlaughterFrom";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

import Datestyle from "../helps/datepicker.module.css"

import { fileText } from 'react-icons-kit/icomoon/fileText'

import { ic_assignment_turned_in } from 'react-icons-kit/md/ic_assignment_turned_in'




import { Spinner } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { DivBase } from "../../../../utils/divBase";

export const QUERY = gql`
  query QUERY($barcode: String) {
    Tracking(barcode: $barcode) {
      barcode
      beeftype
      grade
      weight
      price
      MFG
      BBE
      farmer
      numcow
      numkun
      pun
      age
      weightcow
      transports {
        id
        date
        name
        place
        note
      }
    }
  }
`;

const CREATE = gql`
  mutation CREATE(
    $date: String!
    $name: String!
    $place: String!
    $barcode: String!
    $note: String!
  ) {
    createTransport(
      date: $date
      name: $name
      place: $place
      barcode: $barcode
      note: $note
    ) {
      date
      name
      place
      note
    }
  }
`;

const Index = () => {
    //calendar
    const dateRef = useRef();
    const [date, setDate] = useState(new Date());
    const [selectedDate, handleDateChange] = useState(
        dayjs(date).format("YYYY-MM-DD")
    );
    // console.log(selectedDate);
    const months = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
    ];

    const dateValueRef = useRef(date);
    dateValueRef.current = date;

    const changeDateToBuddhist = (changeDate = new Date()) => {
        const prevDate = new Date(changeDate);
        // console.log("current date", prevDate === date);
        const newDate = new Date(
            prevDate.setFullYear(prevDate.getFullYear() + 543)
        );
        // console.log("year", newDate.getFullYear());
        dateRef.current.input.value = `${newDate.getDate()} ${months[newDate.getMonth()]
            } ${newDate.getFullYear()}`;
    };

    // component did mount
    useEffect(() => {
        // console.log("dateRef", dateRef);
        // change date value in input dom on mounted
        changeDateToBuddhist(date);
        const datePicker = dateRef.current;
        const renderDateInput = datePicker.renderDateInput;
        // console.log(renderDateInput);
        datePicker.renderDateInput = function () {
            const inputDom = renderDateInput();
            return React.cloneElement(inputDom, {
                value: changeDateToBuddhist(dateValueRef.current),
            });
        };
    }, []);

    const onChangeDatePicker = (e) => {
        // console.log("onChange");
        setDate(e);
        handleDateChange(dayjs(e).format("YYYY-MM-DD"));
    };
    //calendar
    const [numkun, setNumkun] = useState("");
    const [barcode, setBarcode] = useState("");
    const [imslaughter, setImslaughter] = useState("");
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [prod, setProd] = useState({
        name: "",
        place: "",
        note: "",
    });

    // console.log(prod);

    // const event1 = new Date("July 1, 1999");

    const { data, loading } = useQuery(QUERY, {
        variables: {
            barcode: barcode,
        },
    });

    // console.log(data);

    const [createTransport, error] = useMutation(CREATE, {
        onCompleted: (data) => {
            setSuccess(true),
                setTimeout(function () {
                    setSuccess(false);
                }, 3000);
        },
        refetchQueries: [
            {
                query: QUERY,
                variables: {
                    barcode: barcode,
                },
            },
        ],
    });

    const handleChange = (e) =>
        setProd({ ...prod, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoadingCreate(true);
        try {
            await createTransport({
                variables: {
                    ...prod,
                    date: selectedDate,
                    barcode: barcode,
                },
            });
            setLoadingCreate(false);
        } catch (error) {
            setErrorAlert(true);
            setLoadingCreate(false);
            // console.log(error);
        }
    };

    return (
        <>
            <div style={{ marginTop: "100px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "30px",
                    }}
                >
                    <HeaderColor
                        style={{
                            width: "fit-content",
                            height: "fit-content",
                            padding: "5px 30px",
                        }}
                    >
                        บันทึกการขนส่ง
                    </HeaderColor>
                </div>
                <DivBase>
                    <DivFrom style={{ marginBottom: "15px" }}>
                        <DivFromTop>
                            <div style={{ margin: "-3px 5px 0px 0px" }}>
                                <Icon size={20} icon={fileText} />
                            </div>
                            ข้อมูลโค
                        </DivFromTop>
                        <DivFromDown
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gridRowGap: "5px",
                                paddingBottom: "10px",
                            }}
                        >
                            {/* ใส่ card */}
                            <div style={{ margin: "auto" }}>
                                <div style={{ margin: "auto", width: "100%" }}>
                                    กรุณากรอกบาร์โค๊ด : { }
                                    <Searchinput
                                        value={barcode}
                                        onChange={(event) => setBarcode(event.target.value)}
                                        style={{
                                            // marginRight: 10,
                                            width: "250px",
                                        }}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    margin: "auto",
                                    minWidth: "100%",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                                    gridRowGap: "15px",
                                    paddingTop: "15px",
                                }}
                            >
                                <div>
                                    ใบแจ้งขุน :{" "}
                                    {data && data.Tracking.numkun !== null
                                        ? data.Tracking.numkun
                                        : "-"}
                                </div>
                                <div>
                                    เบอร์โค :{" "}
                                    {data && data.Tracking.numcow !== null
                                        ? data.Tracking.numcow
                                        : "-"}
                                </div>
                                <div>
                                    ชื่อเนื้อ :{" "}
                                    {data && data.Tracking.beeftype !== null
                                        ? data.Tracking.beeftype
                                        : "-"}
                                </div>

                                <div>
                                    เกรด :{" "}
                                    {data && data.Tracking.grade !== null
                                        ? data.Tracking.grade
                                        : "-"}
                                </div>
                                <div>
                                    ราคา :{" "}
                                    {data && data.Tracking.price !== null
                                        ? data.Tracking.price
                                        : "-"}
                                </div>
                                <div></div>
                            </div>
                        </DivFromDown>
                    </DivFrom>

                    <DivFrom style={{ marginBottom: "15px" }}>
                        <DivFromTop>
                            <div style={{ margin: "-3px 5px 0px 0px" }}>
                                <Icon size={20} icon={ic_assignment_turned_in} />
                            </div>
                            บันทึกการขนส่ง
                        </DivFromTop>
                        <DivFromDown
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gridRowGap: "5px",
                                paddingBottom: "15px",
                            }}
                        >
                            {/* ใส่ card */}
                            <div
                                className="mb-3"
                                style={{
                                    margin: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <div>
                                    วันที่ : { }
                                    <DatePicker
                                        className={Datestyle.datepicker}
                                        selected={date}
                                        onChange={onChangeDatePicker}
                                        dateFormat="dd/mm/yyyy"
                                        ref={dateRef}
                                        locale="th"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        disabled
                                    />{" "}
                                </div>
                                <div>
                                    ผู้ส่ง/รับ : { }
                                    <Searchinput
                                        name="name"
                                        onChange={handleChange}
                                        disabled={!barcode}
                                        style={{
                                            width: "156px", textAlign: "center",
                                            backgroundColor: `${!barcode ? "#ececec" : ""
                                                }`,
                                        }}
                                    />
                                </div>
                                <div>
                                    สถานที่ : { }
                                    <Searchinput
                                        name="place"
                                        onChange={handleChange}
                                        disabled={!barcode}
                                        style={{
                                            width: "156px", textAlign: "center",
                                            backgroundColor: `${!barcode ? "#ececec" : ""
                                                }`,
                                        }}
                                    />
                                </div>
                                <div>
                                    หมายเหตุ : { }
                                    <select
                                        name="note"
                                        onChange={handleChange}
                                        disabled={!barcode}
                                        style={{
                                            display: "inline",
                                            width: "156px",
                                            padding: "0.375rem 0.75rem",
                                            fontSize: "1rem",
                                            fontWeight: "400",
                                            lineHeight: "1.5",
                                            color: "#495057",
                                            backgroundColor: "#fff",
                                            backgroundClip: "padding-box",
                                            border: "1px solid #ced4da",
                                            /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                                            borderRadius: "0.25rem",
                                            textAlign: "center",
                                            transition:
                                                "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",

                                        }}
                                    >
                                        <option value="-">เลือก</option>
                                        <option value="ส่งสินค้า">ส่งสินค้า</option>
                                        <option value="รับสินค้า">รับสินค้า</option>
                                    </select>
                                </div>
                            </div>

                            {loadingCreate ? (
                                <Spinner
                                    style={{ margin: "0px 12px 0px auto", float: "right" }}
                                    animation="border"
                                    variant="primary"
                                />
                            ) : (
                                <Gobutton
                                    disabled={
                                        !prod.name || !prod.place || !barcode
                                    }
                                    style={{
                                        backgroundColor: `${!prod.name || !prod.place || !barcode
                                            ? "gray"
                                            : ""
                                            }`,
                                        margin: "5px 29px 0px auto",
                                        float: "right",
                                    }}
                                    onClick={handleSubmit}
                                >
                                    บันทึก
                                </Gobutton>
                            )}
                            {success && (
                                <p
                                    style={{
                                        color: "green",
                                        position: "absolute",
                                        display: "flex",
                                        margin: "145px 0px 0px 81%",
                                    }}
                                >
                                    บันทึกสำเร็จ
                                </p>
                            )}
                        </DivFromDown>
                    </DivFrom>

                    <DivFrom>
                        <DivFromTop>
                            <div style={{ margin: "-3px 5px 0px 0px" }}>
                                <Icon size={20} icon={list} />
                            </div>
                            รายการขนส่ง
                        </DivFromTop>
                        <DivFromDown
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gridRowGap: "5px",
                            }}
                        >
                            <div style={{ height: "200px", overflowY: "auto" }}>
                                <Table
                                    striped
                                    bordered
                                    responsive
                                    hover
                                    style={{ margin: "auto" }}
                                >

                                    <thead>
                                        <tr style={{ textAlign: "center", fontSize: "18px" }}>
                                            <th>วันที่่</th>
                                            <th>เวลา</th>
                                            <th>ผู้รับ/ส่ง</th>
                                            <th>สถานที่</th>
                                            <th>หมายเหตุ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.Tracking && data.Tracking.MFG !== null && (
                                            <tr style={{ textAlign: "center" }}>
                                                <td>
                                                    {data.Tracking.MFG
                                                        ? dayjs(data.Tracking.MFG)
                                                            .add(543, "y")
                                                            .locale("th")
                                                            .format("DD MMMM YYYY")
                                                        : "ไม่ระบุ"}
                                                </td>
                                                <td>
                                                    {data.Tracking.MFG
                                                        ? dayjs(data.Tracking.MFG)
                                                            .add(543, "y")
                                                            .locale("th")
                                                            .format("HH : mm น.")
                                                        : "ไม่ระบุ"}
                                                </td>
                                                <td>-</td>
                                                <td>สหกรณ์</td>
                                                <td>-</td>
                                            </tr>
                                        )}

                                        {data &&
                                            data.Tracking &&
                                            data.Tracking.transports !== null ? (
                                            data.Tracking.transports.map((prod) => (
                                                <tr key={prod.id} style={{ textAlign: "center" }}>
                                                    <td>
                                                        {prod.date
                                                            ? dayjs(prod.date)
                                                                .add(543, "y")
                                                                .locale("th")
                                                                .format("DD MMMM YYYY")
                                                            : "ไม่ระบุ"}
                                                    </td>
                                                    <td>
                                                        {prod.date
                                                            ? dayjs(prod.date)
                                                                .add(543, "y")
                                                                .locale("th")
                                                                .format("HH : mm น.")
                                                            : "ไม่ระบุ"}
                                                    </td>
                                                    <td>{prod.name}</td>
                                                    <td>{prod.place}</td>
                                                    <td>{prod.note}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr style={{ textAlign: "center" }}>
                                                <td colSpan="5">ไม่พบข้อมูล</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                {data && data.Tracking.numkun !== null
                                    ?
                                    <a href={
                                        "http://localhost:3000/slaughter/trace/" + data.Tracking.numkun
                                    }
                                        target="_blank"><Gobutton1>ติดตามข้อมูลสินค้า</Gobutton1></a>

                                    : ""}
                            </div>
                        </DivFromDown>
                    </DivFrom>
                </DivBase>
                {/* <Footer/> */}
            </div>
        </>
    );
};

export default Index;
