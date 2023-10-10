import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function PaymentScreen() {
    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error('Payment method is required');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        );
        router.push('/placeorder');
    }

    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address])
    return (
        <Layout title="Метод оплати">
            <div className=' m-auto my-6'
                style={{ width: '1040px' }}
            >
                <CheckoutWizard activeStep={2} />
                <form className='mb-4 text-xl' onSubmit={submitHandler}>
                    <h1 className='mb-4 text-xl'>Метод оплати</h1>
                    {
                        ['Онлайн оплата', 'Накладенний платіж'].map((payment) => {
                            return (
                                <div key={payment} className='mb-4'>
                                    <input
                                        name='paymentMethod'
                                        className='p-2 outline-none focus:ring-0'
                                        id={payment}
                                        type='radio'
                                        checked={selectedPaymentMethod === payment}
                                        onChange={() => setSelectedPaymentMethod(payment)}
                                    />
                                    <label className='p-2' htmlFor={payment}>
                                        {payment}
                                    </label>
                                </div>
                            );
                        })
                    }

                    <div className='mb-4 flex justify-between'>
                        <button
                            onClick={() => router.push('/shipping')}
                            type='button'
                            className='default-button'
                        >
                            Назад
                        </button>
                        <button className='primary-button'>Далі</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

PaymentScreen.auth = true;