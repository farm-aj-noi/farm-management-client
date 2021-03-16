import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import Link from "next/link";
import Head from "next/head";

import {
  NavButtonSignup,
  NavButtonSigin,
  NavButtonSigninComplete,
} from "./NavButtonRight";
import { blue, white } from "../../utils/colors";
import { LogoFarmAll } from "../../utils/image";
import { navbarHeight } from "../../utils/sizes";
import { ic_person } from "react-icons-kit/md/ic_person";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";
import { ic_lock } from "react-icons-kit/md/ic_lock";

import { AuthContext } from "../../appState/AuthProvider";

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
        <title>ระบบจัดการฟาร์ม</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        style={{
          backgroundColor: `${blue}`,
          color: `${white}`,
          height: `${navbarHeight}px`,
          justifyContent: "space-between",
          padding: "0px 0px 0 10px",
        }}
      >
        <div>
          <Link href="/">
            <a style={{ color: "white" }}>
              <LogoFarmAll height="30px" weight="30px" />
              ระบบจัดการฟาร์ม
            </a>
          </Link>
        </div>

        <div>
          {user && (
            <>
              สวัสดี {data ? data.user.name : ""}
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
          {!user && (
            <>
              <Link href="/signup">
                <NavButtonSignup>
                  {" "}
                  <Icon
                    style={{ verticalAlign: "text-bottom" }}
                    icon={ic_person}
                    size={25}
                  />{" "}
                  สมัครสมาชิก
                </NavButtonSignup>
              </Link>
              <Link href="/signin">
                <NavButtonSigin>
                  {" "}
                  <Icon
                    style={{ verticalAlign: "text-bottom" }}
                    icon={ic_lock}
                    size={25}
                  />{" "}
                  เข้าสู่ระบบ
                </NavButtonSigin>
              </Link>
            </>
          )}
        </div>
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
