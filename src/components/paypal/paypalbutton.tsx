import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalComponent = () => {
  const initialOptions = {
    clientId: "AeTVy8fpYKvZ_q372W1dasinGPVVFwUAQ5Lfh_gFd73-G6218PUgYkWTDE6NPY78_pNh4XhEVXf5ieFv",
    currency: "USD",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={async () => {
          const response = await fetch("http://localhost:3000/paypal/orders", {
            method: "POST",
          });
          const orderData = await response.json();
          return orderData.id;
        }}
        onApprove={async (data) => {
          const response = await fetch(`http://localhost:3000/paypal/orders/${data.paymentID}/capture`, {
            method: "POST",
          });
          const captureData = await response.json();
          console.log("Order captured:", captureData);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;
