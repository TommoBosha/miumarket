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
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import HeartIcon from "../../components/HeartIcon";
import CartIcon from "../../components/CartIcon";
import Pagination from "../../components/Pagination";

export default function CategoryPage({
  products,
  parentCategories,
  productCounts,
  latestCurrency,
  wished,
}) {
  const router = useRouter();
  const { category } = router.query;
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [isWished, setWished] = useState(wished);
  const { data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const productsToDisplay = isFiltered ? filteredProducts : products;
  const currentItems = productsToDisplay.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
    setCurrentPage(1);
  }, [session, category]);

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
      <div className=" container xxl:max-w-[1440px] pb-[20px] md:pb-[57px] xl:pb-[42px] ">
        <div className="md:grid md:grid-cols-category xl:grid-cols-categoryxl md:gap-[20px] xl:gap-[50px]">
          <div className="relative z-20">
            <Filter
              router={router}
              latestCurrency={latestCurrency}
              products={products}
              productCounts={productCounts}
              parentCategories={parentCategories}
              setFilteredProducts={setFilteredProducts}
              setIsFiltered={setIsFiltered}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="relative z-20">
            
              {currentItems.length === 0 ? (
                <div className="text-center p-5">
                  Товари за обраними критеріями не знайдено
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:auto-rows-catalog xl:auto-rows-catalogxl xxl:auto-rows-catalogxxl gap-3 md:gap-[10px] xl:gap-[16px] pt-[18px] md:pt-[20px] xl:pt-[30px]">
                
                {currentItems.map((product) => {
                  const priceInDollars = product.price;
                  const exchangeRate = latestCurrency.currency;

                  const priceInHryvnia = priceInDollars * exchangeRate;

                  return (
                    <div
                      key={product._id}
                      className=" relative z-20 xxl:w-[238px] xxl:h-[238px] "
                    >
                      <Link href={"/product/" + product.slug}>
                        <div
                          className="absolute  top-0 left-0 right-0 bottom-0 z-10 xxl:w-[238px] xxl:h-[238px]"
                          style={{
                            background:
                              "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.40) 20%), linear-gradient(180deg, rgba(180, 180, 180, 0.00) 20.31%, rgba(51, 51, 51, 0.80) 100%)",
                          }}
                        ></div>
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className=" object-fill"
                        />
                        <div className="">
                          <h2 className="absolute z-20 bottom-[21px] md:bottom-[16px] xl:bottom-[4px]  left-[4px] xl:left-[7px] w-[128px]  xl:w-[146px]  text-[12px]  xl:text-[13px]  uppercase text-white">
                            {product.title}
                          </h2>
                          <p className="absolute z-20 bottom-[6px] xl:bottom-[10px]  left-[4px] xl:left-[132px] xxl:left-[170px]  text-[12px] xl:text-[13px] leading-[6px] font-bold uppercase text-primary">
                            {priceInHryvnia} грн
                          </p>
                        </div>
                      </Link>
                      <div className=" ">
                        <button
                          onClick={() => toggleWishlist(product._id)}
                          className="absolute z-20 bottom-[0px] xl:bottom-[100px]  right-[22px] xl:right-0 xl:left-[4px] xl:top-[-75px] xxl:top-[-100px] "
                        >
                          <HeartIcon isWished={isWished} product={product} />
                        </button>

                        <button
                          className=" absolute z-20 bottom-[1px] xl:bottom-[100px]  right-1 xl:top-[-75px] xxl:top-[-100px]"
                          onClick={() => addToCardHandler(product._id)}
                        >
                          <CartIcon />
                        </button>
                      </div>
                    </div>
                  );
                })}
                </div>
              )}
            
            <div className="pt-[18px] md:pt-[12px] xl:pt-[40px] mx-auto  ">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={
                  isFiltered ? filteredProducts.length : products.length
                }
                paginate={setCurrentPage}
                currentPage={currentPage}
              />
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

  const { category } = context.query;
  const latestCurrency = await Currency.findOne().sort({ currency: -1 });
  const wished = await WishedProduct.find({});
  const productCounts = await getProductCountsByCategory();
  const parentCategoriesData = await Category.find({
    parent: { $exists: false },
  });
  const parentCategories = await Promise.all(
    parentCategoriesData.map(async (category) => {
      const children = await Category.find({ parent: category._id });
      return {
        ...category.toObject(),
        children: children.map((child) => child.toObject()),
      };
    })
  );

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

    const categoryIds = [
      ...childCategories.map((childCategory) => childCategory._id),
      category,
    ];

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
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  const parentCounts = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    { $unwind: "$categoryData" },
    { $group: { _id: "$categoryData.parent", count: { $sum: 1 } } },
  ]);

  const combinedCounts = [...childCounts, ...parentCounts];

  return combinedCounts;
};
