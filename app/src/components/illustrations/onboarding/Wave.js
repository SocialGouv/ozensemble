import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ currentIndex, size }) {
  switch (currentIndex) {
    case 0:
      return (
        <Svg
          width={size}
          height={Math.ceil((212 / 375) * size)}
          viewBox="0 0 375 212"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M211.049 6.252C101.525-5.814 94.682 3.925 0 9v202.504h375V24.376c-47.435-1.274-82.259-9.123-163.951-18.124z"
            fill="#6D62B6"
          />
          <Path
            d="M373 63.97c-78.97 10.649-163.365-6.514-233.5-14.5C98.136 44.759 32 68.5 0 73v138.504h375V63.714c-.669.08-1.335.166-2 .256z"
            fill="#E0DEF0"
          />
        </Svg>
      );
    case 1:
      return (
        <Svg
          width={size}
          height={Math.ceil((203 / 375) * size)}
          viewBox="0 0 375 203"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M375 19.472C230.982 43.916 218.954-15.008 132.823 3.755 88.389 13.435 45.489 16.425 0 15.379v187.612L375 203V19.472z"
            fill="#6D62B6"
          />
          <Path
            d="M286.119 69.194c-63.416-21-94.484-35.236-165.28-23.696-19.473 3.174-91.878 6-120.839 9.201v148.292L375 203V78.198c-18.687 2.93-42.096 6.488-88.881-9.004z"
            fill="#E0DEF0"
          />
        </Svg>
      );
    case 2:
      return (
        <Svg
          width={size}
          height={Math.ceil((221 / 375) * size)}
          viewBox="0 0 375 221"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M375 0c-78.191 7.02-103.39 28.366-213.5 28.366C90.837 28.366 52 28 0 37.5V221h375V0z"
            fill="#6D62B6"
          />
          <Path
            d="M195 67.919c-61-14.245-109.974 0-109.974 0S48.5 84.5 0 96.162V221h375V74.928c-55.335 5.392-133.518 3.845-180-7.01z"
            fill="#E0DEF0"
          />
        </Svg>
      );
    case 3:
      return (
        <Svg
          width={size}
          height={Math.ceil((274 / 375) * size)}
          viewBox="0 0 375 274"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M335 15.638C237.5 48.135 183.101 11.736 20 48.5c-4.372.986-9 2-20 3.5v221l375 .485V0c-13.212 5.863-26.634 11.183-40 15.638z"
            fill="#6D62B6"
          />
          <Path
            d="M190.512 122.336C161.292 122.336 122 115.664 77 119s-51 5.062-77 8v146l375 .485V82.457c-24.616 7.629-44.486 13.977-55.962 18.004-59.737 20.964-128.526 21.875-128.526 21.875z"
            fill="#E0DEF0"
          />
        </Svg>
      );

    default:
      return (
        <Svg
          width={size}
          height={Math.ceil((206 / 375) * size)}
          viewBox="0 0 375 206"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M286.5 4.001c-106.965 4.834-102.835.391-191.51 21.177C50.565 35.592 19.772 50.858.102 63.501V204.92L375 204.701V.785c-23.025.221-48.908 1.427-88.5 3.216z"
            fill="#6D62B6"
          />
          <Path
            d="M359 67.5c-71.5 9-155.801 0-155.801 0S93 66.5 0 111.998v93c147.906.076 267.442.087 375 .069V65.848c-5.276.429-10.607.972-16 1.651z"
            fill="#E0DEF0"
          />
        </Svg>
      );
  }
}

export default SvgComponent;
