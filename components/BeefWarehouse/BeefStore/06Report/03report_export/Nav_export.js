import React from "react";

import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Input,
} from "../ReportFrom";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { Form, Row, Col, Tab, Nav } from "react-bootstrap";

const Nav_export = (Sidenumber) => {
  return (
    <>
      <DivFrom
        style={{
          width: "100%",
          marginTop: "0",
          gridRowStart: "2",
          gridRowEnd: "5",
          gridColumnStart: "2",
          height: "300px"
        }}
      >
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          ประเภทการแจ้งเตือน
        </DivFromTop>
        <DivFromDown>
          <div style={{ margin: "auto", minWidth: "100%" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={Sidenumber}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="1">
                        <Link href="/beefwarehouse/beefstore/report/export/report_halves">
                          <div style={{ width: "100%" }}>
                            ออกรายงานเบิกออกซากโคผ่าซีก
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/beefwarehouse/beefstore/report/export/report_quarters">
                          <div style={{ width: "100%" }}>
                            ออกรายงานเบิกออกซากโคสี่เสี้ยว
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="3">
                        <Link href="/beefwarehouse/beefstore/report/export/report_lumps">
                          <div style={{ width: "100%" }}>
                            ออกรายงานเบิกออกซากโคก้อนเนื้อ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="4">
                        <Link href="/beefwarehouse/beefstore/report/export/report_chops">
                          <div style={{ width: "100%" }}>
                            ออกรายงานเบิกออกซากโคชิ้นเนื้อ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="5">
                        <Link href="/beefwarehouse/beefstore/report/export/report_entrails">
                          <div style={{ width: "100%" }}>
                            ออกรายงานเบิกออกซากโคส่วนอื่น ๆ
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

export default Nav_export;
