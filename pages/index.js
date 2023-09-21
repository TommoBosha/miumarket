import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../models/Product'
import db from '../utils/db'
import { Store } from '../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageSlide from '../components/PageSlide';
import slidesData from '../utils/slideData';
// import { Carousel } from 'react-responsive-carousel'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'

const slides = [
  '1',
  '2-2',
  '3'
];

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentSlideDirection, setCurrentSlideDirection] = useState('left');

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
      const direction = currentSlideDirection === 'left' ? 'right' : 'left';

      setCurrentSlideIndex(nextIndex);
      setCurrentSlideDirection(direction);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlideIndex, currentSlideDirection]);


  const addToCardHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Пробачте, товар закінчівся')
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })

  }
  return (
    <div >
      <Layout title="HomePage">
        <PageSlide

          name={slides[currentSlideIndex]}
          direction={currentSlideDirection}
          slidesData={slidesData}
        />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-12 mx-48'>
          {products.map((product) => (
            <ProductItem product={product} key={product.slug}
              addToCardHandler={addToCardHandler}
            ></ProductItem>
          ))}

        </div>
      </Layout>


    </div>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}