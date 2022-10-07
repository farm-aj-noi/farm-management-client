import React, { useContext, useState } from 'react'
import { Card, Table, Form, Button } from "react-bootstrap"
import { Icon2 } from "../../../utils/naviconbeefstore"
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
import { AuthContext } from '../../../appState/AuthProvider';
import { QUERYLISTREQUESTP } from "./index"

const QUERYPRODUCTTYPE = gql`
query QUERYPRODUCTTYPE {
    allproducttype {
      id
      code
      nameTH
      nameEN
      BBE
      unit {
        name
        id
      }
    }
  }
`

const CREATEREQUESTEXPORTP = gql`
mutation CREATEREQUESTEXPORTP($name: String, $producttype: String, $status: String) {
  createRequestExportP(name: $name, producttype: $producttype, status: $status) {
    id
    name
  }
}
`;

function CreateRequestP() {
    const MySwal = withReactContent(Swal);
    const { user, signout } = useContext(AuthContext);
    const [formrequestP, SetformRequsetP] = useState({
        name: user.name,
        producttype: "",
        status: "6280fac6d3dbf7345093676f",
    })
    const { data } = useQuery(QUERYPRODUCTTYPE);
    const [createRequestExportP] = useMutation(CREATEREQUESTEXPORTP, {
        variables: {
            ...formrequestP
        },
        onCompleted: (data) => {
            if (data) {
                SetformRequsetP({
                    producttype: "",
                });
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ทำการร้องขอเบิกเสร็จสิ้น",
                    confirmButtonText: (
                        <span onClick={() => Router.reload("saleonline/requeststore")}>
                            ตกลง
                        </span>
                    ),
                    confirmButtonColor: "#3085d6",
                });
            }
        },
        refetchQueries: [
            {
                query: QUERYLISTREQUESTP,
            }
        ],
    })
    const handleChange = (e) => {
        SetformRequsetP({
            ...formrequestP,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await createRequestExportP();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form.Group>
                <Form.Label>ประเภทสินค้า :</Form.Label>
                <Form.Control as="select" name="producttype"
                    value={formrequestP.producttype}
                    onChange={handleChange}
                >
                    <option>เลือก</option>
                    {data && data.allproducttype.map((prod) => (
                        <option key={prod.id} value={prod.id}>{prod.nameTH}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="success" style={{
                justifySelf: "right",
                float: "right",
            }}
                disabled={!formrequestP.producttype}
                onClick={handleSubmit}
            >
                บันทึก
            </Button>
        </>
    )
}

export default CreateRequestP