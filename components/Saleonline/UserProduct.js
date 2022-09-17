import React from 'react'

function UserProduct() {
    return (
        <div style={{ width: "70%", margin: "auto", marginBottom: "50px", marginTop: "50px" }}>
            {/* Header */}
            <p style={{ textAlign: "center", marginTop: "50px", fontSize: "36px" }}>รายการสินค้า</p>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                    widht: "100%"
                }}
            >
                <h3 style={{ margin: "auto" }}>ชื่อ</h3>
                <h3 style={{ margin: "auto" }}>รูปสินค้า</h3>
                <h3 style={{ margin: "auto" }}>ราคา</h3>
                <h3 style={{ margin: "auto" }}>จำนวนสินค้า</h3>
                <h3 style={{ margin: "auto" }}>จัดการ</h3>
            </div>

            {/* Body */}
            {/* {
                user &&
                user.products.length > 0 &&
                filtered.map(product => (

                    <UserProductItem key={product.id} product={product} />
                ))} */}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <Pagination total={totalItems} itemsPerPage={ITEMS_PER_PAGE} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} /> */}
            </div>
        </div>
    )
}

export default UserProduct