/* eslint-disable @next/next/no-img-element */
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';


const DEFAULT_OFFSET = 180;

const BackgroundScrollAnimation = (direction = 'left') => {
  const directions = {
    left: { from: '0 0', to: `-${DEFAULT_OFFSET}px 0` },
    right: { from: `-${DEFAULT_OFFSET}px 0`, to: '0 0' },
  };

  const currentDirection = directions[direction];

  return keyframes`
    from {
      background-position: ${currentDirection.from};
    }
    to {
      background-position: ${currentDirection.to};
    }
  `;
};

export const BackgroundContainer = styled(motion.div)`
  height: 450px;
  width: 100%;
  min-height: 100%;
  padding: 3.5%;
 object-fit: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: calc(180px + 100%) 83%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: ${({ background }) => `url(${background})`};
  background-position: center center;
  ${({ direction }) =>
    css`
      animation: ${BackgroundScrollAnimation(direction)} 20s linear 1;
    `}
  animation-fill-mode: forwards;
  
`;

export const Picture = styled(motion.picture)`
  position: relative;
  width: 100%;
   height: 350px;
  max-width: 40%;

  & img {
    width: 100%;
     height: 350px;
    object-fit: contain;
  }
`;

const PageSlide = ({ name, direction = 'right', slidesData }) => {

  const slide = slidesData.find((slideData) => slideData.name === name);
  const { background, logo } = slide || {};

  return (
    <BackgroundContainer
      background={background}
      direction={direction}
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={{
        hidden: {
          opacity: 0,
        },
        show: {
          opacity: 1,
        },
      }}
      transition={{
        delayChildren: 2,
        opacity: { duration: 2, ease: 'linear' },
      }}
    >
      <Picture
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
      >
        <source srcSet={logo} type="image/png" title={`${name} logo`} />
        <img src={logo} alt={`${name} logo`} />
      </Picture>
    </BackgroundContainer>
  );
};

export default PageSlide;