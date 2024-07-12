import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const StyledSvg = styled(Svg)``;

const CiderBottle = ({ color = "#DE285E", size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 32 48" {...props}>
    <Path
      d="M11.635 11.985V.774a.8.8 0 0 0-.213-.548.706.706 0 0 0-.514-.227H5.09c-.401 0-.727.347-.727.774v11.21C1.62 14.087-.005 17.468 0 21.067v26.16a.8.8 0 0 0 .213.547.706.706 0 0 0 .514.227h14.544a.706.706 0 0 0 .515-.227.8.8 0 0 0 .213-.547v-26.16c.005-3.599-1.62-6.98-4.364-9.081ZM10.181 1.548v3.097H5.818V1.548h4.363ZM5.49 13.03a.788.788 0 0 0 .327-.642V6.193h4.363v6.194c.001.259.124.5.327.642 2.049 1.457 3.45 3.742 3.876 6.326H1.614c.427-2.584 1.827-4.869 3.876-6.326Zm9.053 8.036v20.74H1.454V20.904h13.09v.162ZM1.454 46.451v-3.097h13.09v3.097H1.454Z"
      fill={color}
    />
    <Path
      d="M6.458 35.613a2.347 2.347 0 0 0 1.454-.519c.42.333.93.515 1.454.519 1.607 0 2.91-1.735 2.91-3.871 0-2.137-1.303-3.871-2.91-3.871a2.18 2.18 0 0 0-.632.1 3.165 3.165 0 0 1 .727-1.463l.385-.41-1.025-1.1-.393.419a4.696 4.696 0 0 0-1.156 2.6 2.113 2.113 0 0 0-.814-.146c-1.6 0-2.91 1.734-2.91 3.87 0 2.137 1.31 3.872 2.91 3.872Zm0-6.194c.357.025.685.218.894.526a.71.71 0 0 0 .56.28.71.71 0 0 0 .56-.28c.211-.306.538-.499.894-.526.793 0 1.455 1.06 1.455 2.323 0 1.262-.662 2.322-1.455 2.322a1.199 1.199 0 0 1-.894-.526.71.71 0 0 0-.56-.279.711.711 0 0 0-.56.279c-.21.309-.537.502-.894.526-.786 0-1.455-1.06-1.455-2.322s.67-2.323 1.455-2.323ZM31.808 31.223a.709.709 0 0 0-.539-.255H18.18c-.205 0-.4.093-.538.255a.807.807 0 0 0-.189.596l1.455 15.484c.037.397.352.699.727.697h10.18c.376.002.69-.3.728-.697l1.454-15.484a.807.807 0 0 0-.188-.596Zm-1.339 1.293-.407 4.297-1.193-.635a4.839 4.839 0 0 0-2.261-.565h-1.302a3.479 3.479 0 0 1-2-.643 4.782 4.782 0 0 0-2.8-.905h-1.381l-.146-1.549h11.49ZM19.27 35.613h1.237a3.48 3.48 0 0 1 2 .642 4.782 4.782 0 0 0 2.8.906h1.301c.56 0 1.113.138 1.614.403l1.687.898-.458 4.893h-9.453l-.728-7.742Zm1.018 10.839-.145-1.549h9.163l-.146 1.549h-8.872Z"
      fill={color}
    />
    <Path
      d="M21.816 38.71h1.455v1.548h-1.455v-1.549ZM26.18 40.257h1.454v1.549H26.18v-1.549ZM19.635 29.42c.578 0 1.133-.245 1.542-.68a2.402 2.402 0 0 0 .64-1.643c0-.616-.23-1.207-.64-1.642a2.117 2.117 0 0 0-1.542-.68c-.579 0-1.134.244-1.543.68a2.402 2.402 0 0 0-.639 1.642c0 .616.23 1.207.639 1.642.41.436.964.68 1.543.68Zm0-3.097c.294 0 .559.188.671.478a.81.81 0 0 1-.157.843.695.695 0 0 1-.793.168.776.776 0 0 1-.449-.715c0-.428.326-.774.728-.774ZM28.36 23.225c.579 0 1.134-.245 1.543-.68a2.402 2.402 0 0 0 .64-1.642c0-.616-.23-1.207-.64-1.643a2.118 2.118 0 0 0-1.543-.68c-.578 0-1.133.245-1.542.68a2.401 2.401 0 0 0-.64 1.643c0 .615.23 1.207.64 1.642.409.435.964.68 1.542.68Zm0-3.097c.295 0 .56.19.672.478a.81.81 0 0 1-.157.844.695.695 0 0 1-.793.168.776.776 0 0 1-.449-.715c0-.428.326-.775.727-.775Z"
      fill={color}
    />
  </StyledSvg>
);

export default CiderBottle;
