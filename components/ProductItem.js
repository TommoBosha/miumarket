/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useContext } from 'react'
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function ProductItem({ product, latestCurrency }) {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();

    const exchangeRate = latestCurrency.currency;

    const priceInDollars = product.price;

    const priceInHryvnia = priceInDollars * exchangeRate;

    const addToCartHandler = async (product) => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const price = priceInHryvnia
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            toast.error('Sorry. Product is out of stock');
            return;

        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity, price } });
        router.push('/cart');
    };

    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className='w-auto h-64 mx-auto my-auto rounded shadow'
                />
            </Link>

            <div className='flex flex-col items-center justify-center p-5'>
                <Link href={`/product/${product.slug}`}>
                    <h2 className='text-lg'>{product.title}</h2>
                </Link>
                <p>{priceInHryvnia} грн.</p>
                <button className='primary-button' type='buttom' onClick={() => addToCartHandler(product)}>
                    Додати до кошика
                </button>

            </div>

        </div>
    )
}

