import React from 'react'
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Trace from "../../../../components/BeefWarehouse/BeefProduct/13Trace"
const index = () => {
    return (
        <BackgroundProduct>
            <Nav />
            <Trace />
            <Footer />
        </BackgroundProduct>
    )
}

export default index