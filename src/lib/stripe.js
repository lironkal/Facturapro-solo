export const redirectToStripeCheckout = async (userEmail) => {
  const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  await stripe.redirectToCheckout({
    lineItems: [{ price: process.env.REACT_APP_STRIPE_PRICE_ID, quantity: 1 }],
    mode: 'subscription',
    successUrl: window.location.origin + '/?success=true',
    cancelUrl: window.location.origin + '/pricing',
    customerEmail: userEmail,
  });
};
