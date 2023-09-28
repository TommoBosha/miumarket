/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'


export default function ProductItem({ product, addToCardHandler }) {


    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.images}
                    alt={product.title}
                    className='w-auto h-64 mx-auto my-auto rounded shadow'
                />
            </Link>

            <div className='flex flex-col items-center justify-center p-5'>
                <Link href={`/product/${product.slug}`}>
                    <h2 className='text-lg'>{product.name}</h2>
                </Link>
                <p>{product.price}</p>
                <button className='primary-button' type='buttom' onClick={() => addToCardHandler(product)}>
                    Додати до кошика
                </button>

            </div>

        </div>
    )
}
