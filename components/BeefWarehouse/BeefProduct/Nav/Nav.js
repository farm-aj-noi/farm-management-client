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
        <title>ระบบคลังผลิตภัณฑ์</title>
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
          <Link href="/beefwarehouse/beefproduct">
            <a style={{ color: "white" }}>
              <Logobeefstore height="30px" weight="30px" />
              <p style={{ padding: "0 10px", display: "inline" }}>
                ระบบคลังผลิตภัณฑ์
              </p>
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/beefwarehouse/beefproduct/imports">
              <NavButtonLeft> การนำเข้า</NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/exports">
              <NavButtonLeft> การเบิกออก</NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/store">
              <NavButtonLeft> คงคลัง</NavButtonLeft>
            </Link>
            <DropdownButton
              drop="down"
              title={`ออกรายงาน`}
              bsPrefix={MyCss.nstdropleft}
            >
              <Link href="/beefwarehouse/beefproduct/report/report_import">
                <NavDropdownItem>ออกรายงานการนำเข้า</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefproduct/report/report_export">
                <NavDropdownItem>ออกรายงานเบิกออก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefproduct/report/report_store">
                <NavDropdownItem>ออกรายงานคงคลัง</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefproduct/report/report_graph">
                <NavDropdownItem>รายละเอียดกราฟ</NavDropdownItem>
              </Link>
            </DropdownButton>
            <Link href="/beefwarehouse/beefproduct/notify/notify_date">
              <NavButtonLeft> การแจ้งเตือน</NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/setting">
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
