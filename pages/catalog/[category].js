/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { mongooseConnect } from "../../lib/mongoose";
import Product from "../../models/Product";
import { Currency } from "../../models/Currency";
import Link from "next/link";
import { Category } from "../../models/Category";

export default function CategoryPage({ products, latestCurrency }) {
    const router = useRouter();
    const { category } = router.query;

    console.log(`Категорія: ${category}`);

    console.log(products);

    if (!products) {
        return <Layout title="404">Продукти не знайдено</Layout>;
    }

    return (
        <Layout>
            <div className=" m-auto" style={{ width: "1040px" }}>
                <h1>{category} Товари</h1>
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
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();

    const { category } = context.query;
    const latestCurrency = await Currency.findOne().sort({ currency: -1 });

    let products;
    let childCategories;

    if (category === "productsAll") {
        products = await Product.find({});
    } else if (category === "productsNew") {
        products = await Product.find({ tag: "New" }, null, {
            sort: { tag: -1 },

        });
    } else if (category === "productsTop") {
        products = await Product.find({ tag: "Top" }, null, {
            sort: { tag: -1 },

        });
    } else if (category === "productsSale") {
        products = await Product.find({ tag: "Sale" }, null, {
            sort: { tag: -1 },

        });
    } else {
        childCategories = await Category.find({ parent: category });


        const categoryIds = [...childCategories.map((childCategory) => childCategory._id), category];

        console.log("categoryIds", categoryIds);

        products = await Product.find({ category: { $in: categoryIds } });

    }

    return {
        props: {
            category: category,
            products: JSON.parse(JSON.stringify(products)),
            latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),
        },
    };
}
