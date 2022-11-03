import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={30} height={48} viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G clipPath="url(#clip0_5408_20973)" stroke="#4030A5" strokeWidth={1.4}>
        <Path
          d="M16.246 34.273V21.815a1.78 1.78 0 013.56 0v6.051c.569-.598 1.694-.57 2.363-.142.071.043.64.512.57.584.44-.413 1.053-.485 1.637-.428.626.072.911.385 1.224.897.4-.355 1.082-.427 1.567-.256.954.328 1.281 1.453 1.281 2.364v7.845c0 .456-.1.897-.285 1.31.499.17.855.626.855 1.182v4.086a1.24 1.24 0 01-1.24 1.239H16.916a1.24 1.24 0 01-1.239-1.239v-4.086c0-.74.541-1.182.983-1.182-.185 0-.67-.47-.812-.57 0 0-2.548-2.605-2.548-5.98 0-4.485 2.99-4.997 2.99-4.997M28.163 40.04H16.63M19.805 27.867v3.76M22.724 28.309v3.317M25.586 28.793v2.833"
          strokeMiterlimit={10}
        />
        <Path
          d="M26.939 43.543c0 .484-.185.883-.413.883-.228 0-.413-.399-.413-.883s.185-.883.413-.883c.228 0 .413.399.413.883z"
          strokeMiterlimit={10}
        />
        <Path
          d="M.997 12.7h18.395M.997 23.777V.997h18.395V16.97M19.392 7.16H.997M.997 18.238h12.259M7.133 7.316V23.62M13.256 7.316V23.62M.997 23.777h12.259"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5408_20973">
          <Path fill="#fff" d="M0 0H30V47.5558H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
