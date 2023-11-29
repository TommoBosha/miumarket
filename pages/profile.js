import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import Tabs from '../components/Tabs';
import SingleOrder from '../components/SingleOrder';
import ProductBox from '../components/ProductBox';
import Spinner from '../components/Spinner';
import Link from 'next/link';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ProfileScreen() {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [addressLoaded, setAddressLoaded] = useState(true);
    const [wishlistLoaded, setWishlistLoaded] = useState(true);
    const [orderLoaded, setOrderLoaded] = useState(true);
    const [wishedProducts, setWishedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('Замовлення');
    const [orders, setOrders] = useState([]);
    const [phoneError, setPhoneError] = useState('');


    function saveAddress() {
        const data = { name, email, phone, city, streetAddress, postalCode, country };
        axios.put('/api/address', data);
    }

    useEffect(() => {
        if (!session) {
            return;
        }
        setAddressLoaded(false);
        setWishlistLoaded(false);
        setOrderLoaded(false);
        axios.get('/api/address').then(response => {
            console.log(response.data)
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
        axios.get('/api/wishlist').then(response => {
            setWishedProducts(response.data.map(wp => wp.product));
            setWishlistLoaded(true);
        });
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            setOrderLoaded(true);
        });
    }, [session]);

    function productRemovedFromWishlist(idToRemove) {
        setWishedProducts(products => {
            return [...products.filter(p => p._id.toString() !== idToRemove)];
        })
    }



    return (
        <Layout>
            <div className='grid grid-cols-2 gap-10 my-10  '>
                <div className='p-8 bg-white border-spacing-2'>
                    <h2> Деталі профіля</h2>
                    {!addressLoaded && (
                        <Spinner fullWidth={true} />
                    )}
                    {addressLoaded && session && (
                        <>
                            <Input type="text"
                                placeholder="Ім'я"
                                value={name}
                                name="name"
                                onChange={ev => setName(ev.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)} />
                            <Input type="text"
                                placeholder="Телефон"
                                value={phone}
                                name="phone"
                                onChange={ev => setPhone(ev.target.value)} />
                            {phoneError && <p className="text-red-500">{phoneError}</p>}
                            <div className='flex gap-1'>
                                <Input type="text"
                                    placeholder="Місто"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)} />
                                <Input type="text"
                                    placeholder="Індекс"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)} />
                            </div>
                            <Input type="text"
                                placeholder="Вулиця"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)} />
                            <Input type="text"
                                placeholder="Країна"
                                value={country}
                                name="country"
                                onChange={ev => setCountry(ev.target.value)} />
                            <Button black block
                                onClick={saveAddress}>
                                Зберегти
                            </Button>
                            <hr />
                        </>
                    )}

                </div>

                <div className='p-8 bg-white border-spacing-2'>
                    <Tabs
                        tabs={['Замовлення', 'Улюблене']}
                        active={activeTab}
                        onChange={setActiveTab}
                    />

                    {activeTab === 'Замовлення' && (
                        <>
                            {!orderLoaded && (
                                <Spinner fullWidth={true} />
                            )}
                            {orderLoaded && (
                                <div>
                                    {orders.length === 0 && (
                                        <p>Login to see your orders</p>
                                    )}
                                    {orders.length > 0 && orders.map((o, index) => (
                                        <Link key={index} href={`/order/${o._id}`}>
                                            <SingleOrder {...o} />
                                        </Link>

                                    ))}
                                </div>
                            )}
                        </>
                    )}
                    {activeTab === 'Улюблене' && (
                        <>
                            {!wishlistLoaded && (
                                <Spinner fullWidth={true} />
                            )}
                            {wishlistLoaded && (
                                <>
                                    <div className="grid grid-cols-2 gap-10">
                                        {wishedProducts.length > 0 && wishedProducts.map(wp => (
                                            <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                                        ))}
                                    </div>
                                    {wishedProducts.length === 0 && (
                                        <>
                                            {session && (
                                                <p>Your wishlist is empty</p>
                                            )}
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


            </div>

        </Layout>
    )
}
