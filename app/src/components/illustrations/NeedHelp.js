import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import styled from 'styled-components';

const NeedHelp = () => (
  <Wrapper>
    <Svg width={272} height={155} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.272 22.49c1.21 0 2.216-.958 2.27-2.175.197-4.73 1.257-9.304 3.079-13.232a.844.844 0 0 1 .577-.476.817.817 0 0 1 .72.17C13.405 10.42 21.935 13.6 37.09 8.041c17.664-6.477 33.853-2.997 43.116 2.413a2.268 2.268 0 0 0 3.106-.816 2.273 2.273 0 0 0-.816-3.106C72.335.6 54.665-3.24 35.52 3.78 22.37 8.605 15.35 6.152 11.78 3.25A5.354 5.354 0 0 0 7.18 2.183a5.363 5.363 0 0 0-3.677 2.983C1.436 9.625.226 14.796.002 20.118a2.276 2.276 0 0 0 2.175 2.365h.095v.007ZM68.244 62.219c-1.25 0-2.27 1.02-2.27 2.27v3.534c0 1.25 1.02 2.27 2.27 2.27s2.27-1.02 2.27-2.27v-3.534a2.27 2.27 0 0 0-2.27-2.27ZM35.166 62.219c-1.25 0-2.27 1.02-2.27 2.27v3.534c0 1.25 1.02 2.27 2.27 2.27s2.27-1.02 2.27-2.27v-3.534a2.27 2.27 0 0 0-2.27-2.27ZM72.389 54.197c-2.352 1.706-6.32 1.706-8.672 0a2.279 2.279 0 0 0-3.174.503 2.279 2.279 0 0 0 .503 3.174c1.964 1.427 4.485 2.14 7 2.14 2.515 0 5.043-.713 7-2.14a2.277 2.277 0 0 0 .503-3.174 2.277 2.277 0 0 0-3.174-.503h.014ZM42.363 55.901c-3.928-2.847-10.079-2.847-14.007 0a2.277 2.277 0 0 0-.503 3.174 2.277 2.277 0 0 0 3.174.503c2.352-1.706 6.32-1.706 8.672 0 .401.292.87.435 1.332.435.7 0 1.393-.326 1.842-.938a2.279 2.279 0 0 0-.503-3.174h-.007Z"
        fill="#DE285E"
      />
      <Path
        d="M125.332 29.181c-.904 7.81-6.395 14.211-13.98 16.298a2.288 2.288 0 0 0-1.38 1.08 13.454 13.454 0 0 1-7.713 6.266 18.355 18.355 0 0 0 2.188-3.9 2.27 2.27 0 0 0-1.686-3.086c-10.167-1.883-17.01-11.39-15.468-21.728.727-4.86 3.29-9.216 7.218-12.267 3.412-2.65 7.53-4.064 11.757-4.064.632 0 1.271.034 1.91.095a19.056 19.056 0 0 1 13.035 7.061 19.046 19.046 0 0 1 4.112 14.245h.007Zm-28.85 40.207a6.965 6.965 0 0 1-2.053 4.961 6.965 6.965 0 0 1-4.961 2.053h-1.176a262.947 262.947 0 0 0-.414-6.511 452.508 452.508 0 0 0 2.494-7.456 7.017 7.017 0 0 1 6.11 6.96v-.007ZM51.708 103.58c-16.08 0-32.35-5.519-32.35-16.067 0-10.547 1.413-36.237 5.75-46.024.801-1.808 2.61-3.677 3.9-4.451 1.156-.694 2.298-1.04 3.378-1.04 1.196 0 2.522.367 4.173 1.148 1.149.544 2.324 1.217 3.561 1.937 3.35 1.93 7.157 4.119 11.581 4.119 4.425 0 8.224-2.188 11.581-4.119 1.244-.713 2.413-1.393 3.568-1.937 1.651-.781 2.977-1.148 4.173-1.148 1.087 0 2.222.353 3.378 1.04 1.291.768 3.092 2.637 3.894 4.438 4.227 9.542 5.763 35.055 5.763 46.037 0 10.548-16.277 16.067-32.35 16.067Zm8.713 8.033v3.167c0 4.805-3.908 8.72-8.72 8.72-4.812 0-8.713-3.908-8.713-8.72v-7.17a74.32 74.32 0 0 0 8.713.503c2.977 0 5.831-.17 8.713-.523v4.016l.007.007ZM13.948 76.402a6.965 6.965 0 0 1-4.961-2.053 6.965 6.965 0 0 1-2.053-4.961c0-3.65 2.8-6.66 6.368-6.987.72 2.93 1.455 5.92 2.134 8.774a251.982 251.982 0 0 0-.312 5.227h-1.176Zm110.806-64.307c-4.016-4.988-9.739-8.094-16.121-8.733-6.055-.611-12.063 1.128-16.915 4.9-4.853 3.772-8.02 9.162-8.924 15.176-.924 6.158.564 12.322 4.187 17.365a23.689 23.689 0 0 0 3.969 4.302 525.003 525.003 0 0 1-4.194 13.715c-.85-6.64-2.215-14.45-4.315-19.18-1.095-2.466-3.44-5.137-5.716-6.497-1.876-1.121-3.792-1.685-5.709-1.685-1.916 0-3.833.503-6.117 1.584-1.318.625-2.623 1.372-3.887 2.106-3.14 1.808-6.103 3.514-9.31 3.514-3.209 0-6.172-1.706-9.312-3.514-1.264-.727-2.575-1.481-3.887-2.107-2.284-1.08-4.227-1.583-6.117-1.583-1.89 0-3.84.564-5.709 1.685-2.27 1.36-4.628 4.03-5.722 6.504-1.835 4.14-3.194 10.711-4.166 17.943l-.646-2.61c-1.006-4.058-1.876-7.558-2.467-10.072a2.258 2.258 0 0 0-.72-1.19c-3.806-3.303-6.559-8.515-7.768-14.686a2.273 2.273 0 0 0-2.665-1.794A2.273 2.273 0 0 0 .73 29.902c1.34 6.864 4.418 12.777 8.693 16.746.591 2.467 1.393 5.715 2.317 9.426.156.625.313 1.257.47 1.896-5.547.843-9.815 5.641-9.815 11.425a11.48 11.48 0 0 0 3.385 8.169 11.48 11.48 0 0 0 8.169 3.384h.979a213.545 213.545 0 0 0-.116 6.572c0 6.606 4.193 12.077 12.125 15.808 3.337 1.57 7.244 2.787 11.513 3.596v2.079c-7.334-.713-15.02 2.114-20.213 7.592-3.629 3.826-5.967 8.719-6.959 14.537-1.1 6.463-.469 13.925 1.869 22.183a2.27 2.27 0 0 0 2.182 1.651h72.74c1.013 0 1.91-.673 2.181-1.651 4.772-16.835 1.496-27.158-2.093-32.853a2.275 2.275 0 0 0-3.133-.714 2.276 2.276 0 0 0-.713 3.133c4.234 6.728 4.927 16.223 2.011 27.545h-5.634v-8.977c0-1.251-1.02-2.27-2.27-2.27a2.274 2.274 0 0 0-2.27 2.27v8.977H27.248v-8.977c0-1.251-1.02-2.27-2.27-2.27a2.274 2.274 0 0 0-2.27 2.27v8.977h-5.634c-1.787-6.932-2.229-13.157-1.311-18.533.836-4.914 2.78-9.012 5.776-12.172 4.343-4.588 10.82-6.898 16.916-6.151v1.224c0 7.312 5.947 13.259 13.26 13.259s13.252-5.947 13.252-13.259v-1.224c4.629-.564 9.59.639 13.6 3.337.387.265.829.388 1.264.388.727 0 1.447-.354 1.882-.999.7-1.04.429-2.454-.611-3.154-4.744-3.194-10.602-4.669-16.141-4.139v-2.107c12.879-2.473 23.637-8.76 23.637-19.383 0-2.08-.04-4.288-.115-6.572h.978a11.48 11.48 0 0 0 8.17-3.384 11.48 11.48 0 0 0 3.384-8.17c0-5.586-3.983-10.255-9.257-11.322a547.182 547.182 0 0 0 3.127-10.255 23.318 23.318 0 0 0 4.105 1.753 13.455 13.455 0 0 1-2.066 2.447c-2.359 2.195-.653 6.15 2.568 5.92 5.73-.402 10.902-3.5 13.953-8.34 8.917-2.827 15.305-10.534 16.393-19.886.741-6.36-1.067-12.62-5.084-17.609Z"
        fill="#DE285E"
      />
      <Path
        d="M105.133 36.047c-1.25 0-2.27 1.02-2.27 2.27v.306c0 1.25 1.02 2.27 2.27 2.27 1.251 0 2.27-1.02 2.27-2.27v-.306a2.27 2.27 0 0 0-2.27-2.27ZM107.716 12.954a8.205 8.205 0 0 0-8.264 5.518 2.264 2.264 0 0 0 1.414 2.882 2.267 2.267 0 0 0 2.881-1.414 3.651 3.651 0 0 1 3.691-2.453c1.794.109 3.289 1.604 3.404 3.405a3.639 3.639 0 0 1-3.636 3.88h-.849a3.49 3.49 0 0 0-3.487 3.487v4.003c0 1.25 1.02 2.27 2.27 2.27 1.251 0 2.27-1.02 2.27-2.27v-2.957a8.226 8.226 0 0 0 5.764-2.575 8.122 8.122 0 0 0 2.202-6.124 8.181 8.181 0 0 0-7.653-7.652h-.007ZM52.496 84.935a2.272 2.272 0 0 0 0 3.208 2.272 2.272 0 0 0 3.208 0 6.403 6.403 0 0 1 9.046 0 2.27 2.27 0 0 0 1.604.666 2.27 2.27 0 0 0 1.604-3.874c-4.268-4.268-11.207-4.268-15.469 0h.007Z"
        fill="#DE285E"
      />
      <G clipPath="url(#a)" fill="#4030A5">
        <Path d="M195.278 89.626c.533-1.408 1.124-2.802 1.688-3.84a1.903 1.903 0 0 1 2.193-.93 1.898 1.898 0 0 1 1.394 1.923c-.32 7.355 1.083 13.253 4.084 17.309v-9.394a1.515 1.515 0 0 1-.835.252 1.504 1.504 0 0 1-1.448-1.918c.568-2.021 2.139-3.564 4.341-4.837 3.307-1.908 8.023-3.185 12.982-4.526 1.042-.28 2.094-.564 3.131-.857 5.6-1.575 11.092-3.443 12.608-6.286a1.511 1.511 0 0 1 2.04-.622 1.51 1.51 0 0 1 .622 2.04c-.911 1.71-2.527 3.054-4.611 4.187.239 5.816 3.077 10.74 6.042 13.817.189-.172.383-.334.586-.488v-19.56c0-5.673-4.616-10.29-10.288-10.29h-12.134c-4.9 0-14.083 3.096-19.146 9.978-3.001 4.074-4.083 8.785-3.24 14.038l-.009.004Zm11.678 36.632a2.005 2.005 0 0 0 2.004-2.004 2.005 2.005 0 1 0-2.004 2.004Zm5.614-8.208a16.672 16.672 0 0 0 9.706 4.783c.041 0 .077.009.113.013.681.082 1.367.127 2.062.127 3.456 0 6.773-1.043 9.598-3.01a16.803 16.803 0 0 0 5.631-6.687c-2.378-2.04-3.908-5.199-3.908-8.745 0-2.32.655-4.477 1.778-6.264-3.249-3.284-6.416-8.532-7.021-14.787-2.969 1.183-6.475 2.13-10.072 3.1-4.62 1.25-9.665 2.613-12.657 4.463a15.895 15.895 0 0 0-.153 2.17c.027 16.218-.063 11.773.085 14.652a16.675 16.675 0 0 0 4.838 10.185Zm10.676 21.158s1.81.366 8.659-5.243c3.633-2.974 6.733-6.047 7.527-7.035v-7.784a19.697 19.697 0 0 1-3.66 3.29 19.702 19.702 0 0 1-12.12 3.533c-.009 1.092.054.772-.176 1.782-2.333 10.28-.438 11.372-.23 11.457Zm21.908-19.439a1.5 1.5 0 0 1 1.232-.848 1.496 1.496 0 0 1 1.353.631c.325.425 1.747 1.214 3.421 1.67-1.137-1.345-2.103-3.258-2.464-5.97a9.463 9.463 0 0 1-6.241-.289v9.639c.402.081.799.18 1.187.298.171-1.67.677-3.389 1.521-5.131h-.009Zm8.027-15.243c0-4.472-3.226-8.104-7.197-8.104s-7.197 3.637-7.197 8.104c0 4.467 3.226 8.104 7.197 8.104s7.197-3.637 7.197-8.104Zm5.654-20.152c-1.187-5.383-4.264-10.622-8.113-14.21a20.87 20.87 0 0 1 1.164 6.904v18.388c2.022 1.566 3.497 3.908 4.057 6.624 4.034-6.746 3.885-13.198 2.888-17.71l.004.004Zm10.158-12.78c0-6.935-5.415-12.58-12.071-12.58-3.827 0-7.355 1.846-9.634 4.991l.149.185c6.606 3.285 12.237 10.812 14.214 18.984 4.39-1.95 7.342-6.498 7.342-11.58Zm-22.806 66.509a4.743 4.743 0 0 0-4.738 4.738v6.398h9.471v-6.43a4.742 4.742 0 0 0-4.738-4.706h.005Zm3.231 17.765a1.51 1.51 0 0 0 1.507-1.507v-2.112h-9.471v3.619h7.964Zm-53.327-82.071c4.954-6.733 13.672-10.595 20.066-11.137v-.424a5.962 5.962 0 0 1 5.956-5.956h8.985c1.651 0 3.289.194 4.877.577a1.505 1.505 0 0 1 1.111 1.819 1.504 1.504 0 0 1-1.819 1.11 17.96 17.96 0 0 0-4.174-.492h-8.984a2.945 2.945 0 0 0-2.942 2.942v.357h10.627c7.332 0 13.302 5.965 13.302 13.302v17.968a9.453 9.453 0 0 1 2.888-.45c1.002 0 1.972.157 2.888.455V77.073c0-6.07-3.046-11.777-8.402-15.108a1.502 1.502 0 0 1-.483-2.075 1.503 1.503 0 0 1 2.076-.483 21.192 21.192 0 0 1 3.127 2.373c2.852-3.65 7.116-5.78 11.732-5.78 8.316 0 15.085 6.994 15.085 15.595 0 6.53-3.967 12.35-9.792 14.61.754 5.79-.059 13.534-6.381 21.263-.663 2.64-2.197 4.887-4.246 6.358.154 2.401.993 5.884 4.368 7.261a1.71 1.71 0 0 1 1.052 1.683 1.713 1.713 0 0 1-1.264 1.543c-2.761.744-6.331-.185-8.587-1.476-.379 1.142-.568 2.252-.568 3.317a14.422 14.422 0 0 1 7.35 12.59V154.37a4.523 4.523 0 0 1-4.521 4.521h-34.601a4.526 4.526 0 0 1-4.521-4.521v-.871c-1.738-.88-2.703-2.473-3.015-4.937l-.027-.248v-.013c0-.036-.009-.072-.009-.113v-.014c0-.036-.009-.076-.009-.112 0-.023 0-.05-.004-.073v-.031c-.122-1.629.072-3.434.568-5.343.74-2.856 2.135-5.898 4.088-8.79a1.51 1.51 0 0 1 2.5 1.688 28.284 28.284 0 0 0-2.63 4.828l-.041.104c-.194.469-.375.929-.533 1.385-.762 2.22-1.101 4.327-.929 6.087v.027c0 .018 0 .032.004.05 0 .022 0 .041.009.063v.023c0 .031.009.063.014.094.384 3.042 3.84 3.227 4.224 3.236a1.507 1.507 0 0 1-.028 3.014h-.027a7.831 7.831 0 0 1-1.132-.108v.04a1.51 1.51 0 0 0 1.507 1.508h23.618v-13.032c0-4.273 3.474-7.753 7.752-7.753 1.688 0 3.253.542 4.526 1.462a11.417 11.417 0 0 0-6.132-8.05 1.873 1.873 0 0 1-.226-.108 11.203 11.203 0 0 0-1.936-.699c-.131.582-.835 1.647-4.548 5.076-2.906 2.68-5.961 5.158-8.389 6.791-2.689 1.81-4.652 2.672-6.146 2.672-.442 0-.839-.077-1.204-.222-3.164-1.281-2.866-6.064-2.767-7.634.104-1.634.366-3.308.628-4.693-1.918 1.25-1.954 1.841-2.897 1.841-1.377 0-2.031-1.71-1.011-2.627a17.888 17.888 0 0 1 4.548-2.996v-.275a19.688 19.688 0 0 1-10.198-5.437 19.683 19.683 0 0 1-5.645-11.48c-.022-.018-.045-.041-.067-.059-1.426 3.863-2.13 7.162-1.913 9.066.076.672.473 1.611 1.204 2.486a4.98 4.98 0 0 1 2.938-.952 5.025 5.025 0 0 1 5.018 5.018 5.025 5.025 0 0 1-5.018 5.018 5.025 5.025 0 0 1-4.761-6.607c-1.317-1.353-2.202-3.045-2.382-4.62-.393-3.479 1.34-8.632 2.621-11.859-2.761-3.578-4.395-8.366-4.832-14.16a58.827 58.827 0 0 0-.7 2.117 1.896 1.896 0 0 1-1.818 1.344h-.005a1.905 1.905 0 0 1-1.827-1.344c-2.36-7.586-1.386-14.62 2.829-20.342l.005-.01Z" />
        <Path d="M213.716 97.445c.835 0 1.507.677 1.507 1.507v1.684a1.507 1.507 0 1 1-3.014 0v-1.684c0-.83.672-1.507 1.507-1.507ZM225.899 100.636v-1.684a1.507 1.507 0 0 1 3.015 0v1.684a1.508 1.508 0 0 1-3.015 0ZM216.599 110.511a3.967 3.967 0 0 0 3.962 3.962 3.967 3.967 0 0 0 3.962-3.962v-.442h-7.924v.442Zm-.311-3.456h8.542a2.705 2.705 0 0 1 2.703 2.703v.753c0 3.849-3.132 6.976-6.976 6.976-3.845 0-6.977-3.131-6.977-6.976v-.753a2.705 2.705 0 0 1 2.703-2.703h.005ZM225.39 95.796a1.491 1.491 0 0 1-.898.298c-.461 0-.916-.208-1.21-.61a1.505 1.505 0 0 1 .307-2.107c2.604-1.94 5.356-1.94 7.965 0 .667.497.807 1.44.306 2.107a1.5 1.5 0 0 1-2.107.307c-1.53-1.137-2.834-1.137-4.363 0v.005ZM209.569 93.377c2.604-1.94 5.356-1.94 7.965 0 .667.497.807 1.44.306 2.107a1.5 1.5 0 0 1-2.107.307c-1.53-1.137-2.834-1.137-4.363 0a1.49 1.49 0 0 1-.898.298c-.461 0-.916-.207-1.21-.61a1.505 1.505 0 0 1 .307-2.106v.004Z" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" transform="matrix(-1 0 0 1 272 52)" d="M0 0h80v102.882H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  </Wrapper>
);

const Wrapper = styled.View`
  width: 100%;
  padding-vertical: 30px;
  padding-left: 20%;
  align-items: center;
  justify-content: center;
`;

export default NeedHelp;