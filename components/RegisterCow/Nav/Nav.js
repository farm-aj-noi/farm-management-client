import React, { useContext } from "react";
import { Navbar, Nav, DropdownButton, NavDropdown } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import Link from "next/link";
import Head from "next/head";

import {
  NavButtonSigninComplete,
  NavButtonLeft,
  NavDropdownItem,
} from "./NavButton";
import { blue, white } from "../../../utils/colors";
import { Logoregister } from "../../../utils/image";
import { navbarHeight } from "../../../utils/sizes";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";
import MyCss from "./Nav.module.css";

import { AuthContext } from "../../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Nav1 = () => {
  const { user, signout } = useContext(AuthContext);
  // console.log(user);

  return (
    <>
      <Head>
        <title>ระบบลงทะเบียนรับโคเข้าขุนและลงทะเบียนโคเข้าเชือด</title>
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
          <Link href="/registercow">
            <a style={{ color: "white" }}>
              <Logoregister height="30px" weight="30px" />
              <p style={{ padding: "0 10px", display: "inline" }}>ระบบลงทะเบียนรับโคเข้าขุน</p>
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            {(
              user.role.nameEN === "veterinary" ||
              user.role.nameEN === "booster" ||
              user.role.nameEN === "admin") && (
              <>
            {(
              user.role.nameEN === "booster" ||
              user.role.nameEN === "admin") && (
                <>
                  <Link href="/registercow/importcow">
                  <NavButtonLeft>บันทึกโคเข้าขุน</NavButtonLeft>
                </Link>
                <DropdownButton
                  drop="down"
                  title={`บันทึกประวัติโค`}
                  bsPrefix={MyCss.nstdropleft}
                >
                  <Link href="/registercow/historyfoods">
                    <NavDropdownItem>บันทึกข้อมูลการให้อาหาร</NavDropdownItem>
                  </Link>
                  <Link href="/registercow/listtreat">
                    <NavDropdownItem>บันทึกข้อมูลการรักษา</NavDropdownItem>
                  </Link>
                  {/* <Link href="/slaughter/treat">
                    <NavDropdownItem>รายการการรักษาโค</NavDropdownItem>
                  </Link> */}
                </DropdownButton>
                <DropdownButton
                  drop="down"
                  title={`รายการโคขุน`}
                  bsPrefix={MyCss.nstdropleft}
                >
                  <Link href="/registercow/listregiscow">
                    <NavDropdownItem>รายการโคเข้าขุน</NavDropdownItem>
                  </Link>
                  <Link href="/registercow/showlisttreat">
                    <NavDropdownItem>รายการโครักษา</NavDropdownItem>
                  </Link>
                  {/* <Link href="/registercow/slaughter">
                    <NavDropdownItem>รายการโคพร้อมเชือด</NavDropdownItem>
                  </Link> */}
               
                </DropdownButton>
                {/* <Link href="/registercow/listdead">
                  <NavButtonLeft>รายการโคตาย</NavButtonLeft>
                </Link> */}
                {/* <Link href="/registercow/slaughter">
                  <NavButtonLeft>รายการโคพร้อมเชือด</NavButtonLeft>
                </Link> */}
                <Link href="/registercow/export">
                  <NavButtonLeft>ส่งโคเข้าเชือด</NavButtonLeft>
                </Link>
         
                </>
              )}
             {/* {(
  user.role.nameEN === "booster" ||
  user.role.nameEN === "admin") && (
    <>
      <Link href="/registercow/importcow">
      <NavButtonLeft>บันทึกโคเข้าขุน</NavButtonLeft>
    </Link>
        <DropdownButton
        drop="down"
        title={`รายการโคขุน`}
        bsPrefix={MyCss.nstdropleft}
      >
        <Link href="/registercow/listtreat">
          <NavDropdownItem>บันทึกข้อมูลการรักษา</NavDropdownItem>
        </Link>
        <Link href="/registercow/showlisttreat">
          <NavDropdownItem>รายการโครักษา</NavDropdownItem>
        </Link>
        <Link href="/registercow/listdead">
                  <NavButtonLeft>รายการโคตาย</NavButtonLeft>
                </Link>
      </DropdownButton>
      <Link href="/registercow/export">
        <NavButtonLeft>ส่งโคเข้าเชือด</NavButtonLeft>
      </Link></>
  )} */}
 
 {(
  user.role.nameEN === "veterinary" 
 ) && (
   <>
  <Link href="/registercow/listtreat">
   <NavButtonLeft>บันทึกข้อมูลการรักษา</NavButtonLeft>
 </Link>
   <Link href="/registercow/showlisttreat">
   <NavButtonLeft>รายการโครักษา</NavButtonLeft>
 </Link>
 <Link href="/registercow/listdead">
                  <NavButtonLeft>รายการโคตาย</NavButtonLeft>
  </Link>
  <DropdownButton
                  drop="down"
                  title={`บันทึกข้อมูลโรคและยา`}
                  bsPrefix={MyCss.nstdropleft}
                >
                  <Link href="/registercow/druganddise">
                    <NavDropdownItem>บันทึกข้อมูลยา</NavDropdownItem>
                  </Link>
                  <Link href="/registercow/diseanddrug">
                    <NavDropdownItem>บันทึกข้อมูลโรค</NavDropdownItem>
                  </Link>
                  
                  {/* <Link href="/registercow/slaughter">
                    <NavDropdownItem>รายการโคพร้อมเชือด</NavDropdownItem>
                  </Link> */}
               
                </DropdownButton>
 </>

)}
   
   {( user.role.nameEN === "admin") && (
              <>
               <Link href="/registercow/listdead">
                  <NavButtonLeft>รายการโคตาย</NavButtonLeft>
  </Link>
  <DropdownButton
                  drop="down"
                  title={`บันทึกข้อมูลโรคและยา`}
                  bsPrefix={MyCss.nstdropleft}
                >
                  <Link href="/registercow/druganddise">
                    <NavDropdownItem>บันทึกข้อมูลยา</NavDropdownItem>
                  </Link>
                  <Link href="/registercow/diseanddrug">
                    <NavDropdownItem>บันทึกข้อมูลโรค</NavDropdownItem>
                  </Link>
                  
                  {/* <Link href="/registercow/slaughter">
                    <NavDropdownItem>รายการโคพร้อมเชือด</NavDropdownItem>
                  </Link> */}
               
                </DropdownButton>
                {/* <Link href="/registercow/listdead">
                  <NavButtonLeft>จัดการคู่ค้า</NavButtonLeft>
  </Link> */}
                 <Link href="/registercow/report">
                  <NavButtonLeft>รายงาน</NavButtonLeft>
                </Link>
                <Link href="/registercow/setting/setpun">
                  <NavButtonLeft>ตั้งค่า</NavButtonLeft>
                </Link>
            
              </>
            )}
               
              
                {(user.role.nameEN === "booster") && (
              <>
                 <Link href="/registercow/report">
                  <NavButtonLeft>รายงาน</NavButtonLeft>
                </Link>
                <Link href="/registercow/setting/setpun">
                  <NavButtonLeft>ตั้งค่า</NavButtonLeft>
                </Link>
            
              </>
            )}
               
              </>
              
            )}

{(user.role.nameEN === "nomal" ) && (
              <>
            <Link href="/registercow/importfarmcow">
              <NavButtonLeft>เพิ่มโคเข้าสู่ระบบ</NavButtonLeft>
            </Link>
            <Link href="/registercow/listfarmmer">
              <NavButtonLeft>รายการโคเข้าขุน</NavButtonLeft>
            </Link>
            <Link href="/registercow/listfarmmer">
              <NavButtonLeft>รายการโคกำลังรักษา</NavButtonLeft>
            </Link>
            <Link href="/registercow/listfarmmer">
              <NavButtonLeft>รายการโคเข้าเชือด</NavButtonLeft>
            </Link>
            <Link href="/registercow/listfarmmer">
              <NavButtonLeft>รายการโคตาย</NavButtonLeft>
            </Link>
            </>
            )}
    
               {(user.role.nameEN === "booster"||
              user.role.nameEN === "slaughter"||
              user.role.nameEN === "accounter" ||
              user.role.nameEN === "admin") && (
              <>
            <Link href="/registercow/alert">
              <NavButtonLeft>แจ้งเตือน</NavButtonLeft>
            </Link>
            </>
            )}
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
