/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

import { mongooseConnect } from '../lib/mongoose';
import { Currency } from '../models/Currency';


export default function ProductItem({ product, addToCartHandler, latestCurrency }) {

    const exchangeRate = latestCurrency.currency;

    const priceInDollars = product.price;

    const priceInHryvnia = priceInDollars * exchangeRate;

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

export async function getServerSideProps() {
    await mongooseConnect();


    const latestCurrency = await Currency.findOne().sort({ currency: -1 });


    return {
        props: {

            latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),


        }
    }
}
