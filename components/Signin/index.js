import React, { useState, useContext } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Cookies from "js-cookie";

import { LogoFarmAll } from "../../utils/image";
import { LeftText } from "./SigninText";
import { ForgetPassword, Register } from "./SigninText";
import { QUERY_USER } from "../Nav/Nav";
import LoadingPage from "../../helps/LoadingPage";

import { Form, Button } from "react-bootstrap";
import { Modal, Spinner } from "react-bootstrap";

import { AuthContext } from "../../appState/AuthProvider";

const LOG_IN = gql`
  mutation LOG_IN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        products {
          id
        }
        carts {
          id
          product {
            description
            price
            imageUrl
          }
          quantity
        }
      }
      jwt
    }
  }
`;

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passsport: "",
  });
  const { setAuthUser } = useContext(AuthContext);
  const [email, setEmail] = useState(false);

  const [login, { loading, error }] = useMutation(LOG_IN, {
    variables: { ...userInfo },
    onCompleted: (data) => {
      if (data) {
        setAuthUser(data.login.user);
        Cookies.set("jwt", data.login.jwt);
        setUserInfo({
          email: "",
          password: "",
        });
        // Router.push("/");
        Router.reload("/");
      }
    },
    refetchQueries: [{ query: QUERY_USER }],
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const os = await login();
      if (os.data.email) {
        setEmail(true);
      }
    } catch (error) {
      console.log(error);
      // handleClose();
      // handleShow()
      // setTimeout(handleClose,5000)
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {loading && <LoadingPage />}

      {show && (
        <div
          style={{
            position: "absolute",
            display: "block",
            backgroundColor: "rgba(0,0,0,0.3)",
            width: "100%",
            height: "100%",
            top: "0",
            zIndex: "30",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              PointerEvent: "auto",
              backgroundColor: "#fff",
              border: "1px solid rgba(0,0,0,.2)",
              borderRadius: "15px",
              outline: "0",
              width: "350px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          PointerEvent: "auto",
          backgroundColor: "#fff",
          border: "1px solid rgba(0,0,0,.2)",
          borderRadius: "15px",
          outline: "0",
          width: "350px",
          margin: "auto",
          top: "25px",
        }}
      >
        <form
          style={{
            margin: "auto",
            padding: "0px 25px 10px 25px",
            width: "100%",
            textAlign: "center",
          }}
          onSubmit={handleSubmit}
        >
          <LogoFarmAll
            height="200px"
            weight="200px"
            style={{ margin: "0px 56px 50px 56px" }}
          />

          <LeftText>ชื่อผู้ใช้งาน</LeftText>

          <Form.Control
            type="email"
            name="email"
            placeholder="ชื่อผู้ใช้งาน"
            value={userInfo.email}
            onChange={handleChange}
            style={{
              border: `${userInfo.email.trim().length < 3
                ? "1px solid gray"
                : error
                  ? "1px solid red"
                  : "1px solid green"
                }`,
              borderRadius: ".25rem",
            }}
          />

          <LeftText style={{ marginTop: "15px" }}>รหัสผ่าน</LeftText>
          <Form.Control
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            value={userInfo.password}
            onChange={handleChange}
            style={{
              border: `${userInfo.password.trim().length < 1
                ? "1px solid gray"
                : error || userInfo.password.trim().length < 6
                  ? "1px solid red"
                  : "1px solid green"
                }`,
              borderRadius: ".25rem",
            }}
          />

          <div
            style={{
              width: "100%",
              margin: "auto",
              display: "flex",
              height: "25px",
            }}
          >
            {error && (
              <p
                style={{
                  color: "red",
                  width: "100%",
                  margin: "auto",
                  display: "block",
                }}
              >
                {error.graphQLErrors[0].message}
              </p>
            )}
          </div>

          <div style={{ float: "right", marginTop: "8px" }}>
            <ForgetPassword
              style={{ cursor: "pointer" }}
              onClick={() => Router.push("/signin/requestresetpassword")}
            >
              ลืมรหัสผ่าน กดที่นี่
            </ForgetPassword>
          </div>

          <Button
            variant="primary"
            style={{
              width: "100%",
              cursor: `${loading ||
                (!userInfo.email && !userInfo.password) ||
                !userInfo.email ||
                !userInfo.password ||
                userInfo.password.trim().length < 6
                ? "not-allowed"
                : "pointer"
                }`,
            }}
            type="submit"
            disabled={
              loading ||
              (!userInfo.email && !userInfo.password) ||
              !userInfo.email ||
              !userInfo.password ||
              userInfo.password.trim().length < 6
            }

          // onClick={handleShow}
          >
            เข้าสู่ระบบ
          </Button>
          {/*
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal> */}

          <div>
            <div style={{ marginTop: "15px" }}>
              <a style={{ textAlign: "start", display: "contents" }}>
                หากท่านไม่เป็นสมาชิก
              </a>
              {"  "}
              <Register
                style={{
                  textAlign: "end",
                  display: "contents",
                  cursor: "pointer",
                }}
                onClick={() => Router.push("/signup")}
              >
                กดเพื่อสมัคร
              </Register>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
