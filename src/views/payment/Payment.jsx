import { useEffect, useRef } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const Payment = (props) => {

  const { price } = props;
  // Configura las opciones de PayPal
  const initialOptions = {
    'client-id': 'Acmf57LGRJSzEePGWNTxE_BewwvQr8pxkAzQhhawTDyu3VshegqJc9p9RdeqwWMkYvLUQDSxNb5KLcl1',
    currency: 'EUR',
    intent: 'capture',
  };

  // Maneja el evento de pago exitoso
  const handlePaymentSuccess = (details, data) => {
    // Aquí puedes realizar acciones adicionales después de un pago exitoso
    console.log('Pago exitoso:', details, data);
  };

  // Maneja el evento de error de pago
  const handlePaymentError = (error) => {
    // Aquí puedes manejar el error de pago
    console.error('Error de pago:', error);
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          // Aquí puedes definir la lógica para crear una orden de pago
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price, // El valor del pago
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Aquí puedes definir la lógica después de la aprobación del pago
          return actions.order.capture().then(function (details) {
            handlePaymentSuccess(details, data);
          });
        }}
        onError={handlePaymentError}
      />
    </PayPalScriptProvider>
  );
};

export default Payment;