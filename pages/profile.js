import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import axios from "axios";
import Tabs from "../components/Tabs";
import SingleOrder from "../components/SingleOrder";
import Spinner from "../components/Spinner";
import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { mongooseConnect } from "../lib/mongoose";
import { Currency } from "../models/Currency";
import FavoriteItem from "../components/FavoriteItem";

export default function ProfileScreen({ latestCurrency }) {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Профіль");
  const [orders, setOrders] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [phoneError] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";

  function saveAddress() {
    const data = {
      name,
      email,
      phone,
      city,
      streetAddress,
      postalCode,
      country,
    };
    axios.put("/api/address", data);
  }

  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);
    axios.get("/api/address").then((response) => {
      if (response.data?.name) {
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setCity(response.data.city);
        setPostalCode(response.data.postalCode);
        setStreetAddress(response.data.streetAddress);
        setCountry(response.data.country);
      }
      setAddressLoaded(true);
    });
    axios.get("/api/wishlist").then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishlistLoaded(true);
    });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
    setIsClient(true);
  }, [session]);

  function productRemovedFromWishlist(productId) {
    axios
      .delete(`/api/wishlist`, { data: { productId } })
      .then((response) => {
        setWishedProducts((currentProducts) =>
          currentProducts.filter((product) => product._id !== productId)
        );
        console.log("Product removed from wishlist:", response.data);
      })
      .catch((error) => {
        console.error("Error removing product from wishlist:", error);
      });
  }

  return (
    <Layout>
      <div className="bg-graybg  ">
        <div className="container md:max-w-[780px] xl:max-w-[1280px] xxl:max-w-[1440px] relative z-10 pb-[22px] md:pb-[25px] xl:pb-[32px]">
          <Tabs
            tabs={["Профіль", "Замовлення", "Улюблені"]}
            active={activeTab}
            onChange={setActiveTab}
            className=" "
          />

          {activeTab === "Профіль" && (
            <>
              <div className="w-full max-w-xxl mx-auto  relative z-10">
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && (
                  <>
                    <Input
                      type="text"
                      placeholder="Ім'я"
                      value={name}
                      name="name"
                      label="Ім'я"
                      id="name"
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="email@example.com"
                      value={email}
                      name="email"
                      label="Email"
                      id="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="+380999999999"
                      value={phone}
                      name="phone"
                      label="Телефон"
                      id="phone"
                      onChange={(ev) => setPhone(ev.target.value)}
                    />
                    {phoneError && <p className="text-red-500">{phoneError}</p>}
                    <div className="flex gap-1 md:flex-col">
                      <Input
                        type="text"
                        placeholder="Місто"
                        value={city}
                        name="city"
                        label="Місто"
                        id="city"
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="04000"
                        value={postalCode}
                        name="postalCode"
                        label="Індекс"
                        id="postalCode"
                        onChange={(ev) => setPostalCode(ev.target.value)}
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="Вулиця"
                      value={streetAddress}
                      name="streetAddress"
                      label="Вулиця"
                      id="streetAddress"
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Країна"
                      value={country}
                      name="country"
                      label="Країна"
                      id="country"
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                    <div className="flex  justify-center items-center">
                      <Button
                        className=" flex flex-row items-center gap-[10px] font-normal rounded-[10px] bg-primary hover:bg-white py-2 px-4  uppercase text-[15px] md:text-[18px] md:tracking-[1.8px] focus:outline-none focus:shadow-outline "
                        onClick={saveAddress}
                      >
                        Зберегти
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "Замовлення" && (
            <>
              {!orderLoaded && <Spinner fullWidth={true} />}
              {orderLoaded && (
                <div className="max-w-xxl mx-auto ">
                  {orders.length === 0 && <p>У вас поки немає замовлень</p>}
                  {orders.length > 0 &&
                    orders.map((o, index) => (
                      <Link key={index} href={`/order/${o._id}`}>
                        <SingleOrder {...o} />
                      </Link>
                    ))}
                </div>
              )}

              <div className="flex justify-center items-center pt-[6px] md:pt-[6px] xl:pt-[19px] ">
                <Link href="/catalog" className="primary-button placeorder ">
                  продовжити покупки
                </Link>
              </div>
            </>
          )}
          {activeTab === "Улюблені" && (
            <>
              {!wishlistLoaded && <Spinner fullWidth={true} />}
              {wishlistLoaded && (
                <>
                  <div className="max-w-xxl mx-auto grid grid-cols-2  md:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-4   gap-3 md:gap-[10px] xl:gap-[16px] pt-[18px] md:pt-[20px] xl:pt-[30px]">
                    {wishedProducts.length > 0 &&
                      wishedProducts.map((wp) => {
                        const priceInDollars = wp.price;
                        const exchangeRate = latestCurrency.currency;

                        const priceInHryvnia = priceInDollars * exchangeRate;
                        return (
                          <FavoriteItem
                            key={wp._id}
                            {...wp}
                            wished={true}
                            priceInHryvnia={priceInHryvnia}
                            productRemovedFromWishlist={() =>
                              productRemovedFromWishlist(wp._id)
                            }
                            className=''
                          />
                        );
                      })}
                  </div>
                  {wishedProducts.length === 0 && (
                    <>
                      {session && <p>Your wishlist is empty</p>}
                      {!session && (
                        <p>Login to add products to your wishlist</p>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {isClient && (
          <div className="footer-image-wrapper">
            <Image
              src={imageSrc}
              alt="uzor"
              width={1900}
              height={253}
              className=" absolute left-0 bottom-0 "
              priority={true}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await mongooseConnect();
  const latestCurrency = await Currency.findOne().sort({ currency: -1 });

  return {
    props: {
      latestCurrency: JSON.parse(JSON.stringify(latestCurrency)),
    },
  };
}
