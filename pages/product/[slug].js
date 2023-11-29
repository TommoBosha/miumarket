import React, { useContext, useEffect, useState } from "react";
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
import ProductSlider from "../../components/ProductSlider";
import { WishedProduct } from "../../models/WishedProduct";

export default function ProductScreen(props) {
  const product = props.product[0];
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const priceInDollars = product.price;
  const exchangeRate = props.latestCurrency.currency;

  const priceInHryvnia = priceInDollars * exchangeRate;

  const breadcrumbs = props.breadcrumbs;
  const breadcrumbsArray = Array.isArray(breadcrumbs)
    ? breadcrumbs
    : [breadcrumbs];

  const wished = props.wished;
  const [isWished, setWished] = useState(wished);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/wishlist");
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
      const response = await axios.post("/api/wishlist", {
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

  if (!product) {
    return <Layout title="404">Продукт не знайдено</Layout>;
  }

  const addToCardHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const price = priceInHryvnia;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Пробачте, товар закінчівся");
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity, price },
    });
    router.push("/cart");
  };

  return (
    <Layout title={product.title}>
      <div className=" m-auto mt-5 mb-12 " style={{ width: "1040px" }}>
        <div
          className="mb-3 flex items-center text-base "
          style={{ color: "#D7D7D7" }}
        >
          <span className="flex items-center">
            <Link href="/">
              <Image
                src="/images/home.svg"
                alt="Головна"
                width={13}
                height={14}
              />
            </Link>
            {"/"}
          </span>
          {breadcrumbsArray.map((category, index) => (
            <span key={category._id} className="flex items-center ">
              <Link
                href={`/catalog/${category._id}`}
                style={{
                  textDecoration:
                    index === breadcrumbsArray.length - 1
                      ? "underline"
                      : "none",
                  color: "#D7D7D7",
                }}
              >
                {category.name}
              </Link>
              {index < breadcrumbsArray.length - 1 && "/"}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 md:gap-10">
          <div>
            <ProductSlider images={product.images} />
          </div>
          <div>
            <ul>
              <li>
                <h1
                  className="text-lg font-semibold uppercase"
                  style={{ lineHeight: "22px" }}
                >
                  {product.title}
                </h1>
              </li>
              <li className="mb-2">
                <p
                  className="text-lg font-semibold uppercase"
                  style={{ lineHeight: "22px" }}
                >
                  ({product.productIndex})
                </p>
              </li>

              <li className="mb-4">
                <div
                  className="text-lg  uppercase"
                  style={{ color: "#D7D7D7", lineHeight: "22px" }}
                >
                  {product.countInStock > 0 ? "В наявності" : "Недоступно"}
                </div>
              </li>
              <li>
                <div className="mb-4 gap-2  items-center flex  ">
                  <div className="font-bold text-xl uppercase">Ціна</div>
                  <div
                    className="font-bold  text-xl rounded uppercase text-white p-2"
                    style={{ background: "#3ACCE9" }}
                  >
                    {priceInHryvnia} грн
                  </div>
                </div>
              </li>

              <div className="mb-4">
                <div className="grid grid-cols-2 gap-0">
                  {Object.entries(product.properties).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <span
                        className="font-semibold text-lg first-letter:uppercase"
                        style={{ lineHeight: "22px" }}
                      >
                        {key}:
                      </span>
                      <span
                        className="ml-1 text-lg"
                        style={{ lineHeight: "22px" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <li className="mb-4 text-lg" style={{ lineHeight: "22px" }}>
                {" "}
                {product.description}
              </li>
            </ul>

            <div className="flex items-start gap-2">
              <button
                className="primary-button text-lg  uppercase"
                style={{ background: "#3ACCE9", letterSpacing: "1.8px" }}
                onClick={addToCardHandler}
              >
                Купити
              </button>

              <button onClick={() => toggleWishlist(product._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="53"
                  height="53"
                  viewBox="0 0 53 53"
                  fill="none"
                >
                  <path
                    d="M0.449219 15.3008C0.449219 7.01651 7.16495 0.300781 15.4492 0.300781H37.4492C45.7335 0.300781 52.4492 7.01651 52.4492 15.3008V37.3008C52.4492 45.5851 45.7335 52.3008 37.4492 52.3008H15.4492C7.16495 52.3008 0.449219 45.5851 0.449219 37.3008V15.3008Z"
                    fill="#FFCD05"
                  />
                  <path
                    d="M20.1871 17.3032C21.0708 17.3032 21.932 17.6431 23.1104 18.4136C23.2463 18.5043 24.0848 19.1161 24.6513 19.524C25.4444 20.0905 25.5585 20.2097 26.252 20.324C26.252 20.324 26.5916 20.3732 26.8083 20.324C27.0251 20.2747 27.1319 20.2554 27.3425 20.1577C27.553 20.06 28.1343 19.6305 28.1343 19.6305C29.8339 18.1349 31.6763 17.3939 33.3079 17.3939C33.8517 17.3939 34.3503 17.4845 34.8035 17.6885C36.6164 18.4589 37.7268 20.4531 37.4548 22.4473C37.4322 22.6966 37.3642 22.9232 37.2962 23.1498C36.707 24.9627 35.2794 26.549 33.7837 28.2485C33.4665 28.5885 33.1719 28.9284 32.8773 29.2683C30.8831 31.5797 28.685 33.8232 26.5095 35.9987C25.8523 35.3188 25.1499 34.5937 24.3794 33.7779C22.1133 31.3758 19.7338 28.7698 17.6264 26.0731L17.4451 25.8465C16.38 24.4641 15.4509 23.2858 15.4056 21.9714C15.3376 20.0679 16.7199 18.2323 18.7821 17.5298C19.2806 17.3485 19.7565 17.2806 20.1871 17.2806M20.1871 15.0371C19.5072 15.0371 18.8047 15.1504 18.0569 15.4223C15.2243 16.3741 13.0488 19.0028 13.1395 22.0621C13.2074 24.2149 14.5898 25.8691 15.8588 27.4781C18.0116 30.2201 20.3684 32.8034 22.7478 35.3415C23.9941 36.6558 25.2405 37.9702 26.5095 39.2392C29.2742 36.4745 32.0615 33.7325 34.5995 30.7866C36.4124 28.7018 38.5652 26.5716 39.449 23.875C39.5623 23.5124 39.653 23.1271 39.6983 22.7646C40.1062 19.7959 38.4519 16.8047 35.6873 15.6036C34.9168 15.2864 34.1237 15.1278 33.3079 15.1278C30.8378 15.1278 28.2998 16.4874 26.5095 18.0737C26.5095 18.0737 24.5153 16.646 24.3794 16.5327C22.9744 15.6036 21.66 15.0371 20.1871 15.0371Z"
                    fill={isWished[product._id] ? "#3ACCE9" : "white"}
                  />
                  <path
                    d="M20.1871 17.3032C21.0708 17.3032 21.932 17.6431 23.1104 18.4136C23.2463 18.5043 24.0848 19.1161 24.6513 19.524C25.4444 20.0905 25.5585 20.2097 26.252 20.324C26.252 20.324 26.5916 20.3732 26.8083 20.324C27.0251 20.2747 27.1319 20.2554 27.3425 20.1577C27.553 20.06 28.1343 19.6305 28.1343 19.6305C29.8339 18.1349 31.6763 17.3939 33.3079 17.3939C33.8517 17.3939 34.3503 17.4845 34.8035 17.6885C36.6164 18.4589 37.7268 20.4531 37.4548 22.4473C37.4322 22.6966 37.3642 22.9232 37.2962 23.1498C36.707 24.9627 35.2794 26.549 33.7837 28.2485C33.4665 28.5885 33.1719 28.9284 32.8773 29.2683C30.8831 31.5797 28.685 33.8232 26.5095 35.9987C25.8523 35.3188 25.1499 34.5937 24.3794 33.7779C22.1133 31.3758 19.7338 28.7698 17.6264 26.0731L17.4451 25.8465C16.38 24.4641 15.4509 23.2858 15.4056 21.9714C15.3376 20.0679 16.7199 18.2323 18.7821 17.5298C19.2806 17.3485 19.7565 17.2806 20.1871 17.2806M20.1871 15.0371C19.5072 15.0371 18.8047 15.1504 18.0569 15.4223C15.2243 16.3741 13.0488 19.0028 13.1395 22.0621C13.2074 24.2149 14.5898 25.8691 15.8588 27.4781C18.0116 30.2201 20.3684 32.8034 22.7478 35.3415C23.9941 36.6558 25.2405 37.9702 26.5095 39.2392C29.2742 36.4745 32.0615 33.7325 34.5995 30.7866C36.4124 28.7018 38.5652 26.5716 39.449 23.875C39.5623 23.5124 39.653 23.1271 39.6983 22.7646C40.1062 19.7959 38.4519 16.8047 35.6873 15.6036C34.9168 15.2864 34.1237 15.1278 33.3079 15.1278C30.8378 15.1278 28.2997 16.4874 26.5095 18.0737C26.5095 18.0737 24.5153 16.646 24.3794 16.5327C22.9744 15.6036 21.66 15.0371 20.1871 15.0371Z"
                    stroke={isWished[product._id] ? "#3ACCE9" : "white"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { slug } = context.query;
  const wished = await WishedProduct.find({});
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
      wished: JSON.parse(JSON.stringify(wished)),
    },
  };
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
