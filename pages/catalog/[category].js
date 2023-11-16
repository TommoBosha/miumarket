/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { mongooseConnect } from "../../lib/mongoose";
import Product from "../../models/Product";
import { Currency } from "../../models/Currency";
import Link from "next/link";
import { Category } from "../../models/Category";
import axios from "axios";
import { WishedProduct } from "../../models/WishedProduct";

export default function CategoryPage({ products, latestCurrency, wished }) {
    const router = useRouter();
    const { category } = router.query;
    const [isWished, setWished] = useState(wished);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/wishlist');
                const wishedData = response.data.reduce((acc, item) => {
                    acc[item.product._id] = true;
                    return acc;
                }, {});

                console.log("Fetched wished data:", wishedData);

                setWished(wishedData);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        fetchData();
    }, []);

    const toggleWishlist = async (productId) => {
        try {
            const response = await axios.post('/api/wishlist', {
                product: productId,
            });

            console.log("Response from the server:", response);

            if (response.data.wishedDoc && response.data.wishedDoc._id) {
                setWished((prevWished) => {
                    const updatedWished = { ...prevWished };
                    updatedWished[productId] = !updatedWished[productId];
                    console.log("Wished after toggle:", updatedWished);
                    return updatedWished;
                });
            } else {
                console.error("Invalid wishedDoc data:", response.data.wishedDoc);
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        }
    };

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


                                <button onClick={() => toggleWishlist(product._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={isWished[product._id] ? "#3ACCE9" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>

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
    const wished = await WishedProduct.find({});

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
            wished: JSON.parse(JSON.stringify(wished)),
        },
    };
}
