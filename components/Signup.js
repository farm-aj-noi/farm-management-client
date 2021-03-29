import React, { useState ,useEffect} from "react";
import Link from "next/link";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import json_provinces from '../json/provinces.json'
import json_amphures from '../json/amphures.json'
import json_districts from '../json/districts.json'
import json_zipcodes from '../json/zipcodes.json'
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
  const [param, setParam] = useState({
    province_id: "",
    amphur_id: "",
    district_code: ""
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    passsport: "",
    numaccount:"",
    district: "",
     province: "",
      amphur: "",
       zipcode: ""
  });
  const [success, setSuccess] = useState(false);

  var data_provinces = json_provinces.filter(i=> i.geo_id == '3');
  var data_amphures = json_amphures.filter(i=> i.geo_id == '3');
  var data_districts = json_districts.filter(i=> i.geo_id == '3')
  var data_zipcodes = json_zipcodes

  var show_provinces = data_provinces;
  var show_amphures = data_amphures.filter(i=> i.province_id == show_provinces[0].province_id);
  // console.log(show_amphures)
  var show_districts = data_districts.filter(i=>  i.amphur_id == show_amphures[0].amphur_id)
  var show_zipcodes = data_zipcodes

  const [passsportCheck, setpasssportCheck] = useState(false);

  useEffect(() => {
    // console.log(param)
    if(param.province_id ==''){
      // setParam({...param,province_id:data_provinces[0].province_id})
      // show_amphures= show_amphures
      // setParam({ ...param, 
      //   province_id:  show_amphures[0].province_id,
      //   amphur_id: show_amphures[0].amphur_id,
      //   district_code: ""})
    }else {
      // console.log(data_amphures)
      show_amphures = data_amphures.filter( i => i.province_id == param.province_id)
      // console.log(show_amphures)
      setParam({ ...param, 
        amphur_id: show_amphures[0].amphur_id,
        district_code: ""})

        let str_amphur = ''
        // document.getElementById('amphur').innerHTML = ''
        show_amphures.forEach(i => {
          // let option = document.createElement('option')
          // option.setAttribute("data-amphur-id",i.amphur_id)
          // option.setAttribute("key",i.amphur_id)
          // option.setAttribute("value",i.amphur_name)
          // option.innerHTML = i.amphur_name
          str_amphur +=`
          <option data-province-id=${i.province_id} data-amphur-id=${i.amphur_id} key=${i.amphur_id} value=${i.amphur_name}>
            ${i.amphur_name}
          </option>
          `
          // document.getElementById('amphur').appendChild(option)
        });

        document.getElementById('amphur').innerHTML=str_amphur
    }
   

    // console.log(show_amphures)
    

   

    console.log(param)
    // show_zipcodes = data_zipcodes.find(i => i.district_code == param.district_code)
  
  }, [param.province_id])

  useEffect(() => {
    if(param.amphur_id ==''){
      // console.log(1)
      // show_districts= show_districts
      // setParam({ ...param, 
      //   district_code: show_districts[0].district_code})
    }else {
      show_districts = data_districts.filter( i => i.province_id == param.province_id && i.amphur_id == param.amphur_id)
      setParam({ ...param, 
        district_code: show_districts[0].district_code})

        let str_districts = ''
        show_districts.forEach(i => {
          str_districts +=`
          <option data-district-code=${i.district_code} key=${i.district_id} value=${i.district_name}>
            ${i.district_name}
          </option>
          `
        });
    
        document.getElementById('district').innerHTML=str_districts
    }
 
    // console.log(param)

  }, [param.amphur_id])
      
  useEffect( () => {
    // console.log(param.d/istrict_code)
    // console.log(param)/
// 
    show_zipcodes = data_zipcodes.find(i => i.district_code == param.district_code)

    // console.log(show_zipcodes)

    if(show_zipcodes){
      setUserInfo({ ...userInfo, zipcode: show_zipcodes.zipcode_name })

    }
    


  }, [param.district_code])

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
          passsport:"",
          numaccount:"",
          district: "",
           province: "",
            amphur: "",
             zipcode: ""
        });

      }
    },
  });

  // const handleChange = (e) => {
  //   setUserInfo({
  //     ...userInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (name, value) => {

    setUserInfo({ ...userInfo, [name]: value })
  };
  const handleSubmit = async () => {
    try {  
        await signup();
    } catch (error) {
    }
  };
  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     await signup();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  return (
    <div style={{ margin: "100px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "30%",
        }}
        // onSubmit={handleSubmit}
        onChange={(event) => {
          let input = event.target.value;
          let value = input;
            handleChange(event.target.name, value);
        }}
      >
         <input
          style={{ margin: "5px", height: "30px" }}
          type="text"
          name="passsport"
          placeholder="เลขบัตรประชาชน"
          value={userInfo.passsport}
          // onChange={handleChange}
          onChange={(event) => {
            let input = event.target.value;
            let value = input.replace(/[^0-9]/gi, "");
              handleChange(event.target.name, value);
          }}
          maxLength="13"
          autoComplete="off"

 
        />
        
        <input
          style={{ margin: "5px", height: "30px" }}
          type="text"
          name="name"
          placeholder="ชื่อ สกุล"
          value={userInfo.name}
          // onChange={handleChange}
          onChange={(event) => {
            let input = event.target.value;
            let value = input;
              handleChange(event.target.name, value);
          }}
          autoComplete="off"

        />
           <input
          style={{ margin: "5px", height: "30px" }}
          type="text"
          name="numaccount"
          placeholder="รหัสสมาชิก"
          value={userInfo.numaccount}
          // onChange={handleChange}
          onChange={(event) => {
            let input = event.target.value;
            let value = input;
              handleChange(event.target.name, value);
          }}
          autoComplete="off"

        />
     <select
                    type="text"
                    name="province"
                    onChange={(event) => {
            
                      setParam({ ...param, 
                        province_id: event.target[event.target.selectedIndex].getAttribute('data-province-id'),
                        amphur_id: "",
                        district_code: ""})
                      console.log(param)
                      // onSubmit={handleSubmit}

                    }}
                    autoComplete="off"

                    style={{ margin: "5px", height: "30px" }}
                  >
                    <option value=""  disabled selected hidden>เลือก</option>
                    {show_provinces &&
                      show_provinces.map((userInfo) => (
                        <option data-province-id={userInfo.province_id} key={userInfo.province_id} value={userInfo.province_name}>
                          {userInfo.province_name}
                        </option>
                      ))}
                  </select>
                  <select
                  id="amphur"
                    type="text"
                    name="amphur"
                    placeholder="รหัสสมาชิก"

                    onChange={(event) => {
                      setParam({ ...param, 
                        province_id: event.target[event.target.selectedIndex].getAttribute('data-province-id'),
                        amphur_id: event.target[event.target.selectedIndex].getAttribute('data-amphur-id')
                        })
                        // onSubmit={handleSubmit}

                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{ margin: "5px", height: "30px" }}

                  >
                 
                  </select>
                  <select
                    type="text"
                    id="district"
                    placeholder="รหัสสมาชิก"

                    name="district"
                    onChange={(event) => {
                      console.log(event.target[event.target.selectedIndex].getAttribute('data-district-code'))
                      setParam({ ...param, district_code: event.target[event.target.selectedIndex].getAttribute('data-district-code')})
                      // onSubmit={handleSubmit}

                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{ margin: "5px", height: "30px" }}

                  >
                  </select>
                  <input
           onSubmit={handleSubmit}

                    name="zipcode"
                    disabled
                    value={userInfo.zipcode}
                    style={{ margin: "5px", height: "30px" }}

                    maxLength="100"
                  
                  />
        {/* <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                

                </div>
              </div>
              <div>
                อำเภอ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  
                </div>
              </div>
              <div>
                ตำบล : { }

                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                 
                </div>
              </div> */}
        <input
          style={{ margin: "5px", height: "30px" }}
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
          autoComplete="off"

        />
        <input
          style={{ margin: "5px", height: "30px" }}
          type="password"
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChange}
          autoComplete="off"

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
