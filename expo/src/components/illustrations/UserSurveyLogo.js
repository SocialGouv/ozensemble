import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x={0.5} y={0.5} width={79} height={79} rx={11.5} fill="#fff" />
      <Rect x={8.5} y={11.5} width={64} height={15} rx={6.5} fill="#F3F3F6" />
      <Rect x={8.5} y={11.5} width={64} height={15} rx={6.5} stroke="#DBDBE8" />
      <Rect x={8.5} y={32.5} width={64} height={15} rx={6.5} fill="#F3F3F6" />
      <Rect x={8.5} y={32.5} width={64} height={15} rx={6.5} stroke="#DBDBE8" />
      <Rect x={8.5} y={53.5} width={64} height={15} rx={6.5} fill="#5453A3" />
      <Rect x={8.5} y={53.5} width={64} height={15} rx={6.5} stroke="#5453A3" />
      <Path
        d="M25.982 56.346c-.079.026-.802.732-3.257 3.184l-3.159 3.153-1.353-1.354c-.929-.926-1.392-1.368-1.465-1.4-.44-.182-.926.187-.861.656.008.07.04.167.07.214.03.047.77.817 1.65 1.714 1.124 1.151 1.628 1.643 1.71 1.682.17.079.317.07.545-.036.188-.088.334-.231 3.501-3.46 1.86-1.892 3.337-3.419 3.375-3.486.173-.32-.014-.762-.372-.87a.636.636 0 00-.384.003z"
        fill="#fff"
      />
      <Rect x={0.5} y={0.5} width={79} height={79} rx={11.5} stroke="#DCDBE9" />
    </Svg>
  );
}

export default SvgComponent;
