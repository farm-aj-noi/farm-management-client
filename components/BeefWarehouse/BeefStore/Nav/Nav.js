import React, { useContext } from "react";

import { Navbar, Nav, DropdownButton, NavDropdown } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";

import Link from "next/link";
import Head from "next/head";

import { Logobeefstore } from "../../../../utils/image";

import { blue, white } from "../../../../utils/colors";
import {
  NavButtonSigninComplete,
  NavButtonLeft,
  NavDropdownItem,
} from "./NavButton";

import MyCss from "./Nav.module.css";
import { AuthContext } from "../../../../appState/AuthProvider";

const Nav1 = () => {
  const { user, signout } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>ระบบคลังชิ้นเนื้อ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        style={{
          backgroundColor: `${blue}`,
          color: `${white}`,
          // padding: "0px 8px",
          // height: `${navbarHeight}px`,
          fontSize: "16px",
        }}
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand style={{ padding: "0" }}>
          <Link href="/beefwarehouse">
            <a style={{ color: "white" }}>
              <p style={{ padding: "0 10px", display: "inline" }}>หน้าแรก</p>
            </a>
          </Link>
          <Link href="/beefwarehouse/beefstore">
            <a style={{ color: "white" }}>
              <Logobeefstore height="30px" weight="30px" />
              <p style={{ padding: "0 10px", display: "inline" }}>
                ระบบคลังชิ้นเนื้อ
              </p>
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <DropdownButton
              drop="down"
              title={`การบ่มซาก`}
              bsPrefix={MyCss.nstdropleft}
            >
              <Link href="/beefwarehouse/beefstore/chill">
                <NavDropdownItem>บ่มซากเนื้อโค</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/chill/history_chill">
                <NavDropdownItem>ประวัติการบ่มซากเนื้อโค</NavDropdownItem>
              </Link>
            </DropdownButton>
            <DropdownButton
              drop="down"
              title={`การนำเข้า`}
              bsPrefix={MyCss.nstdropleft}
            >
              <Link href="/beefwarehouse/beefstore/import/import_halves">
                <NavDropdownItem>นำเข้าซากเนื้อโคผ่าซีก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_quarters">
                <NavDropdownItem>นำเข้าซากเนื้อโคสี่เสี้ยว</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_lumps">
                <NavDropdownItem>นำเข้าซากเนื้อโคก้อนเนื้อ</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_chops">
                <NavDropdownItem>นำเข้าซากเนื้อโคชื้นเนื้อ</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_entrails">
                <NavDropdownItem>นำเข้าซากเนื้อโคส่วนอื่น ๆ </NavDropdownItem>
              </Link>
            </DropdownButton>
            <Link href="/beefwarehouse/beefstore/exports">
              <NavButtonLeft> การเบิกออก</NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefstore/store">
              <NavButtonLeft> คงคลัง</NavButtonLeft>
            </Link>
            <DropdownButton
              drop="down"
              title={`ออกรายงาน`}
              bsPrefix={MyCss.nstdropleft}
            >
              <Link href="/beefwarehouse/beefstore/report/report_chill">
                <NavDropdownItem>ออกรายงานการบ่มซาก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/report/report_import">
                <NavDropdownItem>ออกรายงานการนำเข้า</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/report/report_export">
                <NavDropdownItem>ออกรายงานเบิกออก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/report/report_store">
                <NavDropdownItem>ออกรายงานคงคลัง</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/report/report_graph">
                <NavDropdownItem>รายละเอียดกราฟ</NavDropdownItem>
              </Link>
            </DropdownButton>
            <Link href="/beefwarehouse/beefstore/notify/notify_date">
              <NavButtonLeft> การแจ้งเตือน</NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefstore/setting">
              <NavButtonLeft> การตั้งค่า</NavButtonLeft>
            </Link>
          </Nav>
          <Nav>
            {user && (
              <>
                <a style={{ margin: "auto 5px", textAlign: "left" }}>
                  สวัสดี {user.name}
                </a>

                <NavButtonSigninComplete onClick={signout}>
                  <Icon
                    style={{ verticalAlign: "text-bottom" }}
                    icon={shareSquareO}
                    size={25}
                  />{" "}
                  ออกจากระบบ
                </NavButtonSigninComplete>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nav1;
