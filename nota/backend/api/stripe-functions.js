import Stripe from 'stripe'
import dotenv from 'dotenv'
const stripe = new Stripe('sk_test_51JXyP7ESmqyGiZXLdYfUBLOwb87yhm0slnJ7y4azbHWQfbwASO6T9IXRGpq60Wuq68Oho3fXDfBVOnOTwiv6dnke00ymm5hmOs');
/* Import constants and helper functions */
import {PRODUCT_INFO,PLAN_INFO,getValue,formatUSD} from '../utils/index.js'
dotenv.config()

/**
 * @param {Array} products An array of Stripe products
 * @return {Array} An array of Stripe products with additional display information
 */
function formatProducts(products) {
  products.forEach(product => {
    /* Append additional display information */
    product.subheader = getValue(PRODUCT_INFO[product.name], 'subheader', '');
  });

  return products;
}


/**
 * @param {Array} plans An array of Stripe plans
 * @return {Array} An array of Stripe plans with additional display information
 * This array is also sorted by amount
 */
function sortAndFormatPlans(plans) {
  plans = plans.sort((a, b) => {
    /* Sort plans in ascending order of price (amount)
     * Ref: https://www.w3schools.com/js/js_array_sort.asp */
    return a.amount - b.amount;
  });
  
  plans.forEach(plan => {
    /* Format plan price (amount) in USD */
    plan.amount = formatUSD(plan.amount);
    
    /* Append additional display information */
    plan.formatted = JSON.stringify(plan);
    plan.features = getValue(PLAN_INFO[plan.nickname], 'features', []);
    plan.highlight = getValue(PLAN_INFO[plan.nickname], 'highlight', false);
  });

  return plans;
}


/**
 * @param {Array} plans An array of Stripe plans
 * @param {Array} products An array of Stripe products
 * @return {Array} An array of Stripe products with attached plans
 * Products with no plans are filtered out
 */
function attachPlansToProducts(plans, products) {
  products.forEach(product => {
    const filteredPlans = plans.filter(plan => {
      return product.id === plan.product;
    });

    product.plans = filteredPlans;
  });

  return products.filter(product => product.plans.length > 0);
}


/**
 * @return {Array} An array of Stripe products that have 1+ plans
 * Each Stripe product contains an array of Stripe plans
 */
export function getProductsAndPlans() {
  return Promise.all([
    stripe.products.list({}), // Default returns 10 products, sorted by most recent creation date
    stripe.plans.list({}), // Default returns 10 plans, sorted by most recent creation date
  ]).then(stripeData => {
    console.log(stripeData);
    var products = formatProducts(stripeData[0].data);
    var plans = sortAndFormatPlans(stripeData[1].data);
    return attachPlansToProducts(plans, products);
  }).catch(err => {
    console.error('Error fetching Stripe products and plans: ', err);
    return [];
  });
}


/**
 * @param {string} paymentMethodId The id of your customer's Stripe Payment Method (an 
 * abstraction of your customer's card information)
 * @param {Object} customerInfo An object containing your customer's email, name,
 * and the plan your customer wants to pay for
 * @return {Object} Your customer's newly created subscription
 */
export async function createCustomerAndSubscription(paymentMethodId, customerInfo) {
  /* Create customer and set default payment method */
  const customer = await stripe.customers.create({
    payment_method: paymentMethodId,
    email: customerInfo.email,
    name: customerInfo.name,
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  /* Create subscription and expand the latest invoice's Payment Intent 
   * We'll check this Payment Intent's status to determine if this payment needs SCA
   */
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{
      plan: customerInfo.planId,
    }],
    // trial_from_plan: true,
    expand: ["latest_invoice.payment_intent"],
  });

  return subscription;
}
