/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { mongooseConnect } from "../../lib/mongoose";
import Product from "../../models/Product";
import { Currency } from "../../models/Currency";
import Link from "next/link";
import { Category } from "../../models/Category";
import axios from "axios";
import { WishedProduct } from "../../models/WishedProduct";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Store } from "../../utils/Store";
import Filter from "../../components/Filter";

export default function CategoryPage({ products,parentCategories,  productCounts, latestCurrency, wished}) {
    const router = useRouter();
    const [isWished, setWished] = useState(wished);
    const { data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!session) {
              
              return;
            }
            const response = await axios.get("/api/wishlist");
            const wishedData = response.data.reduce((acc, item) => {
              acc[item.product._id] = true;
              return acc;
            }, {});
      
            setWished(wishedData);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, [session]);

    const toggleWishlist = async (productId) => {
        try {
            if (!session) {
                toast.error("Додавати в улюблене можуть тільки зареєстровані користувачі");
                return; 
            }

            const response = await axios.post('/api/wishlist', {
                product: productId,
            });

            if (response.data.wishedDoc && response.data.wishedDoc._id) {
                setWished((prevWished) => {
                    const updatedWished = { ...prevWished };
                    updatedWished[productId] = !updatedWished[productId];
                    
                    return updatedWished;
                });
            } else {
                console.error;
            }
        } catch (error) {
            console.error;
        }
    };

    if (!products) {
        return <Layout title="404">Продукти не знайдено</Layout>;
    }


    const addToCardHandler = (productId) => {
        
        const product = products.find((p) => p._id === productId);
            
        if (!product) {
            return toast.error("Товар не знайдено");
        }
    
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const priceInDollars = product.price;
        const exchangeRate = latestCurrency.currency;
        const priceInHryvnia = priceInDollars * exchangeRate;
    
        if (product.countInStock < quantity) {
            return toast.error("Пробачте, товар закінчився");
        }
    
        dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity, price: priceInHryvnia },
        });
        toast.success(`Товар "${product.title}" додано до корзини!`);
    };

    

    return (
        <Layout>
            <div className=" container" >
               
                <div className="md:grid md:grid-cols-category xl:grid-cols-categoryxl md:gap-[20px] xl:gap-[50px]">
               <div>
               <Filter
                router = {router} 
                latestCurrency={latestCurrency} 
                products={products}
                productCounts={ productCounts}
                parentCategories={parentCategories}
                setFilteredProducts={setFilteredProducts}
                setIsFiltered={setIsFiltered}
                />

               </div>
               

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
                    {(isFiltered ? filteredProducts : products).map((product) => {
                        const priceInDollars = product.price;
                        const exchangeRate = latestCurrency.currency;

                        const priceInHryvnia = priceInDollars * exchangeRate;
                      
                        return (
                            <div
                            key={product._id}
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

                                <button
                className="stroke-black "
                
                onClick={() => addToCardHandler(product._id)}
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g filter="url(#filter0_d_1230_17808)">
    <g filter="url(#filter1_d_1230_17808)">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.7336 4.9865C13.9134 4.61949 14.3626 4.46973 14.7371 4.65698C15.1041 4.83674 15.2539 5.28603 15.0667 5.66053L14.3401 7.11354L13.1941 10.3268C12.9769 10.9185 12.4153 11.3155 11.7786 11.3155H7.05238C6.37079 11.3155 5.77163 10.8511 5.59936 10.192L5.02262 7.94501C4.78294 6.99378 5.49444 6.07251 6.47564 6.07251H13.1867L13.7336 4.9865ZM11.7786 9.81752L12.5876 7.57051H6.47564L7.05238 9.81752H11.7786Z" fill="white"/>
    </g>
    <path d="M10.6544 13.1884C10.6544 13.8101 11.1562 14.3119 11.7779 14.3119C12.3995 14.3119 12.9014 13.8101 12.9014 13.1884C12.9014 12.5668 12.3995 12.0649 11.7779 12.0649C11.1562 12.0649 10.6544 12.5668 10.6544 13.1884Z" fill="white"/>
    <path d="M6.1612 13.1884C6.1612 13.8101 6.66303 14.3119 7.2847 14.3119C7.90637 14.3119 8.4082 13.8101 8.4082 13.1884C8.4082 12.5668 7.90637 12.0649 7.2847 12.0649C6.66303 12.0649 6.1612 12.5668 6.1612 13.1884Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_d_1230_17808" x="2.27607" y="0.876172" width="15.5714" height="15.1358" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="-1"/>
      <feGaussianBlur stdDeviation="1.35"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1230_17808"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1230_17808" result="shape"/>
    </filter>
    <filter id="filter1_d_1230_17808" x="0.976074" y="4.57617" width="18.1714" height="14.7393" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1230_17808"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1230_17808" result="shape"/>
    </filter>
  </defs>
</svg>
              </button>

                            </div>
                        );
                    })}
                </div>
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
    const productCounts = await getProductCountsByCategory();
    const parentCategoriesData = await Category.find({ parent: { $exists: false } });
    const parentCategories = await Promise.all(parentCategoriesData.map(async (category) => {
        const children = await Category.find({ parent: category._id });
        return {
            ...category.toObject(), 
            children: children.map(child => child.toObject()), 
        };
    }));

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

        products = await Product.find({ category: { $in: categoryIds } });

    }

    return {
        props: {
            productCounts: JSON.parse(JSON.stringify(productCounts)),
            category: category,
            products: JSON.parse(JSON.stringify(products)),
            latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),
            wished: JSON.parse(JSON.stringify(wished)),
            parentCategories: JSON.parse(JSON.stringify(parentCategories)),
        },
    };
}



const getProductCountsByCategory = async () => {
    
    const childCounts = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const parentCounts = await Product.aggregate([
        { $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryData"
        }},
        { $unwind: "$categoryData" },
        { $group: { _id: "$categoryData.parent", count: { $sum: 1 } } }
    ]);

    const combinedCounts = [...childCounts, ...parentCounts];

    return combinedCounts;
};