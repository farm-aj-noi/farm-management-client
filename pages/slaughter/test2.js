import React from 'react'
import Script from 'react-load-script'

let OmiseCard

console.log(process.env.OMISE_PUBLIC_KEY)
const CheckoutWithCreditCard = ({ carts }) => {
  // const amount = carts.reduce(
  //   (sum, cart) => sum + cart.quantity * cart.product.price,
  //   0
  // )

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard
    OmiseCard.configure({
      publicKey: "pkey_test_5ln7v4q7cn0sytyc3aw",
      currency: 'thb',
      frameLabel: 'Tea Shop',
      submitLabel: 'PAY NOW',
      buttonLabel: 'Pay with Omise'
    })
  }

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: []
    })
    OmiseCard.configureButton('#credit-card')
    OmiseCard.attach()
  }

  const omiseCardHandler = () => {
    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount: 100,
      onCreateTokenSuccess: token => {
        console.log(token)
        //   createCreditCardCharge(user.email, user.name, cart.amount, token)
      },
      onFormClosed: () => {}
    })
  }

  const handleClick = () => {
    creditCardConfigure()
    omiseCardHandler()
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
      }}
    >
      <Script url='https://cdn.omise.co/omise.js' onLoad={handleLoadScript} />
      <form>
        <button
          style={{
            padding: '5px 10px',
            cursor: 'pointer',
            background: 'blue',
            border: 'none',
            fontSize: '18px',
            color: 'white'
          }}
          id='credit-card'
          type='button'
          // disabled={!amount}
          onClick={handleClick}
        >
          Pay with Credit Card
        </button>
      </form>
    </div>
  )
}

export default CheckoutWithCreditCard