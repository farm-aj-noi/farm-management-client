import React from "react";

import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Input,
} from "./SettingFrom";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { Form, Row, Col, Tab, Nav } from "react-bootstrap";

const Nav_setting = (Sidenumber) => {
  return (
    <>
      <DivFrom
        style={{
          width: "100%",
          marginTop: "0",
          gridRowStart: "2",
          gridRowEnd: "5",
          gridColumnStart: "2",
        }}
      >
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการตั้งค่า
        </DivFromTop>
        <DivFromDown>
          <div style={{ margin: "auto", minWidth: "100%" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={Sidenumber}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="1">
                        <Link href="/beefwarehouse/beefstore/setting/room">
                          <div style={{ width: "100%" }}>
                            ตั้งค่าห้องจัดเก็บ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/beefwarehouse/beefstore/setting/shelf">
                          <div style={{ width: "100%" }}>ตั้งค่าชั้นจัดเก็บ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="3">
                        <Link href="/beefwarehouse/beefstore/setting/basket">
                          <div style={{ width: "100%" }}>ตั้งค่าตะกร้าจัดเก็บ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="4">
                        <Link href="/beefwarehouse/beefstore/setting/chillroom">
                          <div style={{ width: "100%" }}>ตั้งค่าการบ่ม</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="5">
                        <Link href="/beefwarehouse/beefstore/setting/date">
                          <div style={{ width: "100%" }}>
                            ตั้งค่าวันหมดอายุ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </DivFromDown>
      </DivFrom>
    </>
  );
};
///
export default Nav_setting;
