import * as React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect width="50" height="50" rx="7" fill="#FBD0D0" />

      <Path
        d="M33.9594 10.1373C33.8485 10.2065 32.7953 11.232 31.6312 12.403C29.7049 14.3432 29.504 14.5718 29.4624 14.8213C29.4347 14.9737 29.2961 16.311 29.1437 17.7938L28.8735 20.4961L25.5891 23.7874C23.7806 25.6028 22.2632 27.1549 22.2216 27.2381C22.18 27.3212 22.1454 27.5568 22.1454 27.7578C22.1454 28.4299 22.5681 28.8525 23.2402 28.8525C23.4411 28.8525 23.6767 28.8179 23.7598 28.7763C23.843 28.7347 25.3951 27.2173 27.2105 25.4088L30.5018 22.1245L33.2041 21.8542C34.6869 21.7018 36.0242 21.5632 36.1767 21.5355C36.4261 21.4939 36.6617 21.2861 38.6226 19.3321C39.8213 18.1472 40.8399 17.094 40.8953 16.9901C41.0478 16.6921 41.02 16.0962 40.833 15.826C40.535 15.3756 40.4449 15.3548 38.1514 15.1747C37.0012 15.0776 36.045 14.9876 36.0242 14.9737C36.0104 14.9529 35.9203 13.9967 35.8233 12.8465C35.6431 10.553 35.6223 10.4629 35.1719 10.165C34.874 9.9571 34.2642 9.94325 33.9594 10.1373ZM33.7099 15.1331C33.8554 17.1356 33.8901 17.1702 36.2806 17.3157C36.7171 17.3434 37.119 17.385 37.1606 17.4127C37.216 17.4404 36.9181 17.7938 36.3152 18.3897L35.3798 19.3251L33.315 19.533L31.257 19.7409L31.4649 17.683L31.6728 15.6181L32.6082 14.6827C33.1972 14.0868 33.5575 13.7819 33.5852 13.8374C33.606 13.8789 33.6683 14.4679 33.7099 15.1331Z"
        fill="#E75556"
      />

      <Path
        d="M21.8693 15.5557C18.8829 15.9022 15.9728 17.4196 14.0396 19.6508C9.16153 25.2702 10.291 33.8206 16.4509 37.9365C20.0401 40.3408 24.6548 40.6665 28.5628 38.7957C32.3807 36.9664 34.9791 33.2802 35.4433 29.0465C35.5888 27.7577 35.5195 26.5105 35.2354 25.1247C35.0276 24.1338 34.7435 23.7597 34.1476 23.6765C33.7665 23.628 33.2814 23.8082 33.0874 24.0784C32.8033 24.4734 32.7964 24.6882 32.9974 25.6513C33.1637 26.4066 33.1914 26.6976 33.1914 27.7092C33.1914 28.5753 33.1637 29.0534 33.0666 29.5108C32.346 33.1346 29.8862 35.9894 26.4702 37.1743C25.3893 37.5484 24.5855 37.6801 23.2898 37.6801C21.5922 37.687 20.3103 37.396 18.876 36.6823C16.0143 35.2549 14.0742 32.6981 13.4437 29.5108C13.2704 28.6516 13.2704 26.8362 13.4437 25.977C14.2682 21.8196 17.3308 18.7569 21.4883 17.9324C21.9386 17.8423 22.4306 17.8076 23.2898 17.8076C24.3084 17.8076 24.5855 17.8354 25.3477 17.9947C26.3109 18.2026 26.5257 18.1957 26.9206 17.9116C27.1908 17.7176 27.371 17.2325 27.3225 16.8514C27.2393 16.2556 26.8652 15.9715 25.8743 15.7636C24.5232 15.4864 23.1235 15.4102 21.8693 15.5557Z"
        fill="#E75556"
      />
      <Path
        d="M21.868 21.1962C19.4013 21.7367 17.5027 23.5313 16.796 25.9841C16.6574 26.4622 16.6366 26.684 16.6366 27.7441C16.6366 28.8043 16.6574 29.026 16.796 29.5041C17.4681 31.8184 19.1795 33.5298 21.4938 34.202C21.9719 34.3405 22.1937 34.3613 23.2538 34.3613C24.314 34.3613 24.5357 34.3405 25.0138 34.202C27.3142 33.5368 29.0465 31.8184 29.6978 29.5387C29.8017 29.1992 29.8572 28.7488 29.8849 28.1945C29.9126 27.4392 29.8987 27.3422 29.774 27.1344C29.3375 26.4484 28.2219 26.4553 27.82 27.1551C27.7438 27.2799 27.6676 27.6333 27.626 28.0213C27.4805 29.4487 26.8708 30.5365 25.769 31.3264C23.2815 33.1002 19.7547 31.7768 18.9855 28.7765C18.9024 28.4509 18.8816 28.1321 18.9024 27.5362C18.9301 26.8503 18.9647 26.6632 19.1518 26.1851C19.6715 24.8755 20.8425 23.8292 22.1937 23.4828C22.4154 23.4273 22.9766 23.3719 23.4409 23.358C24.1684 23.3442 24.307 23.3234 24.4802 23.1987C25.1662 22.6859 25.1662 21.7852 24.4802 21.2724C24.307 21.1408 24.1754 21.1269 23.3023 21.113C22.6579 21.1061 22.166 21.1338 21.868 21.1962Z"
        fill="#E75556"
      />
    </Svg>
  );
}

export default SvgComponent;

<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" rx="7" fill="#FBD0D0" />

  <Path
    d="M33.9594 10.1373C33.8485 10.2065 32.7953 11.232 31.6312 12.403C29.7049 14.3432 29.504 14.5718 29.4624 14.8213C29.4347 14.9737 29.2961 16.311 29.1437 17.7938L28.8735 20.4961L25.5891 23.7874C23.7806 25.6028 22.2632 27.1549 22.2216 27.2381C22.18 27.3212 22.1454 27.5568 22.1454 27.7578C22.1454 28.4299 22.5681 28.8525 23.2402 28.8525C23.4411 28.8525 23.6767 28.8179 23.7598 28.7763C23.843 28.7347 25.3951 27.2173 27.2105 25.4088L30.5018 22.1245L33.2041 21.8542C34.6869 21.7018 36.0242 21.5632 36.1767 21.5355C36.4261 21.4939 36.6617 21.2861 38.6226 19.3321C39.8213 18.1472 40.8399 17.094 40.8953 16.9901C41.0478 16.6921 41.02 16.0962 40.833 15.826C40.535 15.3756 40.4449 15.3548 38.1514 15.1747C37.0012 15.0776 36.045 14.9876 36.0242 14.9737C36.0104 14.9529 35.9203 13.9967 35.8233 12.8465C35.6431 10.553 35.6223 10.4629 35.1719 10.165C34.874 9.9571 34.2642 9.94325 33.9594 10.1373ZM33.7099 15.1331C33.8554 17.1356 33.8901 17.1702 36.2806 17.3157C36.7171 17.3434 37.119 17.385 37.1606 17.4127C37.216 17.4404 36.9181 17.7938 36.3152 18.3897L35.3798 19.3251L33.315 19.533L31.257 19.7409L31.4649 17.683L31.6728 15.6181L32.6082 14.6827C33.1972 14.0868 33.5575 13.7819 33.5852 13.8374C33.606 13.8789 33.6683 14.4679 33.7099 15.1331Z"
    fill="#E75556"
  />

  <path
    d="M21.8693 15.5557C18.8829 15.9022 15.9728 17.4196 14.0396 19.6508C9.16153 25.2702 10.291 33.8206 16.4509 37.9365C20.0401 40.3408 24.6548 40.6665 28.5628 38.7957C32.3807 36.9664 34.9791 33.2802 35.4433 29.0465C35.5888 27.7577 35.5195 26.5105 35.2354 25.1247C35.0276 24.1338 34.7435 23.7597 34.1476 23.6765C33.7665 23.628 33.2814 23.8082 33.0874 24.0784C32.8033 24.4734 32.7964 24.6882 32.9974 25.6513C33.1637 26.4066 33.1914 26.6976 33.1914 27.7092C33.1914 28.5753 33.1637 29.0534 33.0666 29.5108C32.346 33.1346 29.8862 35.9894 26.4702 37.1743C25.3893 37.5484 24.5855 37.6801 23.2898 37.6801C21.5922 37.687 20.3103 37.396 18.876 36.6823C16.0143 35.2549 14.0742 32.6981 13.4437 29.5108C13.2704 28.6516 13.2704 26.8362 13.4437 25.977C14.2682 21.8196 17.3308 18.7569 21.4883 17.9324C21.9386 17.8423 22.4306 17.8076 23.2898 17.8076C24.3084 17.8076 24.5855 17.8354 25.3477 17.9947C26.3109 18.2026 26.5257 18.1957 26.9206 17.9116C27.1908 17.7176 27.371 17.2325 27.3225 16.8514C27.2393 16.2556 26.8652 15.9715 25.8743 15.7636C24.5232 15.4864 23.1235 15.4102 21.8693 15.5557Z"
    fill="#E75556"
  />
  <path
    d="M21.868 21.1962C19.4013 21.7367 17.5027 23.5313 16.796 25.9841C16.6574 26.4622 16.6366 26.684 16.6366 27.7441C16.6366 28.8043 16.6574 29.026 16.796 29.5041C17.4681 31.8184 19.1795 33.5298 21.4938 34.202C21.9719 34.3405 22.1937 34.3613 23.2538 34.3613C24.314 34.3613 24.5357 34.3405 25.0138 34.202C27.3142 33.5368 29.0465 31.8184 29.6978 29.5387C29.8017 29.1992 29.8572 28.7488 29.8849 28.1945C29.9126 27.4392 29.8987 27.3422 29.774 27.1344C29.3375 26.4484 28.2219 26.4553 27.82 27.1551C27.7438 27.2799 27.6676 27.6333 27.626 28.0213C27.4805 29.4487 26.8708 30.5365 25.769 31.3264C23.2815 33.1002 19.7547 31.7768 18.9855 28.7765C18.9024 28.4509 18.8816 28.1321 18.9024 27.5362C18.9301 26.8503 18.9647 26.6632 19.1518 26.1851C19.6715 24.8755 20.8425 23.8292 22.1937 23.4828C22.4154 23.4273 22.9766 23.3719 23.4409 23.358C24.1684 23.3442 24.307 23.3234 24.4802 23.1987C25.1662 22.6859 25.1662 21.7852 24.4802 21.2724C24.307 21.1408 24.1754 21.1269 23.3023 21.113C22.6579 21.1061 22.166 21.1338 21.868 21.1962Z"
    fill="#E75556"
  />
</svg>;