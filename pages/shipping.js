import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import { useForm } from 'react-hook-form'
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NovaPoshta from '../components/NovaPoshta';

export default function ShippingScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,

    } = useForm();


    useEffect(() => {
        if (shippingAddress) {
            setValue('fullName', shippingAddress.fullName);
            setValue('address', shippingAddress.address);
            setValue('city', shippingAddress.city);
            setValue('postCode', shippingAddress.postCode);
            setValue('country', shippingAddress.country);
        }
    }, [setValue, shippingAddress])

    const submitHandler = ({ fullName, address, city, postCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postCode, country }
        });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    postCode,
                    country,
                },
            })
        );
        router.push('/payment');
    }

    return (
        <Layout title="Адреса доставки">
            <div className=' m-auto my-6'
                style={{ width: '1040px' }}
            >
                <CheckoutWizard activeStep={1} />
                <form
                    className='mx-auto max-w-screen-md'
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <h1 className='mb-4 text-xl'>Адреса доставки</h1>

                    <NovaPoshta />


                    <div className='mb-4'>
                        <label htmlFor='fullName'>ПІБ</label>
                        <input
                            className='w-full'
                            id='fullName'
                            autoFocus
                            {...register('fullName', {
                                required: 'Введіть ПІБ',
                            })} />
                        {errors.fullName && (
                            <div className='text-red-500'>{errors.fullName.message}</div>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='address'>Адреса</label>
                        <input
                            className='w-full'
                            id='address'
                            autoFocus
                            {...register('address', {
                                required: 'Введіть Адресу',
                                minLength: { value: 3, message: 'Адреса не повина бути меньша за 2 символів' },
                            })} />
                        {errors.address && (
                            <div className='text-red-500'>{errors.address.message}</div>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='city'>Місто</label>
                        <input
                            className='w-full'
                            id='city'
                            autoFocus
                            {...register('city', {
                                required: 'Введіть ваше місто ',

                            })} />
                        {errors.city && (
                            <div className='text-red-500'>{errors.city.message}</div>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='postCode'>Індекс</label>
                        <input
                            className='w-full'
                            id='postCode'
                            autoFocus
                            {...register('postCode', {
                                required: 'Введіть ваш індекс ',

                            })} />
                        {errors.postCode && (
                            <div className='text-red-500'>{errors.postCode.message}</div>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='country'>Країна</label>
                        <input
                            className='w-full'
                            id='country'
                            autoFocus
                            {...register('country', {
                                required: 'Введіть вашу країну ',

                            })} />
                        {errors.country && (
                            <div className='text-red-500'>{errors.country.message}</div>
                        )}
                    </div>

                    <div className='mb-4 flex justify-between'>
                        <button className='primary-button'>Далі</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

ShippingScreen.auth = true;
