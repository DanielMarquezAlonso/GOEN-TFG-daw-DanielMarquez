import { useEffect, useRef, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './payment.scss'


const Payment = (props) => {
  const [PagoFinalizado, setPagoFinalizado] = useState(false);
  const [details, setDetails] = useState("");
  const [data, setData] = useState("");
  const [dataRaw, setDataRaw] = useState();



  const { price } = props;
  // Configura las opciones de PayPal
  const initialOptions = {
    'client-id': 'Acmf57LGRJSzEePGWNTxE_BewwvQr8pxkAzQhhawTDyu3VshegqJc9p9RdeqwWMkYvLUQDSxNb5KLcl1',
    currency: 'EUR',
    intent: 'capture',
  };

  const crearRegistro = async (details) => {

    try {
      const response = await fetch('http://127.0.0.1:8000/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          // Agrega los datos que deseas enviar en la solicitud POST
          // Ejemplo:
          id_pago: details.id,
          fecha_alquiler: details.create_time,
          precio_total: details.purchase_units[0].amount.value,
          estado_pago: details.status,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pago exitoso:', details, data);

        setDetails(JSON.stringify(details));
        setData(JSON.stringify(data));
        setDataRaw(details);

        setPagoFinalizado(true);
      } else {
        throw new Error('Error al crear el registro');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Maneja el evento de pago exitoso
  const handlePaymentSuccess = (details, data) => {
    // Aquí puedes realizar acciones adicionales después de un pago exitoso
    // console.log('Pago exitoso:', details, data);
    
    // setDetails(JSON.stringify(details))
    // setData(JSON.stringify(data))
    // setDataRaw(details)
    crearRegistro(details);
    // setPagoFinalizado(true);
    

  };

  // Maneja el evento de error de pago
  const handlePaymentError = (error) => {
    // Aquí puedes manejar el error de pago
    console.error('Error de pago:', error);
  };

  return (
    <>
    {PagoFinalizado ? (
      <>
        <h1>Pago finalizado</h1>
        <div className="container">
      <h1>Datos del Pago:</h1>
      <p><span className="label">ID de Compra:</span> {dataRaw.id}</p>
      <p><span className="label">Fecha:</span> {dataRaw.create_time}</p>
      <p><span className="label">Importe:</span> {dataRaw.purchase_units[0].amount.value}€</p>
      <p><span className="label">Correo electrónico del pagador:</span> {dataRaw.payer.email_address}</p>
      <p><span className="label">Estado:</span> {dataRaw.status}</p>
    </div>


        </>
      ) : (
        


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
    )}
    </>
  );
};

export default Payment;