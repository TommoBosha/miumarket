import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Product from '../models/Product'
// import PageSlide from '../components/PageSlide';
// import slidesData from '../utils/slideData';
import SocialMedia from '../components/SocialMedia';
import { mongooseConnect } from '../lib/mongoose';
import NewProducts from '../components/NewProducts';
import Link from 'next/link';
import AboutUs from '../components/AboutUs';
import Sales from '../components/Sales';
import HeroSlider from '../components/HeroSlider';

const slides = [
  '1',
  '2-2',
  '3'
];

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
        {/* <PageSlide

          name={slides[currentSlideIndex]}
          direction={currentSlideDirection}
          slidesData={slidesData}
        /> */}
        <div className='xl:max-w-[1440px]'>
        <HeroSlider/>
        </div>
        
        <div className=' container xl:max-w-[1282px]' >
       
          <div className='flex justify-center items-center mt-6 md:mt-5 xl:mt-10 mb-[22px] md:mb-5 xl:mb-[38px] gap-[6px] md:gap-[22px] xl:gap-[34px]' >
            <button className={`w-[78px] md:w-[96px] xl:w-[144px] h-10 md:h-12 xl:h-[52px] text-white border-none rounded-[16px] cursor-pointer text-[15px] xl:text-[18px] leading-normal xl:leading-[18px]  uppercase hover:bg-primary bg-${activeCategory === 'productsAll' ? 'primary' : 'black'}`} 
        
              onClick={() => handleCategoryChange('productsAll')}
            >
              Всі
            </button>
            <button className={`w-[78px] md:w-[96px] xl:w-[144px] h-10 md:h-12 xl:h-[52px] text-white border-none rounded-[16px] cursor-pointer text-[15px] xl:text-[18px] leading-normal xl:leading-[18px]  uppercase hover:bg-primary bg-${activeCategory === 'productsNew' ? 'primary' : 'black'}`} 
              
              onClick={() => handleCategoryChange('productsNew')}
            >
              New
            </button>
            <button className={`w-[78px] md:w-[96px] xl:w-[144px] h-10 md:h-12 xl:h-[52px] text-white border-none rounded-[16px] cursor-pointer text-[15px] xl:text-[18px] leading-normal xl:leading-[18px]  uppercase hover:bg-primary bg-${activeCategory === 'productsTop' ? 'primary' : 'black'}`} 
             
              onClick={() => handleCategoryChange('productsTop')}
            >
              Tоп
            </button>
            <button className={`w-[78px] md:w-[96px] xl:w-[144px] h-10 md:h-12 xl:h-[52px] text-white border-none rounded-[16px] cursor-pointer text-[15px] xl:text-[18px] leading-normal xl:leading-[18px]  uppercase hover:bg-primary bg-${activeCategory === 'productsSale' ? 'primary' : 'black'}`} 
             
              onClick={() => handleCategoryChange('productsSale')}
            >
              Знижка
            </button>
          </div>


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

          <Link className='flex justify-center items-center w-[143px] md:w-[214px] xl:w-[206px] h-10 md:h-12 xl:h-[52px] bg-secondary text-black border-none rounded-[16px] cursor-pointer uppercase mx-auto mb-[25px] md:mb-5 xl:mb-[35px] gap-[5px] text-[15px] md:text-[18px] leading-normal md:leading-[1.8px] hover:bg-primary '
           href={`/catalog/${activeCategory}`}>
            Всі товари <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
              <path d="M1.93164 6.84119C1.37936 6.84119 0.931641 7.2889 0.931641 7.84119C0.931641 8.39347 1.37936 8.84119 1.93164 8.84119L1.93164 6.84119ZM22.6387 8.54829C23.0293 8.15777 23.0293 7.5246 22.6387 7.13408L16.2748 0.770119C15.8843 0.379594 15.2511 0.379594 14.8606 0.770119C14.47 1.16064 14.47 1.79381 14.8606 2.18433L20.5174 7.84119L14.8606 13.498C14.47 13.8886 14.47 14.5217 14.8606 14.9123C15.2511 15.3028 15.8843 15.3028 16.2748 14.9123L22.6387 8.54829ZM1.93164 8.84119L21.9316 8.84119V6.84119L1.93164 6.84119L1.93164 8.84119Z" fill="black" />
            </svg>
          </Link>
        </div>

        <Sales />
        <section id="about" className='container xl:max-w-[1282px]'>
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