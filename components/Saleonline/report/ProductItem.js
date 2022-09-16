import React from 'react'

const ProductContainer = styled.div`
    cursor: pointer;
    transition: all 0.25s;
    padding: 0 5px;

    &:hover {
        transform: scale(1.05);
        z-index: 1;
    }
`;

function ProductItem() {
    return (
        <ProductContainer>
            <Link
            /* href="/productonline/[productId]"
            as={`/productonline/${prod.id}`} */
            >
                <Card
                    style={{
                        width: "189px",
                        height: "285px",
                        border: "none",
                        boxShadow: "0 0 5px 0 rgb(0 0 0 / 20%)",
                    }}
                >
                    <a>
                        <Card.Img
                            variant="top"
                            /* src={prod.product_imageURL} */
                            style={{
                                height: "188px",
                                width: "188px",
                                objectFit: "cover",
                            }}
                        />
                    </a>

                    <Card.Body
                        style={{
                            padding: "0.5rem",
                            // backgroundColor:'#BCC6CC'
                        }}
                    >

                        <div
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                            {/*  {prod.product_name.substr(0, 24)}
                            {prod.product_name.length >= 25 && "..."} */}
                        </div>
                        <div style={{ fontSize: "24px", color: "#FC4004" }}>
                            {/* ฿{prod.product_price.toFixed(2)} */}
                        </div>
                        <div className="row">
                            <div
                                className="col-5"
                                style={{
                                    padding: "0px 5px 10px 15px",
                                    top: "-4px",
                                }}
                            >
                                <StarRatings
                                    rating={prod.star}
                                    starDimension="12px"
                                    starSpacing="0px"
                                    starRatedColor="#FFC107"
                                />
                            </div>

                            <div
                                className="col-7"
                                style={{
                                    padding: "0px 15px 0px 5px",
                                    textAlign: "right",
                                }}
                            >
                                ขายแล้ว {/* {prod.sale} */} ชิ้น
                            </div>
                        </div>
                        {/* <Card.Text >฿{prod.product_price}</Card.Text> */}
                        {/* <Button variant="primary">Go somewhere</Button> */}
                        {/* {user && user.id === prod.user.id ? (<Button style={{
          background: '#ad081b',
          color: 'white',
        }} onClick={()=>Router.push('/manageproductonline')}>Manage Product</Button>) : (<Button type="button" className="btn btn-secondary" style={{
          background: '#03bf4a',
          color: 'white',
        }}
          onClick={() => handleAddtoCart(prod.id)}>{loading ? 'Processing...' : 'เพิ่มสินค้า'}
        </Button>)} */}
                        {/* <Card.Text style={{padding:'10px',fontSize:'18px',fontWeight:'bold',color:'orange',align:"center"}}> ราคา {prod.product_price}</Card.Text> */}
                    </Card.Body>
                </Card>
            </Link>
        </ProductContainer>
    )
}

export default ProductItem