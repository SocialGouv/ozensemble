import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const FollowUpConsos = ({ size, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect width="25" height="25" rx="7" fill="#CFD5F6" />
    <Path
      d="M18.6226 17.6276L15.8399 14.8439C16.6743 13.7566 17.0638 12.3928 16.9295 11.0289C16.7952 9.66504 16.1472 8.40333 15.1168 7.49971C14.0865 6.59608 12.751 6.11822 11.3813 6.16305C10.0115 6.20788 8.71015 6.77204 7.7411 7.7411C6.77204 8.71015 6.20788 10.0115 6.16305 11.3813C6.11822 12.751 6.59608 14.0865 7.49971 15.1168C8.40333 16.1472 9.66504 16.7952 11.0289 16.9295C12.3928 17.0638 13.7566 16.6743 14.8439 15.8399L17.6288 18.6255C17.6942 18.6909 17.7719 18.7428 17.8573 18.7782C17.9428 18.8136 18.0344 18.8318 18.1269 18.8318C18.2194 18.8318 18.3109 18.8136 18.3964 18.7782C18.4819 18.7428 18.5595 18.6909 18.6249 18.6255C18.6903 18.5601 18.7422 18.4824 18.7776 18.397C18.813 18.3115 18.8312 18.2199 18.8312 18.1274C18.8312 18.0349 18.813 17.9434 18.7776 17.8579C18.7422 17.7724 18.6903 17.6948 18.6249 17.6294L18.6226 17.6276ZM7.57823 11.5626C7.57823 10.7746 7.81191 10.0042 8.24972 9.349C8.68753 8.69378 9.3098 8.18309 10.0378 7.88152C10.7659 7.57995 11.567 7.50105 12.3399 7.65479C13.1128 7.80852 13.8228 8.188 14.38 8.74522C14.9372 9.30245 15.3167 10.0124 15.4704 10.7853C15.6242 11.5582 15.5453 12.3593 15.2437 13.0874C14.9421 13.8154 14.4314 14.4377 13.7762 14.8755C13.121 15.3133 12.3506 15.547 11.5626 15.547C10.5062 15.5459 9.4934 15.1258 8.74642 14.3788C7.99944 13.6318 7.57931 12.619 7.57823 11.5626Z"
      fill="#3E5DE6"
    />
  </Svg>
);

export default FollowUpConsos;
