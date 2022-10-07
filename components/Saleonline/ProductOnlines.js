import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import { InputGroup, FormControl, Button, Card, Carousel } from 'react-bootstrap'
/* import ProductItem from './ProductItem'; */
import { useRouter } from "next/router";
import { FaSearch } from 'react-icons/fa';
<<<<<<< HEAD
import customCss from "../../styles/productOnline.module.scss";
=======
import customCss from "./productOnline.module.scss";
>>>>>>> dev65

export default function ProductOnlines() {
    return (
        <div style={{ background: "#EFEFEF", }}>
            <InputGroup style=
                {{
                    padding: '20px 0px',
                    width: "100%",
                    maxWidth: '1000px',
                    margin: 'auto',

                }}>
                <FormControl
                    placeholder="ค้นหา...."
                    // aria-label="Recipient's username"
                    // aria-describedby="basic-addon2"
                    style={{
                        fontSize: '20px'
                    }}
                /* onChange={(event) => setInPutName(event.target.value)}
                onKeyDown={handleKeyDown} */
                />
                <InputGroup.Append>
                    {/* <Link href="productonline/search/[productName]" as={`productonline/search/${inputName}`}> */}
                    {/*  {inputName ? <Button variant="outline-primary" ><FaSearch /> </Button> : <Button variant="outline-primary" disabled><FaSearch /> </Button>} */}
                    {/* </Link> */}
                </InputGroup.Append>
            </InputGroup>
            <div style={{ width: "100%", maxWidth: '1000px', margin: "auto", height: "300px" }}>
                <Carousel /* activeIndex={index} onSelect={handleSelect} */>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.iotopsakon.com/wp-content/uploads/2019/01/20181001-1132-1200x480.jpg"
                            alt="First slide"
                            width="700"
                            height="300"
                        />

                        {/* <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="http://www.thaitechno.net//uploadedimages/header/Header_51218_20200522162545_986020235.png"
                            alt="Second slide"
                            width="700"
                            height="300"
                        />
                        {/* <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption> */}
                    </Carousel.Item>
                    {/* <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://i2.wp.com/www.shorteng.com/wp-content/uploads/2015/12/photo.jpg?resize=470%2C313"
                            alt="Third slide"
                            width="700"
                            height="300"
                            />

                            {/* <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                            </Carousel.Caption> */}
                    {/* </Carousel.Item> */}
                </Carousel>
            </div>
            <br />
            <br />
            <br />
            <Card style={{
                width: 'auto',
                margin: 'auto',
                background: 'white',
                border: 'none',
                maxWidth: '1000px'
            }}>
                <Card.Header style={{
                    padding: '10px',
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    background: 'rgb(0 49 113)',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600'
                }}>สินค้าขายดี</Card.Header>
                <Card.Body className={customCss['card-body-container']}>
                    <div
                        style={{ margin: "auto" }}
                    >

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap'
                        }}>
                            {/*  {data.SearchByTop.map((prod) => (
                                <ProductItem key={prod.id} prod={prod} />
                            ))} */}

                        </div>
                    </div>
                </Card.Body>
            </Card>
            <br />
            <Card style={{
                width: 'auto',
                margin: 'auto',
                background: 'white',
                border: 'none',
                maxWidth: '1000px'
            }}>
                <Card.Header style={{
                    padding: '10px',
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    background: 'rgb(0 49 113)',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600'
                }}>สินค้าแนะนำ</Card.Header>
                <Card.Body className={customCss['card-body-container']}>
                    <div
                        style={{ margin: "auto" }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap'
                        }}>

                            {/*  {data.productonlines.map((prod) => (
                                <ProductItem key={prod.id} prod={prod} />
                            ))} */}
                        </div>
                    </div>
                </Card.Body>
            </Card >
            <br />
        </div >
    )
}

// export default ProductOnlines