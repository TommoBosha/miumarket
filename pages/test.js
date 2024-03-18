// import liqpay from 'liqpay-sdk-nodejs';

// import { useEffect, useRef, useState } from 'react';
import LiqPayPay from '../components/LiqPay/LiqPay';




const PaymentComponent = ({ publicKey, privateKey }) => {

    const payInfo = {
        amount: 2,
        currency: 'UAH',
        title: 'PAY'
      }
    

      const ButtonComponent = () => (
        <button style={{
          backgroundColor: '#337ab7',
          color: '#fff',
          borderColor: '#2e6da4',
          border: '1px solid transparent',
          borderRadius: '4px',
          padding: '6px 12px',
          cursor: 'pointer'
        }}
        >{`${payInfo.title} ${payInfo.amount} ${payInfo.currency}`}
        </button>
      )

    // const publicKey = process.env.PUBLIC_LIQPAY_KEY;
    // const privateKey = process.env.PRIVATE_LIQPAY_KEY;
    
    // const liqPayInstance = new liqpay(publicKey, privateKey);
    // const [paymentStatus] = useState(null);
    
    // const formRef = useRef(null);

    // const params = {
    //   action: 'pay',
    //   amount: '1',
    //   currency: 'UAH',
    //   description: 'Оплата заказа',
    //   order_id: 'order01241',
    //   version: '3',
    //   language: 'uk', 
    //   result_url: 'https://miumarket.com/profile',
    // };

    // useEffect(() => {
    //     if (formRef.current) {
    //       formRef.current.innerHTML = liqPayInstance.cnb_form(params);
    //     }
    //   }, [params]);
    
    // console.log(liqPayInstance.cnb_form(params))
    return (
      <div>
        {/* <div>
          {!paymentStatus ? (
            <>
              {/* <div className='w-20' dangerouslySetInnerHTML={{ __html: liqPayInstance.cnb_form(params) }}></div> */}
              {/* <div ref={formRef}></div>
            </> */}
          {/* ) : paymentStatus === 'success' ? (
            <p>Платеж успешно проведен.</p>
          ) : (
            <p>Ошибка при проведении платежа. Попробуйте еще раз.</p>
          )}
        // </div> */} 

        <LiqPayPay
        publicKey={publicKey}
        privateKey={privateKey}
        amount='3'
        description='Payment for product'
        currency='UAH'
        orderId={Math.floor(1 + Math.random() * 900000000)}
        result_url='http://domain.com/user/account'
        server_url='http://server.domain.com/liqpay'
        product_description='Online courses'
        style={{ margin: '8px' }}
        // disabled={true}
        extra={[<ButtonComponent key='2' />]}
      />
      </div>
    );
  };


  export async function getServerSideProps() {
   
    const publicKey = process.env.PUBLIC_LIQPAY_KEY;
    const privateKey = process.env.PRIVATE_LIQPAY_KEY;
  
    
    return {
      props: {
        publicKey,
        privateKey,
      },
    };
  }
  export default PaymentComponent;