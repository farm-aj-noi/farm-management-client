import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import Link from "next/link";
import Head from "next/head";

import {
  NavButtonSignup,
  NavButtonSigin,
  NavButtonSigninComplete,
} from "./NavButtonRight";
import { blue, white } from "../../../utils/colors";
import { LogoFarmAll } from "../../../utils/image";
import { navbarHeight } from "../../../utils/sizes";
import { ic_person } from "react-icons-kit/md/ic_person";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";
import { ic_lock } from "react-icons-kit/md/ic_lock";

import { AuthContext } from "../../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_USER = gql`
  {
    user {
      name
    }
  }
`;

const Nav1 = () => {
  const { user, signout } = useContext(AuthContext);
  // console.log(user);

  const { data } = useQuery(QUERY_USER);

  return (
    <>
      <Head>
        <title>ระบบจัดการคงคลัง</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        style={{
          backgroundColor: `${blue}`,
          color: `${white}`,
          height: `${navbarHeight}px`,
          justifyContent: "space-between",
          padding: "0px 0px 0 10px",
          height: "60px"
        }}
        collapseOnSelect
        expand="lg"
        fixed="top"
      >
        <Navbar.Brand style={{ padding: "0" }}>
          <Link href="/">
            <a style={{ color: "white", padding: "0 5px", display: "inline", fontSize: "22px", fontWeight: 600, letterSpacing: "1px " }}>
              <LogoFarmAll height="30px" weight="30px" />
              ระบบจัดการฟาร์ม:
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <></>
          </Nav>
          <Nav >
            {user && (
              <>
                {/* <DropdownButton drop="down"
                  title={
                    <span style={{ fontSize: "18px", fontWeight: 600 }}>
                      สวัสดี {user.name}
                    </span>
                  }
                  bsPrefix={MyCss.nstdropright}
                 >
                  <NavDropdownItem1 onClick={signout}>
                    <Icon
                      style={{ verticalAlign: "text-bottom" }}
                      icon={shareSquareO}
                      size={25}
                    />
                    ออกจากระบบ
                  </NavDropdownItem1>
                </DropdownButton> */}
                <a style={{ margin: "auto 5px", textAlign: "left", fontSize: "18px", fontWeight: 600, letterSpacing: "1px" }}>
                  สวัสดี {user.name}
                </a>

                <NavButtonSigninComplete onClick={signout} style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "1px", marginRight: "16px" }}>
                  <Icon
                    style={{ verticalAlign: "text-bottom", marginTop: "1px" }}
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
      {/* <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          background: "blue",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "70%",
          }}
        >
          <li style={liStyle}>
            <Link href="/">
              <a style={aStyle}>Home</a>
            </Link>
          </li>
          <li style={liStyle}>
            <Link href="/products">
              <a style={aStyle}>Products</a>
            </Link>
          </li>
          {user && (
            <>
              <li style={liStyle}>
                <Link href="/cart">
                  <a style={aStyle}>Cart</a>
                </Link>
              </li>

              <li style={liStyle}>
                <Link href="/manageProduct">
                  <a style={aStyle}>Manage Product</a>
                </Link>
              </li>

              <button
                style={{
                  background: "grey",
                  fontSize: "18px",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={signout}
              >
                Sign Out
              </button>
            </>
          )}

          {!user && (
            <>
              <li style={liStyle}>
                <Link href="/signin">
                  <a style={aStyle}>Sign In</a>
                </Link>
              </li>
              <li style={liStyle}>
                <Link href="/signup">
                  <a style={aStyle}>Sign Up</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav> */}
    </>
  );
};

export default Nav1;
