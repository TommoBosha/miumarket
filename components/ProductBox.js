import styled from "styled-components";
import Link from "next/link";

const ProductWrapper = styled.div`
  position: relative;
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;

const WhiteBox = styled(Link)`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

`;

const ImageOverlay = styled.div`
  background: linear-gradient(
    180deg,
    rgba(180, 180, 180, 0.00) 20.31%,
    #333 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 2px;
  
   
  
  
`;

const Image = styled.img`
  width: 324px;
  height: 324px;
  position: relative; 
  z-index: 0; 
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
  position: absolute;
  bottom: 20px;
  z-index: 2;
  left: 0;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  font-size: 22px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.4px;
  text-transform: uppercase;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

export default function ProductBox({
  title,
  slug,
  images,
}) {
  const url = "/product/" + slug;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <ImageOverlay></ImageOverlay>
        <Image src={images?.[0]} alt="" />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
      </ProductInfoBox>
    </ProductWrapper>
  );
}