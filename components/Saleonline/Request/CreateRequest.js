import React, { useContext, useState } from 'react'
import { Card, Table, Form, Button } from "react-bootstrap"
import { Icon2 } from "../../../utils/naviconbeefstore"
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
import { AuthContext } from '../../../appState/AuthProvider';
import { QUERYREQUESTEX } from "../../BeefWarehouse/BeefStore/07Notify/02notify_exportrequest"


const CREATEREQUESTEXPORT = gql`
mutation CreateRequestExport($name: String, $beeftype: String, $grade: String, $status: String, $typemeat: String) {
  createRequestExport(name: $name, beeftype: $beeftype, grade: $grade, status: $status, typemeat: $typemeat) {
    id
  }
}
`

const CreateRequest = () => {
    const MySwal = withReactContent(Swal);
    const { user, signout } = useContext(AuthContext);
    const [formrequest, SetformRequset] = useState({
        name: user.name,
        beeftype: "",
        status: "6280fac6d3dbf7345093676f",
        grade: "",
        typemeat: "",
    })
    const [createRequestExport] = useMutation(CREATEREQUESTEXPORT, {
        variables: { ...formrequest },
        onCompleted: (data) => {
            if (data) {
                SetformRequset({
                    beeftype: "",
                    grade: "",
                    typemeat: "",
                });
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ดำเนินรายการร้องขอเสร็จสิ้น",
                    showConfirmButton: false,
                    timer: 1000
                    /*  confirmButtonText: "ตกลง", */
                    /* confirmButtonColor: "#3085d6", */
                  }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                      /*  Router.reload("beefwarehouse/beefstore/import/import_chops") */
                    }
                    /* if (result.isConfirmed) {
                      Router.reload("beefwarehouse/beefstore/import/import_halves")
                    } */
                  });
            }
        },
        refetchQueries: [
            {
                query: QUERYREQUESTEX,
            }
        ],
    })

    const handleChange = (e) => {
        SetformRequset({
            ...formrequest,
            [e.target.name]: e.target.value,
        });
    };

    const handdleSummit = async (e) => {
        try {
            e.preventDefault();
            await createRequestExport();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form.Group>
                <Form.Label>ซากโค :</Form.Label>
                <Form.Control as="select" name="typemeat"
                    value={formrequest.typemeat}
                    onChange={handleChange}
                >
                    <option value="">เลือก</option>
                    <option value="ซากโคผ่าซีก">ซากโคผ่าซีก</option>
                    <option value="ซากโคสี่เสี้ยว">ซากโคสี่เสี้ยว</option>
                    <option value="ก้อนเนื้อ">ก้อนเนื้อ</option>
                    <option value="ชิ้นเนื้อ">ชิ้นเนื้อ</option>

                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>ประเภทซาก :</Form.Label>
                <Form.Control as="select" name="beeftype"
                    value={formrequest.beeftype}
                    onChange={handleChange}
                    disabled={!formrequest.typemeat}
                >
                    <option value="">เลือก</option>
                    {formrequest.typemeat === "ซากโคผ่าซีก" ? (
                        <>
                            <option value="5f1000e28d55662dcc23d95e">ซากซ้าย</option>
                            <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
                        </>
                    ) : (
                        formrequest.typemeat === "ซากโคสี่เสี้ยว" ? (
                            <>
                                <option value="5f338f035f7703096453abb8">ซากขวา-ขาหน้า</option>
                                <option value="5f338f0d5f7703096453abb9">ซากขวา-ขาหลัง</option>
                                <option value="5f338eeb5f7703096453abb6">ซากซ้าย-ขาหน้า</option>
                                <option value="5f338ef65f7703096453abb7">ซากซ้าย-ขาหลัง</option>
                            </>
                        ) : (
                            formrequest.typemeat === "ก้อนเนื้อ" ? (
                                <>
                                    <option value="5f446195ecd6732ad8108684">เนื้อสันคอ</option>
                                    <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                                    <option value="5f4461bfecd6732ad8108686">เนื้อสันนอก</option>
                                    <option value="5f4461d6ecd6732ad8108687">ที-โบน สเต็ก</option>
                                    <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                                    <option value="5f446224ecd6732ad8108689">ใบบัวสเต็ก</option>
                                    <option value="5f44623aecd6732ad810868a">เนื้อสันใน</option>
                                    <option value="5f44624fecd6732ad810868b">สันสะโพก</option>
                                    <option value="5f446262ecd6732ad810868c">เสือร้องไห้</option>
                                    <option value="5f44628decd6732ad810868d">เนื้อซี่โครง</option>
                                    <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                                    <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                                    <option value="5f4462c8ecd6732ad8108690">ลูกมะพร้าว</option>
                                    <option value="5f4462ddecd6732ad8108691">ปลาบู่ทอง</option>
                                    <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                                    <option value="5f4462feecd6732ad8108693">หางตะเข้</option>
                                    <option value="5f44630fecd6732ad8108694">น่อง</option>
                                    <option value="5f446320ecd6732ad8108695">พับนอก</option>
                                </>
                            ) : (
                                formrequest.typemeat === "ชิ้นเนื้อ" ? (
                                    <>
                                        <option value="5f446195ecd6732ad8108684">เนื้อสันคอ</option>
                                        <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                                        <option value="5f4461bfecd6732ad8108686">เนื้อสันนอก</option>
                                        <option value="5f4461d6ecd6732ad8108687">ที-โบน สเต็ก</option>
                                        <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                                        <option value="5f446224ecd6732ad8108689">ใบบัวสเต็ก</option>
                                        <option value="5f44623aecd6732ad810868a">เนื้อสันใน</option>
                                        <option value="5f44624fecd6732ad810868b">สันสะโพก</option>
                                        <option value="5f446262ecd6732ad810868c">เสือร้องไห้</option>
                                        <option value="5f44628decd6732ad810868d">เนื้อซี่โครง</option>
                                        <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                                        <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                                        <option value="5f4462c8ecd6732ad8108690">ลูกมะพร้าว</option>
                                        <option value="5f4462ddecd6732ad8108691">ปลาบู่ทอง</option>
                                        <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                                        <option value="5f4462feecd6732ad8108693">หางตะเข้</option>
                                        <option value="5f44630fecd6732ad8108694">น่อง</option>
                                        <option value="5f446320ecd6732ad8108695">พับนอก</option>
                                    </>
                                ) : ("")
                            )

                        )
                    )}
                </Form.Control>
            </Form.Group >
            <Form.Group>
                <Form.Label>เกรด :</Form.Label>
                <Form.Control as="select" name="grade"
                    value={formrequest.grade}
                    onChange={handleChange}
                    disabled={!formrequest.beeftype || !formrequest.typemeat}
                >
                    <option value="">เลือก</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                </Form.Control>
            </Form.Group>
            <Button variant="success" style={{
                justifySelf: "right",
                float: "right",
            }}
                disabled={!formrequest.beeftype || !formrequest.grade || !formrequest.typemeat}
                onClick={handdleSummit}
            >
                บันทึก
            </Button>
        </>
    )
}

export default CreateRequest