import React, { useState } from 'react'

function listlump({ listl }) {
    const [infolump, setinfolump] = useState(listl);
    return (
        <>
            {infolump && infolump.lump.length > 0 ? (
                infolump.lump.map((prod) => (
                    <tr style={{ textAlign: "center" }}>
                        <td>{prod.beeftype.nameTH}</td>
                        <td>{prod.beeftype.code}</td>
                        <td>{prod.imslaughter.numcow}</td>
                        <td>{prod.weight}</td>
                        <td>{prod.barcode}</td>
                    </tr>
                ))
            ) : (<tr style={{ textAlign: "center" }}>
                <td colspan="6">ไม่พบข้อมูล</td>
            </tr>)
            }
        </>

    )
}

export default listlump