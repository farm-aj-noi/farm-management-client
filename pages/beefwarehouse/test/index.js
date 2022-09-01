import React from 'react'
import { BackgroundStore } from "../../../utils/background";
import Test from "../../../components/BeefWarehouse/BeefStore/01Dashboard/index1"
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