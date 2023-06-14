import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const FilesIcon = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect width="25" height="25" rx="7" fill="#CFD5F6" />
    <Path
      d="M6.73047 4.16211C5.92969 4.35742 5.25391 5.04492 5.05469 5.86133C5.00781 6.03711 5 7.32617 5 13.0879V20.0996L5.10547 20.4121C5.36719 21.1777 5.99219 21.7559 6.74219 21.9355C7.11719 22.0215 17.4531 22.0215 17.8281 21.9355C18.5781 21.7559 19.2031 21.1777 19.4648 20.4121L19.5703 20.0996V14.5137V8.92773L19.4766 8.69336C19.3906 8.47461 19.2539 8.32617 17.3359 6.40039C15.6602 4.72461 15.2422 4.32617 15.0625 4.23242L14.8438 4.12305L10.8984 4.11523C7.64062 4.11133 6.91406 4.11914 6.73047 4.16211ZM14.1602 6.79492C14.1602 8.08789 14.168 8.25977 14.2305 8.4707C14.3633 8.88867 14.6406 9.20117 15.0469 9.38867C15.2266 9.4707 15.2852 9.47461 16.7773 9.49414L18.3203 9.51367V14.7324V19.9473L18.2031 20.1777C18.0703 20.4355 17.8359 20.6387 17.5977 20.7051C17.4961 20.7324 15.7461 20.7402 12.1992 20.7363L6.95312 20.7246L6.76562 20.6152C6.66406 20.5527 6.52734 20.4316 6.46094 20.3418C6.21484 20.002 6.23047 20.4512 6.23828 12.9668L6.25 6.15039L6.36719 5.91992C6.49609 5.66992 6.6875 5.49414 6.91797 5.41211C7.04297 5.36523 7.70312 5.35742 10.6172 5.35352H14.1602V6.79492ZM16.4258 7.24805L17.4219 8.24414H16.4766C15.6719 8.24414 15.5234 8.23633 15.4727 8.18164C15.418 8.13086 15.4102 7.98242 15.4102 7.18555C15.4102 6.67383 15.4141 6.25195 15.4219 6.25195C15.4258 6.25195 15.8789 6.70117 16.4258 7.24805Z"
      fill="#3E5DE6"
    />
    <Path
      d="M8.73111 11.2168C8.67642 11.2402 8.59048 11.2949 8.54361 11.3418C8.23892 11.623 8.27798 12.0645 8.62564 12.3223C8.73501 12.4043 8.74673 12.4043 12.2858 12.4043C15.8249 12.4043 15.8366 12.4043 15.946 12.3223C16.3288 12.0371 16.3288 11.5605 15.946 11.2754C15.8366 11.1934 15.821 11.1934 12.3327 11.1855C10.0592 11.1816 8.79361 11.1934 8.73111 11.2168Z"
      fill="#3E5DE6"
    />
    <Path
      d="M8.66048 14.1699C8.46907 14.2637 8.36751 14.4355 8.34798 14.6855C8.32845 14.959 8.43392 15.1348 8.69173 15.2637L8.8636 15.3535H12.2855H15.7074L15.8792 15.2637C16.137 15.1348 16.2425 14.959 16.223 14.6855C16.2034 14.4316 16.098 14.2598 15.9027 14.166C15.7816 14.1113 15.4183 14.1035 12.2777 14.1035C9.14485 14.1035 8.77767 14.1113 8.66048 14.1699Z"
      fill="#3E5DE6"
    />
    <Path
      d="M8.69173 17.0801C8.43392 17.2129 8.32845 17.3887 8.34798 17.6621C8.36751 17.916 8.47298 18.0879 8.66829 18.1816C8.78548 18.2363 9.03939 18.2441 10.8402 18.2441C12.5589 18.2441 12.8909 18.2363 12.9886 18.1855C13.2308 18.0605 13.3753 17.7363 13.305 17.4707C13.2542 17.291 13.0511 17.084 12.8675 17.0332C12.7894 17.0098 11.9495 16.9941 10.8011 16.9941C8.87142 16.9941 8.8636 16.9941 8.69173 17.0801Z"
      fill="#3E5DE6"
    />
  </Svg>
);

export default FilesIcon;