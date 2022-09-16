import React, { useContext, useEffect } from 'react'
import { Nav, NavDropdown, Navbar, DropdownButton, Dropdown } from 'react-bootstrap'
import Link from "next/link";
import Head from "next/head";
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../../appState/AuthProvider'
/* import { ME } from '../ProductItem' */
/* import Logo from '../../images/logo2.png' */
import { LogoSale } from "../../../utils/image";
import { Badge } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import MyCss from "./Nav.module.css";
import { blue, white } from "../../../utils/colors";

const astyle = {
    cursor: 'pointer',
    color: 'white',
    fontSize: '20px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    alignItems: 'center'
    // textDecoration: 'none',

}
const Nav1 = () => {
    const { user, signout, setAuthUser } = useContext(AuthContext)
    /*  const { data } = useQuery(ME)
     
     useEffect(() => {
         if (data) {
             setAuthUser(data.userOnline)
         }
     }, [data]) */
    return (
        <>
            <Head>
                <title>ระบบการขายออนไลน์</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Navbar collapseOnSelect expand="lg" variant="dark" style={{
                    backgroundColor: `${blue}`,
                    color: `${white}`,
                }}>
                    {/* <Link  href="/"></Link> */}
                    {(user.role.nameEN === "admin") && (
                        <Link href="/">
                            <a style={{ color: "white" }}>
                                <p style={{ padding: "0 10px", display: "inline", fontSize: "20px" }}>หน้าแรก</p>
                            </a>
                        </Link>
                    )}
                    <Link href="/saleonline">
                        <Navbar.Brand style={astyle}>
                            <LogoSale height="40x" weight="50px" />
                            {/*  <img src={LogoSale} style={{
                            height: '40px',
                            width: '50px'
                        }}></img> */}
                            ระบบการขายออนไลน์</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <>

                            </>
                            {/* <Link href="/productonline"><Nav.Link href="/productonline" style={{ fontSize: '18px' }}>ชอปปิงออนไลน์</Nav.Link></Link> */}
                            {user && (user.role.nameEN === "seller" || user.role.nameEN === "admin") && (<>
                                {/* <Link href="/cart"><Nav.Link href="/cart" style={{ fontSize: '18px' }}>ตระกร้าสินค้า
                            <Icon size={18} icon={shoppingCart}/><Badge variant="light"> {user && user.carts && user.carts.length === 0 && 0}
                                {user &&
                                    user.carts &&
                                    user.carts.length > 0 &&
                                    user.carts.reduce((sum, item) => sum + item.quantity, 0)}</Badge>
                            <span style={{
                                background: 'red',
                                color: 'white',
                                padding: '3px',
                                borderRadius: '50%'
                            }}>
                                {user && user.carts && user.carts.length === 0 && 0}
                                {user &&
                                    user.carts &&
                                    user.carts.length > 0 &&
                                    user.carts.reduce((sum, item) => sum + item.quantity, 0)}
                            </span></Nav.Link></Link> */}
                                <NavDropdown title="สินค้า" id="basic-nav-dropdown" bsPrefix={MyCss.nstdropleft} >
                                    <Link href="/saleonline/listproduct"><NavDropdown.Item href="/saleonline/listproduct" bsPrefix={MyCss.dropdownmenu} >รายการสินค้า</NavDropdown.Item></Link>
                                    <Link href="/saleonline/manageproductonline"><NavDropdown.Item href="/saleonline/manageproductonline" bsPrefix={MyCss.dropdownmenu} >เพิ่มสินค้า</NavDropdown.Item></Link>
                                    {/* <Link href="/checkreturnorder"><NavDropdown.Item href="/checkreturnorder" style={{ fontSize: '20px' }}>คำร้องขอคืนสินค้า</NavDropdown.Item></Link> */}
                                </NavDropdown>
                                {/* <Link href="/manageproductonline"><Nav.Link href="/manageproductonline" style={{ fontSize: '20px' }}>จัดการสินค้า</Nav.Link></Link> */}
                                <NavDropdown title="รายการคำสั่งซื้อ" id="basic-nav-dropdown" bsPrefix={MyCss.nstdropleft}>
                                    <Link href="/saleonline/checkorders"><NavDropdown.Item href="/saleonline/checkorders" bsPrefix={MyCss.dropdownmenu}>ตรวจสอบรายการสั่งซื้อ</NavDropdown.Item></Link>
                                    <Link href="/saleonline/checkcancelorder"><NavDropdown.Item href="/saleonline/checkcancelorder" bsPrefix={MyCss.dropdownmenu}>คำร้องยกเลิกสินค้า</NavDropdown.Item></Link>
                                    <Link href="/saleonline/checkreturnorder"><NavDropdown.Item href="/saleonline/checkreturnorder" bsPrefix={MyCss.dropdownmenu}>คำร้องขอคืนสินค้า</NavDropdown.Item></Link>
                                </NavDropdown>
                                <Link href="/saleonline/requeststore"><Nav.Link href="/saleonline/requeststore" bsPrefix={MyCss.nstdropleft}>รายการร้องขอเบิก</Nav.Link></Link>
                                <NavDropdown title="รายการคงคลัง" id="basic-nav-dropdown" bsPrefix={MyCss.nstdropleft} >
                                    <Link href="/saleonline/list/liststore"><NavDropdown.Item href="/saleonline/list/liststore" bsPrefix={MyCss.dropdownmenu} >รายการคงคลังชิ้นเนื้อ</NavDropdown.Item></Link>
                                    <Link href="/saleonline/list/listproduct"><NavDropdown.Item href="/saleonline/list/listproduct" bsPrefix={MyCss.dropdownmenu} >รายการคงคลังผลิตภัณฑ์</NavDropdown.Item></Link>
                                    {/* <Link href="/checkreturnorder"><NavDropdown.Item href="/checkreturnorder" style={{ fontSize: '20px' }}>คำร้องขอคืนสินค้า</NavDropdown.Item></Link> */}
                                </NavDropdown>
                                {/* <Link href="/checkcancelorder"><Nav.Link href="/checkcancelorder" style={{ fontSize: '20px' }}>คำร้องยกเลิกสินค้า</Nav.Link></Link>
                            <Link href="/checkorders"><Nav.Link href="/checkorders" style={{ fontSize: '20px' }}>ตรวจสอบรายการสั่งซื้อ</Nav.Link></Link> */}
                                <Link href="/saleonline/transport"><Nav.Link href="/saleonline/transport" bsPrefix={MyCss.nstdropleft}>รายการขนส่งสินค้า</Nav.Link></Link>


                                <NavDropdown title="การออกรายงาน" id="basic-nav-dropdown" bsPrefix={MyCss.nstdropleft}>

                                    <NavDropdown.Item href="/saleonline/report" bsPrefix={MyCss.dropdownmenu} style={{ fontSize: "16px" }} >ออกรายงานการสั่งซื้อสินค้า</NavDropdown.Item>
                                    <NavDropdown.Item href="/saleonline/report/ReportCancelOrder" bsPrefix={MyCss.dropdownmenu} style={{ fontSize: "16px" }}>ออกรายงานการยกเลิกสินค้า</NavDropdown.Item>
                                    <NavDropdown.Item href="/saleonline/report/ReportReturnOrder" bsPrefix={MyCss.dropdownmenu} style={{ fontSize: "16px" }}>ออกรายงานการคืนสินค้า</NavDropdown.Item>
                                </NavDropdown>
                                {/* <Link href="/perchase"><Nav.Link href="/perchase" style={{ fontSize: '18px' }}>ประวัติการสั่งซื้อ</Nav.Link></Link> */}
                            </>)
                            }
                        </Nav>
                        <Nav>
                            {/*  {!user && <>
                                <Link href="/signup"><Nav.Link href="/signup" style={{ fontSize: '20px' }}>สมัครสมาชิก</Nav.Link></Link>
                                <Link href="/signin"><Nav.Link href="/signin" style={{ fontSize: '20px' }}>เข้าสู่ระบบ</Nav.Link></Link>
                            </>} */}
                            {user && (user.role.nameEN === "seller" || user.role.nameEN === "admin") && (<><Link href="/setting"><Nav.Link href="/setting" style={{ fontSize: '20px', color: "#ffffff" }}><FiSettings /></Nav.Link></Link></>)}
                            {user && (user.role.nameEN === "normal" || user.role.nameEN === "admin") && (<>
                                <Link href="/cart"><Nav.Link href="/cart" bsPrefix={MyCss.nstdropleft}>
                                    <FaShoppingCart size={22} />  <Badge variant="danger" > {user && user ? user.carts && user.carts.length === 0 && 0 : 0}
                                        {user &&
                                            user.carts ?
                                            user.carts.length > 0 &&
                                            user.carts.reduce((sum, item) => sum + item.quantity, 0) : 0}</Badge>
                                    {/* <span style={{
                                background: 'red',
                                color: 'white',
                                padding: '3px',
                                borderRadius: '50%'
                            }}>
                                {user && user.carts && user.carts.length === 0 && 0}
                                {user &&
                                    user.carts &&
                                    user.carts.length > 0 &&
                                    user.carts.reduce((sum, item) => sum + item.quantity, 0)}
                            </span> */}
                                </Nav.Link>
                                </Link>
                            </>)
                            }
                            {user && <>
                                {/* <Nav.Link onClick={signout} style={{ fontSize: '18px' }}>ออกจากระบบ</Nav.Link> */}
                                <NavDropdown title={user.name} id="basic-nav-dropdown" bsPrefix={MyCss.nstdropright}>
                                    <div style={{ marginTop: "-9px", height: "150px" }}>
                                        {user && (user.role.nameEN === "normal" || user.role.nameEN === "admin") && (
                                            <>
                                                <Link href="/saleonline/address">
                                                    <NavDropdown.Item href="/saleonline/address" bsPrefix={MyCss.dropdownmenuright}>
                                                        ที่อยู่
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/saleonline/perchase"><NavDropdown.Item href="/saleonline/perchase" bsPrefix={MyCss.dropdownmenuright}>ประวัติการสั่งซื้อ</NavDropdown.Item></Link>
                                                <Link href="/saleonline/tracking"><NavDropdown.Item href="/saleonline/tracking" bsPrefix={MyCss.dropdownmenuright}>ติดตามสินค้า</NavDropdown.Item></Link>
                                            </>
                                        )}
                                        <NavDropdown.Item onClick={signout} bsPrefix={MyCss.dropdownmenuright} >ออกจากระบบ</NavDropdown.Item>
                                    </div>
                                </NavDropdown>
                            </>}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div></>

    )
}

export default Nav1
