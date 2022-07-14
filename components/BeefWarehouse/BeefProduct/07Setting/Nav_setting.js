import React from "react";

import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
} from "./SettingFrom";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { Row, Col, Tab, Nav } from "react-bootstrap";

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
                        <Link href="/beefwarehouse/beefproduct/setting/">
                          <div style={{ width: "100%" }}>
                            ตั้งค่ารายการประเภทสินค้า
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/beefwarehouse/beefproduct/setting/date">
                          <div style={{ width: "100%" }}>
                            ตั้งค่าวันใกล้หมดอายุ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="3">
                        <Link href="/beefwarehouse/beefproduct/setting/room">
                          <div style={{ width: "100%" }}>
                            ตั่งค่าห้องจัดเก็บ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="4">
                        <Link href="/beefwarehouse/beefproduct/setting/freezer">
                          <div style={{ width: "100%" }}>ตั่งค่าตู้แช่เก็บ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="5">
                        <Link href="/beefwarehouse/beefproduct/setting/shelf">
                          <div style={{ width: "100%" }}>ตั่งค่าชั้นวาง</div>
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
