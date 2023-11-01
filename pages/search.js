import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import { toast } from "react-toastify";
import { Store } from "../utils/Store";
import { mongooseConnect } from "../lib/mongoose";
import { Currency } from "../models/Currency";

const SearchPage = (props) => {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { phrase } = router.query;
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { latestCurrency } = props;

    useEffect(() => {
        if (phrase) {
            setIsLoading(true);
            axios.get(`/api/products?phrase=${encodeURIComponent(phrase)}`)
                .then(response => {
                    setSearchResults(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error searching products: ", error);
                    setIsLoading(false);
                });
        }
    }, [phrase]);

    const addToCartHandler = async (product) => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            toast.error('Sorry. Product is out of stock');
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');
    };

    return (
        <Layout>
            <div>

                <h1>Результати пошуку для: &quot;{phrase}&quot;</h1>
                {isLoading && <p>Loading...</p>}
                {!isLoading && searchResults.length === 0 && <p>Нічого не знайдено.</p>}
                {!isLoading && searchResults.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
                        {searchResults.map((product) => (
                            <ProductItem
                                key={product._id}
                                product={product}
                                latestCurrency={latestCurrency}
                                addToCartHandler={addToCartHandler}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SearchPage;

export async function getServerSideProps() {
    await mongooseConnect();

    const latestCurrency = await Currency.findOne().sort({ currency: -1 });

    return {
        props: {

            latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),


        }
    }
}




// import React, { useContext, useState, useEffect } from 'react'
// import Layout from '../components/Layout'
// import { useRouter } from 'next/router'
// import { Store } from '../utils/Store';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Image from 'next/image';
// import ProductItem from '../components/ProductItem';
// import db from '../utils/db';
// import Product from '../models/Product';
// import { Currency } from '../models/Currency';
// import { Category } from '../models/Category';


// const prices = [
//     {
//         name: 'від 100грн. до 500грн. ',
//         value: '100-500',
//     },
//     {
//         name: 'від 501грн. до 1000грн. ',
//         value: '501-1000',
//     },
//     {
//         name: 'від 1001грн. до 2500грн. ',
//         value: '1001-2500',
//     },
//     {
//         name: 'від 2501грн. до 5000грн. ',
//         value: '2501-5000',
//     },
//     {
//         name: 'від 5001грн. до 10000грн. ',
//         value: '5001-10000',
//     }
// ];

// const PAGE_SIZE = 12;

// export default function SearchPage(props) {

//     const router = useRouter();

//     const {
//         query = 'all',
//         category = 'all',
//         price = 'all',
//         sort = ' featured',
//         page = 1,
//     } = router.query;

//     const { products, categories, countInStock, pages, latestCurrency } = props;
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const filterSearch = ({
//         page,
//         selectedCategory,
//         sort,
//         min,
//         max,
//         searchQuery,
//         selectedPrice,
//     }) => {
//         const query = {};
//         if (page) query.page = page;
//         if (searchQuery) query.searchQuery = searchQuery;
//         if (sort) query.sort = sort;
//         if (selectedCategory !== 'all') query.category = selectedCategory;
//         if (selectedPrice) query.price = selectedPrice;
//         if (min) query.min ? query.min : query.min === 0 ? 0 : min;
//         if (max) query.max ? query.max : query.max === 0 ? 0 : max;

//         router.push({
//             pathname: router.pathname,
//             query: query,
//         });
//     };

//     const categoryHandler = (e) => {
//         const selectedCategoryName = e.target.value; // Отримайте ім'я категорії
//         const selectedIndex = categories.findIndex((category) => category === selectedCategoryName);
//         if (selectedIndex !== -1) {
//             const selectedCategoryId = categories[selectedIndex]._id;
//             filterSearch({ selectedCategory: selectedCategoryId });
//         } else {
//             console.error("Категорію з ім'ям " + selectedCategoryName + " не знайдено.");
//         }
//     };

//     const pageHandler = (page) => {
//         filterSearch({ page });
//     };
//     const sortHandler = (e) => {
//         filterSearch({ sort: e.target.value });
//     };
//     const priceHandler = (e) => {
//         filterSearch({ price: e.target.value });
//     };

//     const { state, dispatch } = useContext(Store);

//     const addToCartHandler = async (product) => {
//         const existItem = state.cart.cartItems.find((x) => x._id === product._id);
//         const quantity = existItem ? existItem.quantity + 1 : 1;
//         const { data } = await axios.get(`/api/products/${product._id}`);
//         if (data.countInStock < quantity) {
//             toast.error('Sorry. Product is out of stock');
//             return;
//         }
//         dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
//         router.push('/cart');
//     };

//     const searchProducts = (phrase) => {
//         setIsLoading(true);
//         axios.get('/api/products?phrase=' + encodeURIComponent(phrase))
//             .then((response) => {
//                 setSearchResults(response.data);
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 // Обработка ошибки, если не удается получить результаты поиска.
//                 console.error('Error searching products: ', error);
//                 setIsLoading(false);
//             });
//     };

//     const submitHandler = (e) => {
//         e.preventDefault();
//         searchProducts(searchQuery);
//     };


//     return (
//         <Layout>
//             <div className='grid'>
//                 <div>
//                     <div className='my-3'>
//                         <h2>Категорії</h2>
//                         <select
//                             className='w-full'
//                             value={category}
//                             onChange={categoryHandler}>
//                             <option value="all">Всі</option>
//                             {categories.map((category) => (
//                                 <option key={category._id} value={category}>
//                                     {category.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className='mb-3'>
//                         <h2>Ціна</h2>
//                         <select
//                             className='w-full'
//                             value={price}
//                             onChange={priceHandler}>
//                             <option value="all">Всі</option>
//                             {prices.map((price) => (
//                                 <option key={price.value} value={price.value}>
//                                     {price.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 <div className='md:col-span-3'>
//                     <div className='mb-2 flex items-center justify-between border-b-2 pb-2'>
//                         <div className='flex items-center'>
//                             {products?.length === 0 ? 'No' : countInStock} Результат
//                             {query !== 'all' && query !== '' && ':' + query}
//                             {category !== 'all' && ':' + category}
//                             {price !== 'all' && ': Price' + price}
//                             &nbsp;
//                             {(query !== 'all' && query !== '') ||
//                                 category !== 'all' ||
//                                 price !== 'all' ? (
//                                 <button onClick={() => router.push('/search')}>
//                                     <Image
//                                         src="/images/search.svg"
//                                         alt="Лупа"
//                                         width={17}
//                                         height={18}
//                                     />
//                                 </button>
//                             ) : null}
//                         </div>
//                         <div>
//                             Sort by{' '}
//                             <select value={sort} onChange={sortHandler}>
//                                 <option value="featured">Featured</option>
//                                 <option value="lowest">Price: Low to High</option>
//                                 <option value="highest">Price: High to Low</option>
//                                 <option value="toprated">Customer Reviews</option>
//                                 <option value="newest">Newest Arrivals</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div>
//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
//                             {isLoading ? (
//                                 <p>Loading...</p>
//                             ) : searchResults.length === 0 ? (
//                                 <p>No results found.</p>
//                             ) : (
//                                 searchResults.map((product) => (
//                                     <ProductItem
//                                         key={product._id}
//                                         product={product}
//                                         latestCurrency={latestCurrency}
//                                         addToCartHandler={addToCartHandler}
//                                     />
//                                 ))
//                             )}
//                         </div>
//                         <ul className="flex">
//                             {searchResults.length > 0 &&
//                                 [...Array(pages).keys()].map((pageNumber) => (
//                                     <li key={pageNumber}>
//                                         <button
//                                             className={`default-button m-2 ${page == pageNumber + 1 ? 'font-bold' : ''}`}
//                                             onClick={() => pageHandler(pageNumber + 1)}
//                                         >
//                                             {pageNumber + 1}
//                                         </button>
//                                     </li>
//                                 ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </Layout>

//     )
// }

// export async function getServerSideProps({ query }) {
//     const pageSize = query.pageSize || PAGE_SIZE;
//     const page = query.page || 1;
//     const category = query.category || '';
//     const brand = query.brand || '';
//     const price = query.price || '';
//     const rating = query.rating || '';
//     const sort = query.sort || '';
//     const searchQuery = query.query || '';

//     const queryFilter =
//         searchQuery && searchQuery !== 'all'
//             ? {
//                 name: {
//                     $regex: searchQuery,
//                     $options: 'i',
//                 },
//             }
//             : {};
//     const categoryFilter = category && category !== 'all' ? { category } : {};
//     const brandFilter = brand && brand !== 'all' ? { brand } : {};
//     const ratingFilter =
//         rating && rating !== 'all'
//             ? {
//                 rating: {
//                     $gte: Number(rating),
//                 },
//             }
//             : {};
//     // 10-50
//     const priceFilter =
//         price && price !== 'all'
//             ? {
//                 price: {
//                     $gte: Number(price.split('-')[0]),
//                     $lte: Number(price.split('-')[1]),
//                 },
//             }
//             : {};
//     const order =
//         sort === 'featured'
//             ? { isFeatured: -1 }
//             : sort === 'lowest'
//                 ? { price: 1 }
//                 : sort === 'highest'
//                     ? { price: -1 }
//                     : sort === 'toprated'
//                         ? { rating: -1 }
//                         : sort === 'newest'
//                             ? { createdAt: -1 }
//                             : { _id: -1 };

//     await db.connect();
//     const categories = await Category.find({}, '_id name');
//     const brands = await Product.find().distinct('brand');
//     const productDocs = await Product.find(
//         {
//             ...queryFilter,
//             ...categoryFilter,
//             ...priceFilter,
//             ...brandFilter,
//             ...ratingFilter,
//         },
//         '-reviews'
//     )
//         .sort(order)
//         .skip(pageSize * (page - 1))
//         .limit(pageSize)
//         .lean();

//     const countProducts = await Product.countDocuments({
//         ...queryFilter,
//         ...categoryFilter,
//         ...priceFilter,
//         ...brandFilter,
//         ...ratingFilter,
//     });

//     await db.disconnect();
//     const products = productDocs.map(db.convertDocToObj);
//     const latestCurrency = await Currency.findOne().sort({ currency: -1 });
//     const categoryId = categories;
//     const categoryName = await Promise.all(categoryId.map(getCategoryName));

//     return {
//         props: {
//             products: JSON.parse(JSON.stringify(products)),
//             countProducts: JSON.parse(JSON.stringify(countProducts)),
//             page: JSON.parse(JSON.stringify(page)),
//             pages: Math.ceil(countProducts / pageSize),
//             categories: JSON.parse(JSON.stringify(categoryName)),
//             brands: JSON.parse(JSON.stringify(brands)),
//             latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),
//             categoryId: JSON.parse(JSON.stringify(categoryId)),
//             categoryName: JSON.parse(JSON.stringify(categoryName)),
//         },
//     };
// }
// async function getCategoryName(categoryId) {
//     const category = await Category.findById(categoryId);
//     return category.name;
// }
