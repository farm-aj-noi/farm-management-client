import React from "react"
import Head from "next/head"

const PageLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>ระบบจัดการฟาร์ม</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </div>
  )
}

export default PageLayout