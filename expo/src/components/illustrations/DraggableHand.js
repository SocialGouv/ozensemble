import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const DraggableHand = ({ color = "#000", size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40 " {...props}>
    <Path
      d="m12.608 4.928-1.856-2.912c-.192-.288-.576-.384-.864-.192-.288.192-.384.576-.192.864L11.552 5.6c.128.192.32.288.544.288a.729.729 0 0 0 .352-.096c.256-.16.352-.576.16-.864ZM10.272 10.976 7.36 12.832c-.288.192-.384.576-.192.864.128.192.32.288.544.288a.728.728 0 0 0 .352-.096l2.912-1.856c.288-.192.384-.576.192-.864-.192-.288-.576-.352-.896-.192ZM18.4 7.232a.729.729 0 0 0 .352-.096l2.912-1.856c.288-.192.384-.576.192-.864-.192-.288-.576-.384-.864-.192L18.08 6.08c-.288.192-.384.576-.192.864.096.192.288.288.512.288ZM15.2 5.28h.128a.614.614 0 0 0 .608-.512l.768-3.392a.651.651 0 0 0-.48-.768.651.651 0 0 0-.768.48l-.768 3.392a.69.69 0 0 0 .512.8ZM10.08 8.608a.614.614 0 0 0 .608-.512.651.651 0 0 0-.48-.768l-3.36-.704a.651.651 0 0 0-.768.48.651.651 0 0 0 .48.768l3.392.736h.128ZM34.112 26.496c-.096-.416-.096-1.088-.096-1.856 0-2.464.032-6.208-2.816-10.688l-1.728-2.72c-.288-.48-.768-.8-1.312-.928a2.033 2.033 0 0 0-1.6.288s-.032 0-.032.032a2.02 2.02 0 0 0-.672.704 2.18 2.18 0 0 0-.832-.384 2.086 2.086 0 0 0-1.632.288c-.032 0-.032.032-.064.032-.352.256-.64.576-.8.992-.608-.288-1.344-.256-1.984.096-.032 0-.064.032-.096.032-.256.16-.48.384-.64.64L17.056 8.64a2.325 2.325 0 0 0-1.472-1.024c-.608-.128-1.248-.032-1.76.32l-.032.032h-.032c-.512.32-.896.864-1.024 1.472s-.032 1.248.32 1.76l4.672 7.328c-.224.096-.448.256-.672.416-.096.064-.224.16-.352.224a2.551 2.551 0 0 0-1.088 1.536c-.128.64-.032 1.312.32 1.856l1.632 2.56c.032.032.064.096.096.128 1.984 2.72 4.384 3.456 6.048 3.904.448.128.832.256 1.12.384a.29.29 0 0 0 .16.032c.768.16.992.544 1.408 1.248l.16.224c.128.192.32.288.544.288a.73.73 0 0 0 .352-.096c.288-.192.384-.576.192-.864l-.128-.224c-.448-.736-.928-1.536-2.208-1.824-.352-.16-.736-.256-1.216-.384-1.664-.48-3.936-1.152-5.696-3.936l-1.376-2.144a1.234 1.234 0 0 1-.16-.896c.064-.32.256-.576.512-.736.128-.096.256-.16.352-.256.224-.16.544-.384.608-.384l.128.128 1.92 3.008c.128.192.32.288.544.288a.73.73 0 0 0 .352-.096c.288-.192.384-.576.192-.864l-1.888-3.008-5.44-8.544a1.01 1.01 0 0 1-.128-.8 1.03 1.03 0 0 1 .48-.672l.032-.032h.032c.256-.16.512-.192.8-.128.288.064.512.224.672.48l3.84 6.048 1.792 2.848c.128.192.32.288.544.288a.729.729 0 0 0 .352-.096c.288-.192.384-.576.192-.864L20.96 14.72c-.256-.416-.128-.992.288-1.248s.992-.128 1.248.288l1.792 2.848c.128.192.32.288.544.288a.729.729 0 0 0 .352-.096c.288-.192.384-.576.192-.864l-1.504-2.368c-.128-.192-.16-.448-.128-.672.064-.225.192-.449.384-.576.192-.128.448-.16.672-.128.224.064.448.192.576.384l.608.928 1.216 1.888c.128.192.32.287.544.287a.73.73 0 0 0 .352-.095c.288-.192.384-.576.192-.865L26.976 12.8a.754.754 0 0 1-.096-.64c.064-.224.192-.416.352-.512a.754.754 0 0 1 .64-.096c.224.064.416.192.512.352l1.728 2.72c2.656 4.16 2.624 7.68 2.624 10.016 0 .896 0 1.6.128 2.176.064.288.32.48.608.48.064 0 .096 0 .16-.032.352-.096.576-.448.48-.768Z"
      fill={color}
    />
  </Svg>
);

export default DraggableHand;
