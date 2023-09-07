/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useContext } from 'react'
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function ProductItem({ product }) {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();

    const addToCardHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            alert("Пробачте, у нас не вистачає товара!");
            return
        }
        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
        router.push('/cart');
    }
    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-auto h-64 mx-auto my-auto rounded shadow'
                />
            </Link>

            <div className='flex flex-col items-center justify-center p-5'>
                <Link href={`/product/${product.slug}`}>
                    <h2 className='text-lg'>{product.name}</h2>
                </Link>
                <p>{product.price}</p>
                <button className='primary-button' type='buttom' onClick={addToCardHandler}>
                    Додати до кошика
                </button>

            </div>

        </div>
    )
}
