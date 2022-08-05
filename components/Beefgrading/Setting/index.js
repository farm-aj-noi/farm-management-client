import React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import { print } from 'react-icons-kit/fa/print'
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import {image} from 'react-icons-kit/fa/image'
import { Icon5 } from "../../../utils/Logograde";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
} from "./SettingFrom";
import { list } from "react-icons-kit/fa/list";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor
} from "../Styleclass/Button";

const thstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "10px",
  fontSize: "18px",
};

const tdstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "5px",
  fontSize: "14px",
};


function Index() {
      
    return (
        <>
          <DivCenter style={{ fontSize: "36px", paddingTop: "30px" }}>
          <Icon5 height="70px" weight="70px" />
            การตั้งค่า
          </DivCenter>
          <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการตั้งค่า
        </DivFromTop>
        <DivFrom>
        <DivFromDown>
          <div style={{ margin: "auto", minWidth: "100%" }}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="1">
                        <Link href="/beef warehouse/beefproduct/setting/">
                          <div style={{ width: "100%" }}>
                            ตั้งค่าระบบ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/beefwarehouse/beefproduct/setting/date">
                          <div style={{ width: "100%" }}>
                            ตั้งค่าการตัดเกรด
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
          </div>
        </DivFromDown>
      </DivFrom>
    </>
        
      );
    }


export default Index;
