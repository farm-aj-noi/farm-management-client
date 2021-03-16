import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { Form, Row, Col, Tab, Nav } from "react-bootstrap";
import { ic_notifications_active } from "react-icons-kit/md/ic_notifications_active";
import { ic_create } from "react-icons-kit/md/ic_create";
import { Button } from "react-bootstrap";

// import DatePicker from "react-datepicker";

import Pickadate from "pickadate/builds/react-dom";
import TH from "pickadate/builds/translations/th_TH";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Wightinput,
} from "./ListcuttwoFrom";
// import Footer from "../../Footer/index";

import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";
import ListImport from "./listImport";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Index = () => {
  const router = useRouter();
  // console.log(router)
  const [edit, setEdit] = useState(false);
  const [datatest, setDatatest] = useState(false);

  // calendar
  const [inputnumkun, setInputnumkun] = useState("");

  // console.log(data);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.push('/slaughter/trace/[trackingId]', `/slaughter/trace/${inputnumkun}`)
    }
  };

  return (
    <>
      <DivBase>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ติดตามสินค้า{" "}
            {/* {router.pathname.substring(router.pathname.lastIndexOf("/") + 1)} */}
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            <div className="mb-3" style={{ margin: "auto" }}>
              กรุณากรอกเลขใบแจ้งขุน : {}
              <Searchinput
                onChange={(event) => setInputnumkun(event.target.value)}
                style={{
                  marginRight: 10,
                }}
                autoFocus
                onFocus={e => e.currentTarget.select()}
                onKeyDown={handleKeyDown}
              />
              <Link href="trace/[trackingId]" as={`trace/${inputnumkun}`}>
                <Gobutton>ค้นหา</Gobutton>
              </Link>
            </div>
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
