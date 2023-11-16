/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link';
import { mongooseConnect } from '../../lib/mongoose';
import { Currency } from '../../models/Currency';
import Product from '../../models/Product';

export default function CatalogPage({ products, latestCurrency }) {
    return (
        <Layout>
            <h1>Catalog</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
                {products.map((product, index) => {
                    const priceInDollars = product.price;
                    const exchangeRate = latestCurrency.currency;

                    const priceInHryvnia = priceInDollars * exchangeRate;

                    return (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <Link href={"/product/" + product.slug}>
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-56 object-fill"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">{product.title}</h2>
                                    <p className="text-gray-600">{priceInHryvnia} грн</p>



                                </div>
                            </Link>



                        </div>
                    );
                })}
            </div>

        </Layout >
    )
}
export async function getServerSideProps() {
    await mongooseConnect();

    const latestCurrency = await Currency.findOne().sort({ currency: -1 });

    const products = await Product.find({}, null, { sort: { '_id': -1 } });


    return {
        props: {

            products: JSON.parse(JSON.stringify(products)),
            latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),
            wished: {},
        },
    };
}