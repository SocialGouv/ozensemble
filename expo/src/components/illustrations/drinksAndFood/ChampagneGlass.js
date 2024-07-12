import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const StyledSvg = styled(Svg)``;

const ChampagneGlass = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 18 41" {...props}>
    <Path
      d="m14.047 40-9.597-.001h-.497C3.07 40 1 40 1 38.93c0-.926 1.716-.979 3.094-1.022.36-.01.7-.02.937-.047l.094-.01c1.074-.116 3.074-.333 3.074-2.365 0-.446.016-1.143.034-1.95.074-3.273.21-9.366-.475-10.844-.446-.962-.81-1.334-1.312-1.85-.197-.201-.42-.43-.674-.72-.41-.469-4.024-4.764-4.2-10.88-.16-5.544 1.4-8.012 1.468-8.114A.306.306 0 0 1 3.3 1h11.4c.109 0 .21.048.26.127.066.102 1.628 2.57 1.468 8.114-.176 6.116-3.79 10.411-4.2 10.88-.255.29-.477.519-.674.72-.503.516-.867.889-1.312 1.85-.685 1.478-.548 7.57-.474 10.842.018.809.034 1.506.034 1.953 0 2.033 1.999 2.249 3.073 2.364l.094.01c.236.027.577.037.937.048 1.38.043 3.094.096 3.094 1.02 0 .319-.198.741-1.14.94-.555.117-1.228.132-1.813.132Zm-9.597-.477h9.597c.549 0 1.174-.013 1.665-.116.7-.148.7-.389.7-.479 0-.466-1.582-.515-2.527-.545-.375-.012-.73-.022-.994-.051l-.093-.01c-1.072-.117-3.584-.389-3.584-2.838 0-.442-.015-1.138-.033-1.944-.08-3.535-.214-9.454.511-11.018.478-1.03.885-1.447 1.402-1.976.192-.197.409-.42.655-.7.16-.183 3.917-4.54 4.092-10.616.136-4.718-1.022-7.188-1.328-7.755H3.49c-.306.568-1.462 3.038-1.328 7.755.175 6.076 3.934 10.434 4.094 10.616.244.28.462.504.654.7.516.53.924.946 1.401 1.977.725 1.564.592 7.484.512 11.02-.017.805-.033 1.5-.033 1.943 0 2.449-2.513 2.72-3.586 2.837l-.09.01c-.267.029-.62.04-.996.051-.944.03-2.526.078-2.526.545 0 .534 1.348.596 2.364.596l.495-.002Z"
      fill="#DE285E"
      stroke="#DE285E"
      strokeWidth={0.5}
    />
    <Path
      d="M9.005 20.877h-.013a.342.342 0 0 1-.166-.045l-.103-.058a.273.273 0 0 1-.068-.05c-.665-.497-3.444-3.296-4.722-6.048-1.069-2.303-1.113-4.16-1.175-6.728l-.006-.257c-.002-.087.053-.166.145-.21.064-.031 1.61-.757 3.078-.757.732 0 1.493.445 2.299.917.89.521 1.898 1.111 2.923 1.111 1.902 0 3.542-1.228 3.56-1.24a.35.35 0 0 1 .32-.044c.108.04.177.127.175.223l-.006.257c-.062 2.569-.105 4.425-1.176 6.728-1.277 2.751-4.056 5.55-4.721 6.046a.268.268 0 0 1-.068.052l-.103.058a.34.34 0 0 1-.173.045ZM3.344 7.826l.003.113c.062 2.616.103 4.344 1.137 6.57 1.269 2.733 3.916 5.337 4.518 5.824.601-.487 3.248-3.092 4.517-5.824 1-2.152 1.071-3.84 1.132-6.314-.682.406-1.974 1.034-3.455 1.034-1.214 0-2.306-.639-3.268-1.202-.725-.426-1.411-.827-1.953-.827-1.062 0-2.226.454-2.631.626Z"
      fill="#DE285E"
      stroke="#DE285E"
      strokeWidth={0.5}
    />
    <Path
      d="M8.266 13.723c-.552 0-1.002-.364-1.002-.81 0-.447.45-.81 1.002-.81s1.001.363 1.001.81c0 .447-.448.81-1.001.81Zm0-1.144c-.229 0-.413.15-.413.334 0 .184.185.334.413.334.228 0 .413-.15.413-.334 0-.184-.186-.334-.413-.334ZM7.426 16.107c-.553 0-1.003-.364-1.003-.811 0-.446.45-.81 1.003-.81.552 0 1.001.364 1.001.81 0 .447-.449.81-1.001.81Zm0-1.144c-.229 0-.414.15-.414.333 0 .185.186.335.414.335.227 0 .413-.15.413-.335 0-.184-.186-.333-.413-.333ZM8.487 18.492c-.552 0-1.002-.364-1.002-.811 0-.447.45-.81 1.002-.81.553 0 1.002.363 1.002.81 0 .447-.45.811-1.002.811Zm0-1.145c-.228 0-.413.15-.413.334 0 .184.186.334.413.334.229 0 .413-.15.413-.334 0-.184-.185-.334-.413-.334Z"
      fill="#DE285E"
      stroke="#DE285E"
      strokeWidth={0.5}
    />
  </StyledSvg>
);

export default ChampagneGlass;
