import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Product from '../models/Product'
import PageSlide from '../components/PageSlide';
import slidesData from '../utils/slideData';
import SocialMedia from '../components/SocialMedia';
import { mongooseConnect } from '../lib/mongoose';
import NewProducts from '../components/NewProducts';
import styled from 'styled-components';
import Link from 'next/link';
import AboutUs from '../components/AboutUs';
import Sales from '../components/Sales';

const slides = [
  '1',
  '2-2',
  '3'
];

const ButtonStyle = styled.button`
  width: 144px;
  height: 69px;
  background: ${props => (props.active === 'true' ? '#3ACCE9' : 'black')};
  color: white; 
  border: none; 
  cursor: pointer; 
  text-transform: uppercase;
 
  
  &:hover {
    background: #3ACCE9; 
  }
`;

const ButtonCatalogStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 46px;
  background: #FFCD05;
  color: black; 
  border: none; 
  cursor: pointer; 
  text-transform: uppercase;
  margin: 0 auto 35px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1.8px;
  gap: 5px;
  
  &:hover {
    background: #3ACCE9; 
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
 align-items: center;
  margin: 36px auto; 
  gap: 35px;
`;

export default function Home({ productsNew, productsTop, productsSale, productsAll }) {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentSlideDirection, setCurrentSlideDirection] = useState('left');
  const [activeCategory, setActiveCategory] = useState('productsAll');

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

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };


  return (
    <div >
      <Layout title="HomePage">
        <PageSlide

          name={slides[currentSlideIndex]}
          direction={currentSlideDirection}
          slidesData={slidesData}
        />
        <div className=' m-auto' style={{ width: '1040px' }}>
          <ButtonsWrapper >
            <ButtonStyle
              active={activeCategory === 'productsAll' ? 'true' : 'false'}
              onClick={() => handleCategoryChange('productsAll')}
            >
              Всі
            </ButtonStyle>
            <ButtonStyle
              active={activeCategory === 'productsNew' ? 'true' : 'false'}
              onClick={() => handleCategoryChange('productsNew')}
            >
              New
            </ButtonStyle>
            <ButtonStyle
              active={activeCategory === 'productsTop' ? 'true' : 'false'}
              onClick={() => handleCategoryChange('productsTop')}
            >
              Top
            </ButtonStyle>
            <ButtonStyle
              active={activeCategory === 'productsSale' ? 'true' : 'false'}
              onClick={() => handleCategoryChange('productsSale')}
            >
              Sale
            </ButtonStyle>
          </ButtonsWrapper>


          {activeCategory === 'productsAll' && (
            <NewProducts products={productsAll} key={productsAll} />
          )}
          {activeCategory === 'productsNew' && (
            <NewProducts products={productsNew} key={productsNew.slug} />
          )}
          {activeCategory === 'productsTop' && (
            <NewProducts products={productsTop} key={productsTop.slug} />
          )}
          {activeCategory === 'productsSale' && (
            <NewProducts products={productsSale} key={productsSale.slug} />
          )}

          <ButtonCatalogStyle href={`/catalog/${activeCategory}`}>
            Всі товари <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
              <path d="M1.93164 6.84119C1.37936 6.84119 0.931641 7.2889 0.931641 7.84119C0.931641 8.39347 1.37936 8.84119 1.93164 8.84119L1.93164 6.84119ZM22.6387 8.54829C23.0293 8.15777 23.0293 7.5246 22.6387 7.13408L16.2748 0.770119C15.8843 0.379594 15.2511 0.379594 14.8606 0.770119C14.47 1.16064 14.47 1.79381 14.8606 2.18433L20.5174 7.84119L14.8606 13.498C14.47 13.8886 14.47 14.5217 14.8606 14.9123C15.2511 15.3028 15.8843 15.3028 16.2748 14.9123L22.6387 8.54829ZM1.93164 8.84119L21.9316 8.84119V6.84119L1.93164 6.84119L1.93164 8.84119Z" fill="black" />
            </svg>
          </ButtonCatalogStyle>
        </div>

        <Sales />
        <section id="about">
          <AboutUs />
        </section>


        <div  >
          <SocialMedia />

        </div>

      </Layout>


    </div>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const productsNew = await Product.find({ tag: 'New' }, null, { sort: { 'tag': -1 }, limit: 6 });
  const productsTop = await Product.find({ tag: 'Top' }, null, { sort: { 'tag': -1 }, limit: 6 });
  const productsSale = await Product.find({ tag: 'Sale' }, null, { sort: { 'tag': -1 }, limit: 6 });
  const productsAll = await Product.find({}, null, { sort: { '_id': -1 }, limit: 6 });
  return {
    props: {
      productsNew: JSON.parse(JSON.stringify(productsNew)),
      productsTop: JSON.parse(JSON.stringify(productsTop)),
      productsSale: JSON.parse(JSON.stringify(productsSale)),
      productsAll: JSON.parse(JSON.stringify(productsAll)),
    }
  }
}