import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const StyledSvg = styled(Svg)``;

const SmallCan = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} fill="none" viewBox="0 0 14 25" {...props}>
    <Path
      d="M4.37469 0.0567894C4.13325 0.131521 3.81133 0.33847 3.61013 0.545422C3.19623 0.993813 3.08125 1.57442 3.23647 2.44821L3.31695 2.92534H2.56388C1.97177 2.92534 1.78207 2.94259 1.67859 3.01732C1.60961 3.06331 1.20146 3.68991 0.776062 4.40274L0 5.70192V13.9627V22.2234L0.776062 23.5226C1.20146 24.2354 1.60961 24.862 1.67859 24.908C1.79357 24.9885 2.38567 25 6.84084 25C11.296 25 11.8881 24.9885 12.0031 24.908C12.0721 24.862 12.4802 24.2354 12.9056 23.5226L13.6817 22.2234V13.9627V5.70192L12.9056 4.40274C12.4802 3.68991 12.0721 3.06331 12.0031 3.01732C11.8881 2.93684 11.5202 2.92534 9.15178 2.92534H6.42694L6.45569 2.79313C6.58216 2.2815 6.62815 1.6549 6.55916 1.35023C6.42694 0.75812 5.92107 0.212002 5.3577 0.0510406C5.09902 -0.0179424 4.63913 -0.0179424 4.37469 0.0567894ZM5.33471 1.13753C5.63364 1.35023 5.66813 1.52843 5.54741 2.27L5.44968 2.92534H4.88057C4.56439 2.92534 4.31146 2.9196 4.31146 2.9081C4.31146 2.90235 4.27122 2.67815 4.22523 2.40797C4.11025 1.75838 4.116 1.55143 4.25397 1.32723C4.47242 0.970818 4.97829 0.878839 5.33471 1.13753ZM11.8881 4.59819C12.1123 4.9776 12.302 5.31676 12.302 5.34551C12.302 5.37425 11.319 5.39725 9.83012 5.39725H7.35822V5.88588V6.37451H10.0313H12.7044V7.09309V7.81166H11.457C10.7671 7.81166 10.0371 7.8404 9.83012 7.86915C9.28975 7.95538 8.61141 8.30604 8.20901 8.70844C7.61691 9.30055 7.38696 9.89841 7.33522 10.9791C7.30073 11.7839 7.17426 12.1691 6.8121 12.5658C6.44994 12.9739 6.05328 13.1521 5.37495 13.2154C5.07027 13.2498 4.71386 13.3016 4.58164 13.3361C3.69636 13.5718 2.79957 14.4628 2.52939 15.3711C2.4949 15.4976 2.44316 16.0667 2.42016 16.6358C2.38567 17.613
    2.37418 17.6878 2.21896 17.9867C1.97752 18.4696 1.54638 18.8605 1.10948 18.9927L0.977263 19.0272V12.7037V6.37451H1.95453H2.93179V5.88588V5.39725H2.15573C1.71309 5.39725 1.37967 5.37425 1.37967 5.34551C1.37967 5.31676 1.56937 4.9776 1.79357 4.59819L2.21321 3.90261H6.84084H11.4685L11.8881 4.59819ZM12.7044 9.79493V10.7952L12.4917 10.8354C11.3593 11.0251 10.4395 11.5138 9.67491 12.3186C8.77812 13.2613 8.33548 14.3766 8.33548 15.6988C8.33548 16.699 8.61141 17.613 9.14604 18.3948C9.95659 19.5791 10.9741 20.2229 12.5492 20.5448C12.7044 20.5736 12.7044 20.5793 12.7044 21.0622V21.5508H6.84084H0.971515L0.988761 20.792L1.00601 20.0332L1.27044 19.97C2.14998 19.7458 2.97778 18.918 3.2882 17.958C3.3227 17.866 3.36868 17.3314 3.39168 16.7795C3.44342 15.5435 3.52965 15.2619 3.99528 14.7962C4.35744 14.4341 4.7541 14.2673 5.36345 14.2156C6.22574 14.1409 6.79485 13.9109 7.35247 13.4108C7.98482 12.8417 8.2665 12.1691 8.31824 11.0941C8.35848 10.2088 8.47345 9.86391 8.84711 9.46151C9.15178 9.13384 9.53694 8.92114 9.95659 8.85216C10.1233 8.82342 10.8131 8.80042 11.4857 8.79467L12.7044 8.78893V9.79493ZM12.7044 15.6585V19.5388H12.5722C12.3595 19.5388 11.7387 19.3204 11.3018 19.0904C10.8189 18.8375 10.175 18.2224 9.87611 17.728C9.76114 17.5383 9.59443 17.1761 9.50245 16.9232C9.35873 16.5093 9.34149 16.3886 9.34149 15.6873C9.34149 14.9859 9.35873 14.8652 9.50245 14.4513C9.96809 13.1349 11.0316 12.1634 12.3595 11.8644C12.532 11.8242 12.6814 11.7897 12.6929 11.7839C12.6987 11.7782 12.7044 13.5258 12.7044 15.6585ZM12.302 22.5798C12.302 22.6086 12.1123 22.9477 11.8881 23.3272L11.4685 24.0227H6.84084H2.21321L1.79357 23.3272C1.56937 22.9477 1.37967 22.6086 1.37967 22.5798C1.37967 22.5511 3.5009 22.5281 6.84084 22.5281C10.1808 22.5281 12.302 22.5511 12.302 22.5798Z"
      fill="#DE285E"
    />
  </StyledSvg>
);

export default SmallCan;
