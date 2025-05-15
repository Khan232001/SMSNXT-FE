import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header"; 
import Footer from "../../components/Footer"; 
import Spinner from "../../components/Spinner"; 

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setPaymentStatus("Stripe is not properly loaded.");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("");

    try {
      const cardElement = elements.getElement(CardElement);

      // Replace this URL with your server endpoint
      const { data: clientSecret } = await axios.post("/create-payment-intent", {
        amount: 1000, // Amount in the smallest currency unit (e.g., cents)
        currency: "usd",
      });

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentStatus("Payment successful!");
        navigate("/thank-you");
      }
    } catch (err) {
      setPaymentStatus(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 py-6">
        <div className="w-full max-w-md p-6 border border-blue-200 rounded-lg bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-black-800 text-center mb-6">Secure Payment</h2>
          {paymentStatus && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                paymentStatus.includes("successful")
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              {paymentStatus}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1e293b",
                      "::placeholder": {
                        color: "#94a3b8",
                      },
                      fontFamily: "Arial, sans-serif",
                    },
                    invalid: {
                      color: "#e63946",
                    },
                  },
                  hidePostalCode: true,
                }}
                className="p-3 border border-blue-300 rounded-lg bg-white focus:outline-none"
              />
            </div>
            {isProcessing && <Spinner />}
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg shadow-md transition ${
                isProcessing
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none"
              }`}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentForm;
