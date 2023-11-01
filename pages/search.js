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




