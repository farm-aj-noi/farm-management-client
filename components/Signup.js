import React, { useState ,useEffect} from "react";
import Link from "next/link";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const SIGN_UP = gql`
  mutation SIGN_UP($name: String!, $email: String!, $password: String!, $passsport: String!) {
    signup(name: $name, email: $email, password: $password, passsport: $passsport ) {
      id
      name
      email
      passsport
    }
  }
`;

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    passsport: ""
  });
  const [success, setSuccess] = useState(false);


  const [passsportCheck, setpasssportCheck] = useState(false);

  useEffect(() => {
    // console.log("111-111");
    let total = 0;
    let iPID;
    let p_iPID = userInfo.passsport;
    let chk;
    let Validchk;
    iPID = p_iPID.replace(/-/g, "");
    Validchk = iPID.substr(12, 1);
    let j = 0;
    let pidcut;
    for (let n = 0; n < 12; n++) {
      pidcut = parseInt(iPID.substr(j, 1));
      total = total + pidcut * (13 - n);
      j++;
    }

    chk = 11 - (total % 11);

    if (chk == 10) {
      chk = 0;
    } else if (chk == 11) {
      chk = 1;
    }
    if (chk == Validchk) {
      // alert("ระบุหมายเลขประจำตัวประชาชนถูกต้อง");
      setpasssportCheck(false);
      // console.log("f");
    } else {
      // alert("ระบุหมายเลขประจำตัวประชาชนไม่ถูกต้อง");
      setpasssportCheck(true);
      // console.log("t");
    }
  }, [userInfo.passsport]);

  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    variables: { ...userInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setUserInfo({
          name: "",
          email: "",
          password: "",
          passsport:""
        });

      }
    },
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
      await signup();
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div style={{ margin: "100px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "30%",
        }}
        onSubmit={handleSubmit}
      >
         <input
          style={{ margin: "5px", height: "30px" }}
          type="text"
          name="passsport"
          placeholder="เลขบัตรประชาชน"
          value={userInfo.passsport}
          onChange={handleChange}
          maxLength="13"
          // style={
          //   {
          //     borderColor: `${
          //       !userInfo.passsport || passsportCheck ? "red" : ""
          //     }`,
          //   }
          // }
        />
         {/* <input
          style={{ margin: "5px", height: "30px" }}
          type="text"
          name="name"
          placeholder="Username"
          // value={userInfo.name}
          // onChange={handleChange}
        /> */}
          {/* <input
          style={{ margin: "5px", height: "30px" }}
          type="text"
          name="name"
          placeholder="Username"
          // value={userInfo.name}
          // onChange={handleChange}
        /> */}
        <input
          style={{ margin: "5px", height: "30px" }}
          type="text"
          name="name"
          placeholder="Username"
          value={userInfo.name}
          onChange={handleChange}
        />
        <input
          style={{ margin: "5px", height: "30px" }}
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <input
          style={{ margin: "5px", height: "30px" }}
          type="password"
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChange}
        />
        <button
          style={{
            margin: "5px",
            padding: "10px",
            background: "teal",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
          type="submit"
          disabled={loading}
        >
          Submit
        </button>
      </form>

      <div style={{ width: "30%", margin: "auto" }}>
        {success && (
          //   Router.push("/signin")
          <p>
            You successfully signed up, please{" "}
            <Link href="/signin">
              <a>sign in</a>
            </Link>
            .
          </p>
        )}

        {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
