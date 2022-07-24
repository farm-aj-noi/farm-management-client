import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
    HeaderColor, DivFrom,
    DivFromTop,
    DivFromDown,
    Searchinput,
    Gobutton1,
} from "./SlaughterFrom"
import { DivBase } from "../../../../utils/divBase"
import { Icon } from "react-icons-kit"
import { list } from "react-icons-kit/fa/list";

function index() {
    const router = useRouter();
    const [inputbarcode, setInputbarcode] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            router.push('/beefwarehouse/beefproduct/trace/[trackingId]', `/beefwarehouse/beefproduct/trace/${inputbarcode}`)
        }
    };


    return (
        <div style={{ marginTop: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <HeaderColor style={{
                    width: "fit-content",
                    height: "fit-content",
                    padding: "5px 30px",
                }}>
                    ตรวจสอบสินค้า
                </HeaderColor>
            </div>
            <DivBase>
                <DivFrom>
                    <DivFromTop>
                        <div style={{ margin: "-3px 5px 0px 0px" }}>
                            <Icon size={20} icon={list} />
                        </div>
                        ติดตามสินค้า{" "}
                        {/* {router.pathname.substring(router.pathname.lastIndexOf("/") + 1)} */}
                    </DivFromTop>
                    <DivFromDown
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gridRowGap: "5px",
                        }}
                    >
                        <div className="mb-3" style={{ margin: "auto" }}>
                            กรุณากรอกบาร์โค้ด : { }
                            <Searchinput
                                onChange={(event) => setInputbarcode(event.target.value)}
                                style={{
                                    marginRight: 10,
                                    width: "250px",
                                    textAlign: "center",
                                }}
                                autoFocus
                                onFocus={e => e.currentTarget.select()}
                                onKeyDown={handleKeyDown}
                            />
                            <Link href="trace/[trackingId]" as={`trace/${inputbarcode}`}>
                                <Gobutton1>ค้นหา</Gobutton1>
                            </Link>
                        </div>
                    </DivFromDown>
                </DivFrom>
                {/* <Footer/> */}
            </DivBase>
        </div>
    )
}

export default index