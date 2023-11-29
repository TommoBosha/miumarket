import React from 'react';
import styled from 'styled-components';
import ProductBox from './ProductBox';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: black;
  gap: 35px;
  margin-bottom: 38px ;
  

`;

export default function NewProducts({ products }) {
    return (
        <ProductsGrid>
            {products?.length > 0 && products.map(product => (
                <ProductBox key={product._id}{...product} />
            ))}
        </ProductsGrid>


    );
}

