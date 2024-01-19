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
import { useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";

export default function ProductScreen(props) {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";

  const product = props.product[0];
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { data: session } = useSession();

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
    setIsClient(true);
  }, [session]);

  const toggleWishlist = async (productId) => {
    try {
      if (!session) {
        toast.error(
          "Додавати в улюблене можуть тільки зареєстровані користувачі"
        );
        return;
      }
      const response = await axios.post("/api/wishlist", {
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
      <div className=" container max-w-[425px] md:max-w-[1024px] xl:max-w-[1280px] xxl:max-w-[1440px] pb-[30px] md:pb-[61px] xl:pb-[46px] relative z-10  ">
        <div
          className="pt-[14px] flex items-center text-base "
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

        <div className="pt-[5px] flex flex-col md:grid md:grid-cols-2 md:gap-[40px] xl:gap-10">
          <div className="max-w-[340px] xl:max-w-[520px]">
            <ProductSlider images={product.images} />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <ul className="flex flex-col items-center md:items-start">
              <li className="pt-[23px] md:pt-0 text-center">
                <h1 className="text-[15px] leading-[17px] xl:text-[18px] xl:leading-[22px] font-semibold uppercase">
                  {product.title}
                </h1>
              </li>
              <li >
                <p className="text-[15px] leading-[17px] xl:text-[18px] xl:leading-[22px] font-semibold uppercase">
                  ({product.productIndex})
                </p>
              </li>

              <li className="pt-[5px] xl:pt-[8px]">
                <div className="text-[15px] md:text-[18px] leading-[22px] font-semibold text-accent  uppercase">
                  {product.countInStock > 0 ? "В наявності" : "Недоступно"}
                </div>
              </li>
              <li>
                <div className="pt-[4px] md:pt-[6px] xl:pt-[10px] gap-2  items-center flex  ">
                  <div className="font-bold text-[15px] md:text-[18px] xl:text-[21px] uppercase">Ціна</div>
                  <div
                    className="font-bold  text-[15px] md:text-[18px] xl:text-[21px] rounded-[10px] bg-primary uppercase text-white py-[6px] px-[10px] md:py-[4px] xl:py-[8px] md:px-[7px]"
                    
                  >
                    {priceInHryvnia} грн
                  </div>
                </div>
              </li>

              <div className="pt-[14px] md:pt-[7px] xl:pt-[10px]">
                <div className="md:grid md:grid-cols-2 gap-2">
                  {Object.entries(product.properties).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-center md:justify-start "
                    >
                      <span className="font-semibold text-[15px] xl:text-[18px] leading-[16.5px] xl:leading-[22px] first-letter:uppercase ">
                        {key}:
                      </span>
                      <span className="ml-1 text-[15px] xl:text-[18px] leading-[16.5px] xl:leading-[22px]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <li className="pt-[14px] md:pt-[16px] text-[15px] leading-[19px]  xl:text-[18px]  xl:leading-[22px]">
                {" "}
                {product.description}
              </li>
            </ul>

            <div className="flex items-start gap-[10px] md:gap-[16px] pt-[12px] md:pt-5 relative z-10 ">
              <button
                className="primary-button bg-primary text-[15px] xl:text-[18px] md:tracking-[1.5px] xl:tracking-[1.8px] uppercase"
                onClick={addToCardHandler}
              >
                Купити
              </button>

              <button
              className="rounded-[10px] bg-secondary"
                
                onClick={() => toggleWishlist(product._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[52px] h-[40px] md:h-[48px] xl:h-[52px]"
                  viewBox="0 0 53 40"
                  fill="none"
                >
                  <path
                    d="M0.900391 10C0.900391 4.47715 5.37754 0 10.9004 0H42.9004C48.4232 0 52.9004 4.47715 52.9004 10V30C52.9004 35.5228 48.4232 40 42.9004 40H10.9004C5.37754 40 0.900391 35.5228 0.900391 30V10Z"
                    fill="#FFCD05"
                  />
                  <path
                    d="M20.362 10.5194C21.2849 10.5194 22.1842 10.847 23.4147 11.5897C23.5567 11.6771 24.4323 12.2669 25.0239 12.6601C25.8522 13.2062 25.9713 13.321 26.6955 13.4312C26.6955 13.4312 27.0501 13.4787 27.2764 13.4312C27.5027 13.3838 27.6143 13.3651 27.8342 13.271C28.0541 13.1768 28.6611 12.7627 28.6611 12.7627C30.436 11.321 32.3599 10.6067 34.0637 10.6067C34.6317 10.6067 35.1523 10.6941 35.6256 10.8907C37.5187 11.6334 38.6783 13.5557 38.3943 15.478C38.3706 15.7183 38.2996 15.9367 38.2287 16.1551C37.6134 17.9027 36.1225 19.4318 34.5607 21.0701C34.2294 21.3977 33.9217 21.7254 33.6141 22.0531C31.5316 24.2811 29.2362 26.4437 26.9644 28.5407C26.2781 27.8854 25.5445 27.1864 24.7399 26.4C22.3735 24.0846 19.8887 21.5725 17.6879 18.973L17.4986 18.7546C16.3864 17.4221 15.4161 16.2862 15.3688 15.0193C15.2978 13.1843 16.7413 11.415 18.8948 10.7378C19.4154 10.5631 19.9124 10.4975 20.362 10.4975M20.362 8.33496C19.6521 8.33496 18.9185 8.44418 18.1375 8.70631C15.1795 9.62376 12.9077 12.1577 13.0024 15.1066C13.0734 17.1818 14.5169 18.7764 15.8421 20.3274C18.0902 22.9705 20.5513 25.4607 23.0361 27.9073C24.3376 29.1742 25.6392 30.4412 26.9644 31.6645C29.8514 28.9995 32.7622 26.3563 35.4126 23.5166C37.3057 21.5069 39.5539 19.4536 40.4768 16.8542C40.5951 16.5047 40.6898 16.1333 40.7371 15.7838C41.163 12.9222 39.4355 10.0388 36.5485 8.88106C35.7439 8.57525 34.9156 8.42234 34.0637 8.42234C31.4843 8.42234 28.8339 9.73298 26.9644 11.2621C26.9644 11.2621 24.8819 9.88589 24.7399 9.77667C23.2727 8.88106 21.9002 8.33496 20.362 8.33496Z"
                    fill={isWished[product._id] ? "#3ACCE9" : "white"}
                  />
                  <path
                    d="M20.362 10.5194C21.2849 10.5194 22.1842 10.847 23.4147 11.5897C23.5567 11.6771 24.4323 12.2669 25.0239 12.6601C25.8522 13.2062 25.9713 13.321 26.6955 13.4312C26.6955 13.4312 27.0501 13.4787 27.2764 13.4312C27.5027 13.3838 27.6143 13.3651 27.8342 13.271C28.0541 13.1768 28.6611 12.7627 28.6611 12.7627C30.436 11.321 32.3599 10.6067 34.0637 10.6067C34.6317 10.6067 35.1523 10.6941 35.6256 10.8907C37.5187 11.6334 38.6783 13.5557 38.3943 15.478C38.3706 15.7183 38.2996 15.9367 38.2287 16.1551C37.6134 17.9027 36.1225 19.4318 34.5607 21.0701C34.2294 21.3977 33.9217 21.7254 33.6141 22.0531C31.5316 24.2811 29.2362 26.4437 26.9644 28.5407C26.2781 27.8854 25.5445 27.1864 24.7399 26.4C22.3735 24.0846 19.8887 21.5725 17.6879 18.973L17.4986 18.7546C16.3864 17.4221 15.4161 16.2862 15.3688 15.0193C15.2978 13.1843 16.7413 11.415 18.8948 10.7378C19.4154 10.5631 19.9124 10.4975 20.362 10.4975M20.362 8.33496C19.6521 8.33496 18.9185 8.44418 18.1375 8.70631C15.1795 9.62376 12.9077 12.1577 13.0024 15.1066C13.0734 17.1818 14.5169 18.7764 15.8421 20.3274C18.0902 22.9705 20.5513 25.4607 23.0361 27.9073C24.3376 29.1742 25.6392 30.4412 26.9644 31.6645C29.8514 28.9995 32.7622 26.3563 35.4126 23.5166C37.3057 21.5069 39.5539 19.4536 40.4768 16.8542C40.5951 16.5047 40.6898 16.1333 40.7371 15.7838C41.163 12.9222 39.4355 10.0388 36.5485 8.88106C35.7439 8.57525 34.9156 8.42234 34.0637 8.42234C31.4843 8.42234 28.8339 9.73298 26.9644 11.2621C26.9644 11.2621 24.8819 9.88589 24.7399 9.77667C23.2727 8.88106 21.9002 8.33496 20.362 8.33496Z"
                    stroke={isWished[product._id] ? "#3ACCE9" : "white"}
                  />
                </svg>

                
              </button>
            </div>
          </div>
        </div>
      </div>
      {isClient && (
        <div className="footer-image-wrapper">
          <Image
            src={imageSrc}
            alt="uzor"
            width={1900}
            height={253}
            className=" absolute left-0 bottom-0 z-0 "
            priority={true}
          />
        </div>
      )}
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
