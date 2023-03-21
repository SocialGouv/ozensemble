import * as React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G id="OGImages" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <Rect id="Rectangle" fill="#CFD5F6" fill-rule="nonzero" x="0" y="0" width="50" height="50" rx="7" />
        <G id="Group" stroke={(stroke = '#3E5DE6')} strokeWidth={2}>
          <Rect id="Rectangle" x="12.636" y="19.1992" width="6.63609" height="17.7627" rx="3" />
          <Rect id="Rectangle" stroke="#3E5DE6" x="12.636" y="19.1992" width="6.63609" height="17.7627" rx="3" />
          <Rect id="Rectangle" stroke="#3E5DE6" x="21.9082" y="24.7627" width="6.63609" height="12.1994" rx="3" />
          <Rect id="Rectangle" stroke="#3E5DE6" x="31.1804" y="28.4717" width="6.63609" height="8.49053" rx="3" />
          <Path
            d="M15.0802943,12.3959972 C18.7962527,15.7078708 21.8563077,18.0597461 24.2604592,19.4516233 C26.6646107,20.8435005 30.0720424,22.2347139 34.4827541,23.6252634"
            id="Line"
            stroke-linecap="round"
          />
          <Path
            d="M34.4985,20.6631 L38.3082,24.0495 C38.4749,24.1976 38.4274,24.4694 38.2203,24.5522 L34.0349,26.2264"
            id="Path"
            stroke-linecap="round"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
