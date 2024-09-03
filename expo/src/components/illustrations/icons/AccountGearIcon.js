import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const AccountGearIcon = ({ size, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
    <Rect width="25" height="25" rx="7" fill="#C5F9F3" />
    <Path
      d="M12.1722 8.9873C10.2128 8.9873 8.60974 10.5904 8.60974 12.5497C8.60974 14.5091 10.2128 16.1122 12.1722 16.1122C14.1315 16.1122 15.7346 14.5091 15.7346 12.5497C15.7346 10.5904 14.1315 8.9873 12.1722 8.9873ZM12.1722 14.9247C10.8659 14.9247 9.79722 13.856 9.79722 12.5497C9.79722 11.2435 10.8659 10.1748 12.1722 10.1748C13.4784 10.1748 14.5471 11.2435 14.5471 12.5497C14.5471 13.856 13.4784 14.9247 12.1722 14.9247Z"
      fill="#00C2AB"
    />
    <Path
      d="M20.148 9.24468L19.0199 7.30514C18.6439 6.67182 17.872 6.41453 17.1991 6.73119L16.5262 7.04785C15.9919 6.63224 15.3981 6.27599 14.7648 6.0385L14.7054 5.28643C14.6461 4.55415 14.0325 4 13.3003 4H11.0441C10.3118 4 9.69825 4.55415 9.63888 5.28643L9.57951 6.01871C8.94619 6.27599 8.35245 6.61245 7.81808 7.02806L7.14518 6.7114C6.47228 6.39474 5.70042 6.65203 5.32439 7.28535L4.19629 9.22489C3.82025 9.85821 3.99837 10.6697 4.6119 11.0853L5.22543 11.5207C5.18585 11.8571 5.14627 12.1936 5.14627 12.53C5.14627 12.8665 5.16606 13.2029 5.22543 13.5394L4.6119 13.9748C4.01816 14.3904 3.84004 15.2018 4.19629 15.8352L5.32439 17.7747C5.70042 18.408 6.47228 18.6653 7.14518 18.3487L7.81808 18.032C8.35245 18.4476 8.94619 18.8039 9.57951 19.0414L9.63888 19.7934C9.69825 20.5257 10.3118 21.0798 11.0441 21.0798H13.2805C14.0127 21.0798 14.6263 20.5257 14.6856 19.7934L14.745 19.0414C15.3783 18.7841 15.9721 18.4476 16.5064 18.032L17.1793 18.3487C17.8522 18.6653 18.6241 18.408 19.0001 17.7747L20.1282 15.8352C20.5043 15.2018 20.3262 14.3904 19.7126 13.9748L19.0991 13.5394C19.1387 13.2029 19.1783 12.8665 19.1783 12.53C19.1783 12.1936 19.1585 11.8571 19.0991 11.5207L19.7126 11.0853C20.3262 10.6894 20.5043 9.878 20.148 9.24468ZM19.0397 10.1353L17.8127 11.0061L17.8918 11.3821C17.971 11.7582 18.0106 12.154 18.0106 12.5498C18.0106 12.9456 17.971 13.3415 17.8918 13.7175L17.8127 14.0935L19.0397 14.9644C19.1387 15.0237 19.1585 15.1623 19.0991 15.2612L17.971 17.2008C17.9116 17.2997 17.7929 17.3393 17.6741 17.2997L16.3283 16.6664L16.0315 16.9237C15.4377 17.4383 14.7648 17.8341 14.0127 18.0914L13.6367 18.2101L13.4982 19.7143C13.4784 19.833 13.3992 19.9122 13.2805 19.9122H11.0441C10.9253 19.9122 10.8264 19.833 10.8264 19.7143L10.6878 18.2101L10.3118 18.0914C9.55971 17.8341 8.88681 17.458 8.29307 16.9237L8.016 16.6664L6.63061 17.2997C6.53165 17.3393 6.39311 17.2997 6.33374 17.2008L5.20564 15.2612C5.14627 15.1623 5.16606 15.0237 5.26501 14.9644L6.49207 14.0935L6.4129 13.7175C6.37332 13.3415 6.33374 12.9456 6.33374 12.5498C6.33374 12.154 6.37332 11.7582 6.45249 11.3821L6.53165 11.0061L5.3046 10.1353C5.20564 10.0759 5.18585 9.93738 5.24522 9.83842L6.37332 7.89888C6.4327 7.79992 6.55144 7.76034 6.67019 7.79992L8.03579 8.43324L8.33266 8.17595C8.92639 7.66138 9.5993 7.26556 10.3514 7.00827L10.7274 6.88952L10.8659 5.38539C10.8857 5.26664 10.9649 5.18747 11.0836 5.18747H13.3201C13.4388 5.18747 13.5378 5.26664 13.5378 5.38539L13.6763 6.88952L14.0523 7.00827C14.8044 7.26556 15.4773 7.64159 16.071 8.17595L16.3679 8.43324L17.7335 7.79992C17.8325 7.74055 17.971 7.79992 18.0304 7.89888L19.1585 9.83842C19.1783 9.93738 19.1387 10.0759 19.0397 10.1353Z"
      fill="#00C2AB"
    />
  </Svg>
);

export default AccountGearIcon;
