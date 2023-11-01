import React, { useState, useEffect } from 'react';
import LiqPay from 'liqpay-sdk-nodejs';


const publicKey = 'sandbox_i67991022050';
const privateKey = 'sandbox_sPmUKVMZYWvsfay1Wgtp6w8MEacJCsoqb9Gklbqx';
const liqPay = new LiqPay(publicKey, privateKey);

export default function LiqpayComponent() {
    const [liqpayForm, setLiqpayForm] = useState('');


    useEffect(() => {
        const fetchForm = async () => {
            const params = {
                version: 3,
                action: 'pay',
                amount: 1,
                currency: 'USD',
                description: 'Test payment',
                order_id: 'order12345',
            };

            try {
                const html = await liqPay.cnb_form(params);
                console.log(html); // <-- this is the HTML string I need to render in my component
                setLiqpayForm(html);


            } catch (error) {
                console.error(error);
            }
        };

        fetchForm();
    }, []);



    return (
        <div>
            <div>
                <h2>LiqPay Payment</h2>
                <iframe
                    srcDoc={`<!DOCTYPE html><html><body>${liqpayForm}</body></html>`}
                    width="100%"
                    height="780px"
                    title="LiqPay Payment"
                // sandbox="allow-popups"
                />
            </div>
        </div>

    );
}

// import React, { useState, useEffect } from 'react';
// import LiqPay from 'liqpay-sdk-nodejs';
// import HTMLtoReact from 'html-to-react';

// const publicKey = 'sandbox_i67991022050';
// const privateKey = 'sandbox_sPmUKVMZYWvsfay1Wgtp6w8MEacJCsoqb9Gklbqx';
// const liqPay = new LiqPay(publicKey, privateKey);

// export default function LiqpayComponent() {
//     const [liqpayForm, setLiqpayForm] = useState(null);

//     useEffect(() => {
//         const fetchForm = async () => {
//             const params = {
//                 version: 3,
//                 action: 'pay',
//                 amount: 100.5,
//                 currency: 'USD',
//                 description: 'Test payment',
//                 order_id: 'order12345',
//             };

//             try {
//                 const html = await liqPay.cnb_form(params);
//                 setLiqpayForm(html);


//                 const htmlToReactParser = new HTMLtoReact.Parser();
//                 const reactElement = htmlToReactParser.parse(html);

//                 // Встановіть React компонент у стані
//                 setLiqpayForm(reactElement);

//                 if (typeof SDK_Button === "undefined") {
//                     const script = document.createElement("script");
//                     script.src = "https://static.liqpay.ua/libjs/sdk_button.js";
//                     script.async = true;
//                     document.head.appendChild(script);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchForm();
//     }, []);

//     return (
//         <div>
//             {liqpayForm}
//         </div>
//     );
// }