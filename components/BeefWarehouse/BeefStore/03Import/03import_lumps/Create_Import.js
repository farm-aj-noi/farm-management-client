import React, { useState } from "react";

import { DivCenter } from "../../../../utils/TableForm";
import { ButtonRecordColor } from "../../../../utils/Button";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATE_IMPORT = gql`
  mutation CREATE_IMPORT($barcode: String!) {
    createImport(barcode: $barcode) {
      import_date
      halve {
        weightwarm
        barcode
        status {
          nameTH
        }
        beeftype {
          nameTH
        }
        cows {
          cownum
        }
      }
    }
  }
`;

function Create_Import() {
  const MySwal = withReactContent(Swal);
  const [ImportInfo, setImportInfo] = useState({
    barcode: "",
  });
  const [success, setSuccess] = useState(false);
  const [createImport, { loading, error }] = useMutation(CREATE_IMPORT, {
    variables: { ...ImportInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setImportInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span onClick={() => Router.reload("/beef_store/imports")}>
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  const handleChange = (e) => {
    setImportInfo({
      ...ImportInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImport();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DivCenter style={{ marginTop: "20px" }}>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label
          for="beef"
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginRight: "10px",
          }}
        >
          รหัสบาร์โค้ด
        </label>
        <input
          type="text"
          id="barcode"
          name="barcode"
          style={{
            height: "35px",
            width: "200px",
            borderRadius: "4px 0px 0px 4px",
            borderRight: "none",
            border: "1px solid #AFAFAF",
            textAlign: "center",
            fontSize: "14px",
          }}
          value={ImportInfo.barcode}
          onChange={handleChange}
        />
        <ButtonRecordColor disabled={loading}>บันทึก</ButtonRecordColor>
        {error &&
          MySwal.fire({
            icon: "warning",
            title: "ผิดพลาด",
            text: (
              <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
            ),
            confirmButtonText: (
              <span onClick={() => Router.reload("/beef_store/imports")}>
                ตกลง
              </span>
            ),
            confirmButtonColor: "#3085d6",
          })}
      </form>
    </DivCenter>
  );
}

export default Create_Import;
