import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../../../authentication/AuthContext";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Loading";

const PaymentForm = ({ registrationId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");
  const [registration, setRegistration] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/registration/${registrationId}`)
      .then((res) => {
        const registrationData = res.data;
        setRegistration(registrationData);

        const amountInCents = Math.round(
          Number(registrationData.campFee) * 100
        );

        return axiosSecure.post("/create-payment-intent", {
          amount: amountInCents,
        });
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Stripe payment setup failed:", error);
        Swal.fire("Error", "Failed to initialize payment.", "error");
      });
  }, [registrationId, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error: createPaymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (createPaymentMethodError) {
      Swal.fire("Error", createPaymentMethodError.message, "error");
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: registration.participantName,
            email: registration.participantEmail,
          },
        },
      }
    );

    if (confirmError) {
      Swal.fire("Payment Failed", confirmError.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await axiosSecure.put(`/registrations/${registrationId}`, {
        transactionId: paymentIntent.id,
      });

      Swal.fire("Success!", `Transaction ID: ${paymentIntent.id}`, "success");
    }

    setProcessing(false);
  };

  if (!registration) return <p><Loading/></p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h3 className="text-lg font-semibold mb-2">{registration.campName}</h3>
      <p className="mb-2">
        Camp Fees: <strong>${registration.campFee}</strong>
      </p>
      <CardElement className="mb-4 p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
