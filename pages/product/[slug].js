import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import Product from "../../models/Product";
import axios from "axios";
import { toast } from "react-toastify";
import { mongooseConnect } from "../../lib/mongoose";
import { Currency } from "../../models/Currency";
import { Category } from "../../models/Category";



export default function ProductScreen(props) {
    const product = props.product[0];
    const { state, dispatch } = useContext(Store);
    const router = useRouter();

    const priceInDollars = product.price;
    const exchangeRate = props.latestCurrency.currency;

    const priceInHryvnia = priceInDollars * exchangeRate;
    const category = props.categoryName
    const breadcrumbs = props.breadcrumbs;
    const breadcrumbsArray = Array.isArray(breadcrumbs) ? breadcrumbs : [breadcrumbs];


    if (!product) {
        return <Layout title='404'>Продукт не знайдено</Layout>;
    }

    const addToCardHandler = async () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const price = priceInHryvnia
        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity) {
            return toast.error('Пробачте, товар закінчівся')
        }
        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity, price } })
        router.push('/cart');
    }
    return (
        <Layout title={product.title}>
            <div className="py-2">
                <Link href="/">back to products</Link>
            </div>
            <div className="breadcrumbs">
                {breadcrumbsArray.map((category, index) => (
                    <span key={category._id}>
                        <Link href={`/catalog/${category._id}`}>{category.name}</Link>
                        {index < breadcrumbsArray.length - 1 && " > "}
                    </span>
                ))}
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={640}
                        height={640}
                        layout="responsive"
                    ></Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg font-bold">{product.title}</h1>
                        </li>
                        <li>Категорія: {category}</li>
                        <li >Опис: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div className="font-bold">Ціна</div>
                            <div>{priceInHryvnia} грн.</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div className="font-bold">Статус</div>
                            <div>{product.countInStock > 0 ? "В наявності" : "Недоступно"}</div>
                        </div>
                        <button className="primary-button w-full" onClick={addToCardHandler}>Додати до кошика</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context) {
    await mongooseConnect();
    const { slug } = context.query;
    const product = await Product.find({ slug: slug });
    const latestCurrency = await Currency.findOne().sort({ currency: -1 });
    const categoryId = product[0].category;
    const categoryName = await getCategoryName(categoryId);
    const breadcrumbs = await generateBreadcrumbs(categoryId);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),
            categoryId: JSON.parse(JSON.stringify(categoryId)),
            categoryName: JSON.parse(JSON.stringify(categoryName)),
            breadcrumbs: JSON.parse(JSON.stringify(breadcrumbs)),

        }
    }
}

async function getCategoryName(categoryId) {
    const category = await Category.findById(categoryId);
    return category.name;
}

async function generateBreadcrumbs(categoryId) {
    const breadcrumbs = [];
    async function getCategoryInfo(categoryId) {
        const category = await Category.findOne({ _id: categoryId });
        breadcrumbs.unshift(category);
        if (category.parent) {
            await getCategoryInfo(category.parent);
        }
    }
    await getCategoryInfo(categoryId);
    return breadcrumbs;
}
