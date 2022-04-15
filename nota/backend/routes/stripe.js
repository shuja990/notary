import express from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE);

var router = express.Router();

router.post('/', function (req, res) {
  const data = req.body
  // Create customer

  stripe.customers.create(
    {
      source: data.token.id // obtained with Stripe.js
    },
    function (error, customer) {
      // asynchronously called
      if (error) {
        // console.log('The following error happened')
        // console.log(error)
        return res.status(400).json({ error: 'Your customer creation failed' })
      } else {
        stripe.subscriptions.create(
          {
            customer: customer.id,
            items: [
              {
                plan: data.plan.plan
              }
            ]
          },
          function (err, subscription) {
            // asynchronously called
            if (err) {
              // console.log('The Subscription error happened')
              // console.log(err)
              return res.status(400).json({ err})
            } else {
              // console.log('The Subscription Was successful')
              // console.log(subscription)
              return res.json({ subscription })
            }
          }
        )

        // console.log('Stripe returned ', customer)
      }
    }
  )
})

export default router
