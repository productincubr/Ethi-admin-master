// StripeContainer.js
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const StripeContainer = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeContainer;
