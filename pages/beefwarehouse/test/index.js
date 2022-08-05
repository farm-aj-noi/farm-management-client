import React from 'react'
import { BackgroundStore } from "../../../utils/background";
import Test from "../../../components/BeefWarehouse/Test/Test"
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Footer from "../../../components/BeefWarehouse/Footer";
function test() {
    return (
        <BackgroundStore>
            <Nav />
            <Test />
            <Footer />
        </BackgroundStore>
    )
}

export default test