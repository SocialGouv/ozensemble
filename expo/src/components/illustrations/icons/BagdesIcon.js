import * as React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";

const BadgesIcon = ({ size, ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width="25" height="25" rx="7" fill="#E8E8F3" />
    <G clip-path="url(#clip0_2747_76627)">
      <Path
        d="M9.80244 5.03109C9.31877 5.11377 8.88884 5.41142 8.59946 5.87029C8.41343 6.16794 8.29354 6.43664 8.08684 7.0402C8.00416 7.27171 7.90082 7.53215 7.85534 7.6231C7.76026 7.81326 7.62797 7.88354 6.90453 8.13571C6.63995 8.22666 6.27616 8.37961 6.0984 8.47056C5.23027 8.91703 4.84581 9.69422 5.05664 10.5872C5.12278 10.8517 5.23027 11.1287 5.57339 11.877C5.85036 12.4888 5.85036 12.5384 5.53205 13.2246C5.02357 14.3201 4.91608 14.8079 5.06077 15.3412C5.25507 16.0688 5.72634 16.4533 6.94173 16.8915C7.27245 17.0114 7.59077 17.1354 7.65278 17.1643C7.79747 17.2387 7.88841 17.4165 8.11992 18.0738C8.48371 19.099 8.82269 19.5827 9.36011 19.8349C9.67429 19.9796 9.98847 20.0292 10.3564 19.9837C10.6995 19.9465 11.0096 19.8349 11.7082 19.5083C12.4895 19.1404 12.5185 19.1404 13.2915 19.5041C14.1225 19.8969 14.3292 19.963 14.817 19.9837C15.1642 19.9961 15.2676 19.9878 15.4619 19.9134C16.144 19.6571 16.483 19.2106 16.9046 18.0283C16.9997 17.7555 17.1155 17.462 17.1609 17.3751C17.2477 17.1974 17.3139 17.1643 18.1448 16.8625C18.8393 16.6145 19.1907 16.4202 19.476 16.1432C19.9514 15.6761 20.1043 15.0767 19.9307 14.3821C19.8852 14.2003 19.7116 13.7538 19.5462 13.3941C19.1328 12.4929 19.137 12.526 19.5297 11.662C19.9183 10.8063 20.0258 10.4259 19.9927 9.97946C19.9348 9.11546 19.3891 8.58631 18.0828 8.12744C17.3635 7.87527 17.2436 7.80912 17.1568 7.6355C17.1155 7.55282 16.9997 7.26344 16.9046 6.9906C16.4581 5.7132 16.0241 5.20472 15.2552 5.04349C14.7219 4.93601 14.3209 5.02696 13.3246 5.4941C13.0063 5.63879 12.688 5.77521 12.6177 5.79174C12.4441 5.82481 12.3076 5.78347 11.609 5.45689C10.745 5.06003 10.2779 4.94841 9.80244 5.03109ZM10.7243 7.05674C11.6875 7.50321 12.0885 7.63136 12.5102 7.63136C12.8409 7.63136 13.3659 7.47841 13.8992 7.2345C14.5772 6.92032 14.7508 6.84591 14.8211 6.84591C14.8955 6.84591 15.003 7.06087 15.2097 7.65203C15.5569 8.64419 15.8794 9.10306 16.4623 9.42551C16.6152 9.51232 17.0121 9.68182 17.3511 9.8017C18.1944 10.1035 18.1986 10.1035 18.1655 10.2316C18.1489 10.2895 18.0208 10.5913 17.8761 10.9013C17.4958 11.7199 17.4296 11.9224 17.409 12.4061C17.3883 12.9146 17.4503 13.175 17.7397 13.8117C18.182 14.779 18.1986 14.8286 18.1365 14.8906C18.1035 14.9237 17.7769 15.0601 17.409 15.1965C17.0369 15.3288 16.6194 15.5025 16.4788 15.5769C16.115 15.767 15.7512 16.1432 15.5611 16.5194C15.4412 16.7551 14.9203 18.0945 14.9203 18.1606C14.9203 18.2185 14.6516 18.1275 14.1638 17.9002C13.2543 17.4785 13.0352 17.4124 12.5226 17.4124C11.9893 17.4082 11.824 17.4578 10.9228 17.8671C10.5548 18.0366 10.2241 18.173 10.191 18.173C10.1042 18.173 10.0298 18.0159 9.81071 17.3917C9.53374 16.6104 9.36424 16.2962 9.05006 15.982C8.73588 15.6637 8.42583 15.4901 7.67758 15.2213C6.78464 14.8989 6.80945 14.9113 6.83838 14.7873C6.85492 14.7294 6.98307 14.4276 7.12776 14.1217C7.54943 13.2246 7.5825 13.1089 7.5825 12.5095C7.5825 11.91 7.54943 11.8025 7.12363 10.8848C6.97894 10.5706 6.85492 10.273 6.84665 10.2234C6.83425 10.1117 6.99134 10.0332 7.70652 9.78103C8.39689 9.54126 8.73588 9.35523 9.02939 9.05759C9.39318 8.69793 9.49653 8.49123 9.9182 7.32958C10.067 6.91619 10.1042 6.84591 10.1828 6.84591C10.2282 6.84591 10.4763 6.94099 10.7243 7.05674Z"
        fill="#4030A5"
      />
      <Path
        d="M11.7779 9.03298C10.1326 9.38023 8.9668 10.8106 8.9668 12.4807C8.9668 13.5266 9.32645 14.3699 10.0706 15.0769C11.2694 16.2096 13.0677 16.3832 14.4236 15.4903C15.4571 14.8123 16.0359 13.7416 16.0359 12.5055C16.0359 11.6622 15.7672 10.8974 15.2422 10.2525C14.4236 9.24381 13.0594 8.76427 11.7779 9.03298ZM12.6378 10.2608C12.8321 10.3393 13.0016 10.5005 13.1049 10.699C13.1793 10.8437 13.1835 10.9553 13.1835 12.2823V13.7085H13.3405C13.7911 13.7085 14.0971 14.1632 13.8945 14.5312C13.7457 14.8081 13.663 14.8247 12.5096 14.8247C11.3314 14.8247 11.2694 14.8123 11.1165 14.5188C10.9015 14.1136 11.1991 13.7085 11.7159 13.7085H11.9019V12.6213V11.534L11.6663 11.5464C11.4761 11.5588 11.3976 11.5464 11.2901 11.4762C11.1495 11.3893 11.0338 11.1785 11.0338 11.009C11.0338 10.8602 11.1991 10.6452 11.41 10.5129C11.8937 10.2153 12.3195 10.1285 12.6378 10.2608Z"
        fill="#4030A5"
      />
    </G>
  </Svg>
);

export default BadgesIcon;
