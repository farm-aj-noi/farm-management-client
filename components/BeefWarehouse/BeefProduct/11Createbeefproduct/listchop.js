import React, { useState } from 'react'

function listchop({ listc }) {
  const [infochop, setinfochop] = useState(listc)
  return (
    <>
      {infochop && infochop.chop.length > 0 ? (
        infochop.chop.map((prod) => (
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

export default listchop