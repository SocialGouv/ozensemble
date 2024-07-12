import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SuperUserHeart({ fill }) {
  return (
    <Svg width={75} height={90} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        fill={fill}
        d="M33.695.13C9.99 2.39-5.59 26.184 1.887 48.702c4.701 14.124 17.057 23.95 31.92 25.338l2.865.27V90l13.9-13.878c7.633-7.633 14.482-14.594 15.176-15.444 7.834-9.469 10.453-22.362 6.939-34.18C69.083 14.41 59.145 4.628 47.125 1.36 42.827.219 37.768-.251 33.695.13Zm-1.68 22.383c1.5.47 2.843 1.299 4.254 2.642l.828.783 1.276-1.141c2.283-2.037 4.544-2.843 7.543-2.687 2.395.112 4.32.985 6.178 2.754 3.425 3.268 4.118 8.55 1.634 12.624-.537.895-3.402 3.984-8.394 9.088-6.424 6.536-7.678 7.722-8.215 7.722-.537 0-1.79-1.186-8.215-7.722-4.969-5.081-7.856-8.193-8.393-9.088-.85-1.41-1.522-3.738-1.522-5.327 0-4.365 3.021-8.439 7.274-9.782 1.388-.448 4.096-.38 5.753.134Z"
      />
    </Svg>
  );
}

export default SuperUserHeart;
