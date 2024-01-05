import React from 'react';
import ProductBox from './ProductBox';




export default function NewProducts({ products }) {

    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 text-black gap-4 md:gap-[22px] xl:gap-[34px] mb-[25px] md:mb-5 xl:mb-[35px] `}>
            {products?.length > 0 && products.map(product => (
                <ProductBox key={product._id}{...product} />
            ))}
        </div>


    );
}

