import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const StyledSvg = styled(Svg)``;

const CreativityIcon = ({ size, ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 250 250" {...props}>
    <Path
      fill="#F0F0F0"
      d="M125 246.001c69.036 0 125-29.326 125-65.502 0-36.176-55.964-65.503-125-65.503S0 144.323 0 180.499s55.964 65.502 125 65.502Z"
    />
    <Path
      fill="#E0E0E0"
      d="M171.635 218.338c7.843 0 14.201-3.671 14.201-8.198 0-4.528-6.358-8.199-14.201-8.199-7.844 0-14.202 3.671-14.202 8.199 0 4.527 6.358 8.198 14.202 8.198Z"
    />
    <Path
      fill="#E0E0E0"
      d="M124.053 230.876c20.698 0 37.477-9.686 37.477-21.635 0-11.949-16.779-21.636-37.477-21.636-20.699 0-37.478 9.687-37.478 21.636s16.779 21.635 37.478 21.635Z"
    />
    <Path
      fill="#263238"
      d="M133.316 32.377c-.414.61-.798 1.24-1.148 1.89-1.204 2.373-1.271 5.232-2.029 7.802-.758 2.57-1.89 5.016-3.807 6.877a14.2 14.2 0 0 1-7.062 3.534 32.325 32.325 0 0 1-7.97.462 26.379 26.379 0 0 1-6.025-.78c-4.091-1.148-7.151-4.035-7.246-8.65-.05-2.72 1.371-5.422 5.133-7.078-2.786-2.196-3.02-6.877-.445-9.324 1.722-1.633 4.224-2.151 6.131-3.533 3.333-2.375 3.132-6.326 4.759-9.67a17.173 17.173 0 0 1 8.199-8.076c5.329-2.424 12.173-1.432 17.362.97 3.606 1.672 6.761 4.866 7.274 8.806.557 4.364-2.358 8.728-6.349 10.59-1.471.685-3.059 1.08-4.564 1.705a1.297 1.297 0 0 0-.558.356 1.635 1.635 0 0 0-.212.803 7.868 7.868 0 0 1-1.443 3.316Z"
    />
    <Path fill="#263238" d="M135.634 45.84a7.602 7.602 0 1 0-7.751-7.45 7.602 7.602 0 0 0 7.751 7.45Z" />
    <Path
      fill="#B16668"
      d="M199.642 84.13a40.018 40.018 0 0 1-6.46-1.906s4.164-.859 4.459-2.609c.385-2.162-2.291-.094-6.03-.624-3.3-.474-6.131.134-7.804-.362l-25.56-9.163s-9.041-19.556-11.616-22.42c-2.575-2.865-4.252-3.484-8.109-3.991l1.443 16.235s6.956 13.147 8.918 16.352c1.962 3.204 2.391 3.99 7.062 5.506 6.131 1.995 22.439 4.96 27.138 7.011 6.131 2.659 13.009 5.29 16.721 3.272 1.672-.909 2.536-2.542 3.032-3.623.669-1.538-.998-3.283-3.194-3.678Z"
    />
    <Path
      fill="#39CEC1"
      d="M122.252 25.145a78.474 78.474 0 0 0 8.166-5.217c5.534-3.997 7.803-6.784 7.803-6.784s.869 6.566-3.645 10.384c-4.515 3.818-11.215 4.013-11.387 4.036-.173.022-.937-2.42-.937-2.42Z"
    />
    <Path
      fill="#263238"
      d="m114.85 12.593-3.784-2.157a2.048 2.048 0 0 1 1.224-1.134 2.06 2.06 0 0 1 1.663.148 2.405 2.405 0 0 1 .897 3.143Z"
    />
    <Path
      fill="#263238"
      d="m114.923 11.43-1.187-4.325a2.087 2.087 0 0 1 2.316.699c.177.227.305.488.376.767a2.38 2.38 0 0 1-1.505 2.86ZM143.148 192.981l1.114-1.399c.558 3.244 3.623 6.861 6.577 9.558 2.347 2.14 5.847 4.76 5.758 6.956-.112 2.619-4.459 3.31-6.649 2.926-2.548-.452-5.842-1.895-7.636-4.102-1.26-1.55-3.043-3.584-3.946-4.799-.903-1.215-2.977-2.58-3.462-3.99-.267-.775.051-2.469.424-3.902.346-1.315.719-2.786 1.17-2.636v.814c.558.596 3.016 1.388 4.699 1.449 1.081.067 1.962-.045 1.951-.875ZM106.496 198.011a36.82 36.82 0 0 0-.558 6.019c-.072 3.651-.741 4.949-.83 7.942-.101 3.428.613 5.573 2.006 7.48 1.394 1.906 5.825 2.719 7.369-.558 1.543-3.277 1.343-5.384.847-8.744-.507-3.472-.558-5.39-.87-8.043a79.2 79.2 0 0 0-.557-4.107l-7.407.011Z"
    />
    <Path
      fill="#B16668"
      d="M104.963 156.378c.853-8.805 2.118-12.5 2.285-14.49 0 0 1.332-20.666.808-38.155-.256-8.421-.446-17.7 5.635-27.688l28.164-.412c3.149 11.704 6.309 54.395 5.044 66.991-.741 7.317-2.954 44.285-2.954 44.285v2.942a8.059 8.059 0 0 0 1.382 4.03 35.75 35.75 0 0 0 4.693 6.398c.82.864 1.594 1.769 2.319 2.714 1.817 2.118.384 3.004-2.414 2.631-2.948-.396-5.423-2.681-6.721-4.459-1.94-2.681-6.332-6.989-6.689-8.533h-.033v-.183s-.179-2.336-.418-5.122c-.24-2.787-4.822-25.431-4.927-33.551-.045-3.868.975-9.62.975-9.62l-3.21-29.783s-5.017 21.295-6.131 30.318c-.987 7.842-5.234 30.954-7.603 41.376a51.123 51.123 0 0 0-1.26 11.927v.028c0 1.159.385 10.4.034 13.013-.73 5.462-5.574 4.977-6.527.619-.808-3.706-.853-12.222-.892-13.643a145.164 145.164 0 0 0-.139-3.378c-.1-.747-2.413-28.017-1.421-38.255Z"
    />
    <Path
      fill="#39CEC1"
      d="m121.656 43.246-7.853.418c1.538 9.145-2.787 17.193-2.787 17.193l2.881 14.49c-.156.257.429 2.325-.657 4.939 5.016 6.688 22.707 8.7 30.727 2.786a65.243 65.243 0 0 0-1.003-6.871l1.521-8.583c-.15-6.939-4.737-20.17-5.958-24.6l-6.644-.463-10.227.69Z"
    />
    <Path
      fill="#B16668"
      d="M138.226 13.145c2.23.98 4.403 4.43 4.37 14.083-.028 8.176-2.536 10.25-3.807 10.857-1.271.607-3.74.3-6.131-.072v4.703s1.806 1.767 1.176 2.887c-.63 1.12-2.971 2.057-6.599.92-4.113-1.293-4.877-3.266-4.877-3.266l-.256-11.063s-1.388 1.455-3.818-.674c-2.012-1.762-2.731-4.782-1.226-6.438 1.504-1.655 3.45-1.788 5.2.062 0 0 3.656.501 8.483-2.525 4.933-3.099 7-6.337 7.485-9.474Z"
    />
    <Path
      fill="#263238"
      d="M138.438 24.447a1.11 1.11 0 0 0 .688 1.03 1.115 1.115 0 1 0-.688-1.03ZM129.76 24.985a1.111 1.111 0 0 0 .668 1.05 1.117 1.117 0 0 0 1.224-.224 1.11 1.11 0 0 0 .255-1.218 1.117 1.117 0 0 0-1.811-.378c-.208.203-.329.48-.336.77Z"
    />
    <Path
      fill="#9A4A4D"
      d="m131.454 32.332 2.871.892a1.467 1.467 0 0 1-1.237 1.158c-.2.027-.403.012-.597-.043a1.673 1.673 0 0 1-1.037-2.007Z"
    />
    <Path
      fill="#263238"
      d="m141.314 22.422-2.787-1.115a1.445 1.445 0 0 1 1.361-.975c.199-.001.396.039.579.117a1.556 1.556 0 0 1 .847 1.973ZM122.274 24.898v3.456a1.609 1.609 0 0 0 1.563-1.022 1.62 1.62 0 0 0 .11-.65 1.787 1.787 0 0 0-1.673-1.784Z"
    />
    <Path
      fill="#9A4A4D"
      d="m134.787 23.828.875 6.644 2.96-1.438-3.835-5.206ZM132.647 38.01c-2.536-.294-7.758-1.75-8.611-3.9a5.573 5.573 0 0 0 1.873 2.697c1.582 1.354 6.738 2.787 6.738 2.787V38.01Z"
    />
    <Path
      fill="#37474F"
      d="M146.208 97.773a118.559 118.559 0 0 0-2.508-21.93c.618-7.33 2.201-13.711.301-20.466-1.115-4.024-3.345-10.166-5.485-12.345 0 0-2.553-.97-4.715-.329 0 0 4.08 3.952 5.261 13.02-3.071.122-9.235.295-12.903.702a47.225 47.225 0 0 0-4.503-13.181 20.296 20.296 0 0 0-5.602.301 53.59 53.59 0 0 1 5.083 20.342c.106 2.397.196 5.072.051 7.591 0 0-.508 4.871-7.296 3.863-4.231 6.771-6.583 11.235-6.728 35.668-.039 6.365-.301 31.149-.301 31.149-2.786 8.645-2.591 20.989-2.591 20.989s.473 2.882 7.167 3.25c6.694.367 8.361-1.773 8.361-1.773s2.229-10.639 3.4-20.621c1.17-9.982 5.612-28.424 5.612-28.424l3.021 28.268a41.941 41.941 0 0 0-1.02 8.405c0 3.344.859 9.953.859 9.953s1.549 1.985 7.011 1.767c5.462-.217 7.118-2.14 7.118-2.14s1.499-19.166 1.767-27.309c.211-6.688-.535-25.375-1.36-36.75Z"
    />
    <Path
      fill="#B16668"
      d="M114.076 89.828a17.943 17.943 0 0 1-5.329-2.19l.781-3.188a18.345 18.345 0 0 0-4.209.066c-.875.078-1.672-.607-2.43-1.376-.462-.485-4.877-5.228-7.635-9.81l15.132-13.787 1.059 3.528c6.816-3.15 5.574-13.817 2.335-19.407-3.249-.067-6.17.63-9.854 4.459-3.773 3.951-16.33 15.962-19.251 20.064-2.92 4.102-3.1 8.159 9.13 19.361a92.693 92.693 0 0 0 8.22 6.733c6.789 4.653 10.702 3.004 13.282 1.61 4.961-2.663 3.066-5.043-1.231-6.063Z"
    />
    <Path
      fill="#263238"
      d="m128.801 115.617 2.531-16.135s5.451-.785 10.5-6.275c0 0-1.672 4.804-7.803 7.608l-2.681 15.153-.317 20.621-2.23-20.972Z"
    />
    <Path fill="#37474F" d="M73.667 88.249a7.458 7.458 0 1 1-9.977-3.472 7.447 7.447 0 0 1 9.977 3.472Z" />
    <Path
      fill="#455A64"
      d="M59.114 95.833c-5.685-.424-7.692-4.582-4.459-9.297 3.233-4.715 10.412-8.198 16.097-7.802 5.685.395 7.697 4.575 4.492 9.29-3.205 4.715-10.44 8.215-16.13 7.809Z"
    />
    <Path
      fill="#37474F"
      d="M57.698 93.517c-5.863-.434-7.93-4.72-4.626-9.58 3.305-4.86 10.73-8.45 16.593-8.015 5.863.435 7.931 4.72 4.626 9.58-3.305 4.86-10.735 8.444-16.593 8.015Z"
    />
    <Path
      fill="#455A64"
      d="M56.238 91.14c-6.042-.445-8.176-4.865-4.771-9.875 3.405-5.01 11.064-8.706 17.106-8.26 6.041.446 8.17 4.866 4.765 9.87-3.406 5.005-11.064 8.712-17.1 8.266Z"
    />
    <Path
      fill="#37474F"
      d="M54.728 88.692c-6.226-.463-8.428-5.016-4.916-10.177 3.511-5.161 11.403-8.979 17.629-8.516 6.226.463 8.427 5.016 4.916 10.177-3.511 5.16-11.404 8.967-17.63 8.516Z"
    />
    <Path
      fill="#455A64"
      d="M53.245 86.075c-6.354-.468-8.6-5.117-5.016-10.383 3.584-5.267 11.632-9.157 17.986-8.689 6.354.468 8.6 5.116 5.016 10.383-3.584 5.267-11.632 9.157-17.986 8.689Z"
    />
    <Path
      fill="#39CEC1"
      d="M24.468 3.546A35.509 35.509 0 0 0 7.954 50.969C20.216 76.355 43.2 70.475 48.145 80.686c.786 1.632 2.648 2.741 5.406 2.942 5.507.407 12.497-2.965 15.607-7.535 1.555-2.285 1.845-4.459 1.059-6.064-4.944-10.232 13.967-24.567 1.705-49.953A35.511 35.511 0 0 0 37.89.06c-4.66.27-9.22 1.454-13.42 3.487Z"
    />
    <Path
      fill="#fff"
      d="M24.468 3.546A35.509 35.509 0 0 0 7.954 50.969C20.216 76.355 43.2 70.475 48.145 80.686c.786 1.632 2.648 2.741 5.406 2.942 5.507.407 12.497-2.965 15.607-7.535 1.555-2.285 1.845-4.459 1.059-6.064-4.944-10.232 13.967-24.567 1.705-49.953A35.511 35.511 0 0 0 37.89.06c-4.66.27-9.22 1.454-13.42 3.487Z"
      opacity={0.6}
    />
    <Path
      fill="#39CEC1"
      d="M54.8 81.31c-4.147-.307-5.607-3.345-3.272-6.773 2.336-3.428 7.592-5.975 11.705-5.668 4.113.306 5.607 3.344 3.272 6.772-2.336 3.427-7.564 5.975-11.705 5.668Z"
    />
    <Path
      fill="#fff"
      d="M62.91 72.237a1.204 1.204 0 0 1-1.594-.557 86.126 86.126 0 0 1-6.588-19.317 43.554 43.554 0 0 1-.859-5.852c-1.141.12-2.292.12-3.433 0a21.017 21.017 0 0 1-5.964-1.522 20.822 20.822 0 0 1-2.52 5.585c-.61.97-1.322 1.872-2.123 2.692a43.425 43.425 0 0 1 4.047 4.313 85.826 85.826 0 0 1 11.069 17.194 1.22 1.22 0 0 1-.59 1.594 1.204 1.204 0 0 1-1.6-.597A85.751 85.751 0 0 0 42.02 59.112a40.214 40.214 0 0 0-4.064-4.28c-2.469 1.672-5.016 1.895-6.905 1.148-1.89-.747-2.954-2.452-2.631-4.253a3.193 3.193 0 0 1 2.385-2.664c1.873-.485 4.387.463 7.202 2.636.738-.727 1.39-1.54 1.94-2.418a18.43 18.43 0 0 0 2.362-5.44c-2.58-1.566-4.213-3.556-4.525-5.334a3.389 3.389 0 0 1 5.84-2.82c1.2 1.355 1.74 3.902 1.36 6.867 1.816.815 3.75 1.33 5.73 1.527a13.68 13.68 0 0 0 3.105 0c.05-3.556.864-6.13 2.413-7.284a3.227 3.227 0 0 1 3.55-.19c1.612.864 2.292 2.753 1.673 4.704-.619 1.95-2.363 3.795-5.19 4.698a39.32 39.32 0 0 0 .826 5.841 85.511 85.511 0 0 0 6.376 18.765 1.21 1.21 0 0 1-.524 1.622h-.033ZM31.224 51.454c-.184.09-.346.268-.424.708-.178.975.825 1.45 1.115 1.572a4.81 4.81 0 0 0 4.03-.519c-2.185-1.566-3.79-2.023-4.576-1.817a.656.656 0 0 0-.145.056Zm25.009-8.008a4.85 4.85 0 0 0 2.915-2.837c.094-.318.35-1.4-.53-1.867-.507-.273-.77-.162-.964 0-.652.462-1.288 2-1.422 4.704ZM40.681 37.13a.803.803 0 0 0-.557.98c.161.915 1.047 2.085 2.547 3.155.095-1.839-.273-3.266-.886-3.957a.808.808 0 0 0-1.104-.195v.017Z"
    />
    <Path
      fill="#FFA8A7"
      d="m185.162 180.923-16.164 28.424a1 1 0 0 1-1.052.479.995.995 0 0 1-.798-.836l-4.509-32.576 22.523 4.509Z"
    />
    <Path
      fill="#263238"
      d="M167.159 209.001a1.002 1.002 0 0 0 .798.836 1 1 0 0 0 1.052-.479l3.155-5.574a5.502 5.502 0 0 1-5.573-1.377l-.396-.395.964 6.989Z"
    />
    <Path
      fill="#39CEC1"
      d="m188.606 40.95-.557 2.97-.702 3.583L162.65 176.42c1.867 3.176 5.139 5.227 8.656 6.264 5.345 1.594 11.275.858 13.839-1.761l24.669-128.837 1.315-6.861c-1.098 4.392-23.565.145-22.523-4.275Z"
    />
    <Path
      fill="#fff"
      d="m188.606 40.95-.557 2.97-.702 3.583L162.65 176.42c1.867 3.176 5.139 5.227 8.656 6.264 5.345 1.594 11.275.858 13.839-1.761l24.669-128.837 1.315-6.861c-1.098 4.392-23.565.145-22.523-4.275Z"
      opacity={0.5}
    />
    <Path
      fill="#EBEBEB"
      d="m186.405 52.258-1.26 6.644c-.429 1.911 3.433 3.929 8.087 5.255 6.176 1.784 13.901 1.472 14.492-1.058l.936-4.894.307-1.756c-.558 2.53-8.299 2.848-14.492 1.065-4.459-1.277-8.204-3.205-8.093-5.044a.384.384 0 0 1 .023-.212Z"
    />
    <Path
      fill="#39CEC1"
      d="M186.104 53.917c-1.009 4.46 21.542 8.634 22.545 4.192l1.282-6.644c-1.003 4.459-23.549.25-22.545-4.192l-1.282 6.644Z"
    />
    <Path
      fill="#EBEBEB"
      d="m188.606 40.95-1.27 6.554c-1.015 4.353 20.706 8.583 22.478 4.581a.937.937 0 0 0 .089-.245l1.226-6.616c-1.098 4.392-23.565.145-22.523-4.275Z"
    />
    <Path
      fill="#000"
      d="m209.814 52.083 1.315-6.86c-.496 1.984-5.378 2.614-10.517 1.833l-26.085 136.339-5.495 25.96 16.163-28.423 24.619-128.849Z"
      opacity={0.1}
    />
    <Path
      fill="#F28F8F"
      d="M216.569 16.835c0-.073.05-.145.067-.218.558-2.887-4.063-6.175-10.283-7.35-6.22-1.177-11.705.211-12.262 3.087l-5.496 28.585c-.44 1.895 3.378 3.901 7.987 5.256 6.165 1.8 13.934 1.538 14.536-.981l5.39-27.961c0-.128.039-.251.056-.385.005.006 0-.011.005-.033Z"
    />
    <Path
      fill="#000"
      d="m207.679 9.559-7.067 37.502c5.089.73 10.033.145 10.512-1.839l5.384-27.972c0-.128.039-.251.056-.385v-.056c0-.022.05-.145.067-.217.507-2.653-3.417-5.673-8.952-7.033Z"
      opacity={0.1}
    />
    <Path
      fill="#FFA8A7"
      d="M216.636 16.618c.544-2.886-4.058-6.176-10.281-7.35-6.222-1.173-11.707.215-12.252 3.1-.544 2.886 4.059 6.177 10.281 7.35 6.223 1.174 11.708-.214 12.252-3.1Z"
    />
    <Path
      fill="#39CEC1"
      d="M28.342 98.061a.558.558 0 0 0-.14.396l.112 1.889a.972.972 0 0 1-.457.764 6.37 6.37 0 0 0-.502.368c-.256.217-.596.329-.769.223l-.128-3.01-1.945 2.229a1.089 1.089 0 0 0-.112.151l-.841 1.449c-.179.306-.212.669-.067.808l1.338 1.343a.986.986 0 0 1 .105.814v.084a1.338 1.338 0 0 0-.395-.118l-1.951 2.23a.55.55 0 0 0-.145.412l.334 2.14a.484.484 0 0 0 .508.402l1.583-.123a.632.632 0 0 1 .59.329c.163.345.349.678.558.997a1.03 1.03 0 0 1-.045.87l-.646 1.376c-.145.307-.134.664 0 .786l1.616 1.293c.14.117.407 0 .613-.217l1.321-1.527a.44.44 0 0 1 .307-.034c.305.105.618.185.936.24a.664.664 0 0 1 .502.463l.49 1.895a.474.474 0 0 0 .557.317l1.706-.356a.502.502 0 0 0 .279-.173l1.956-2.263-1.928-.028a.952.952 0 0 1 .457-.758c.172-.115.337-.239.496-.373.262-.212.602-.329.774-.223l1.544.97c.134.083.346 0 .513-.19l1.95-2.229-.991-.613-1.249-.875a.97.97 0 0 1-.106-.808 9.44 9.44 0 0 0 .162-.881.87.87 0 0 1 .524-.674l1.41-.485a.6.6 0 0 0 .268-.184l1.961-2.263-2.05.396-.107-.691a.483.483 0 0 0-.507-.407l-1.583.128a.644.644 0 0 1-.596-.334c-.162-.351-.1-.881-.307-1.193-.117-.173-.345-.362-.2-.669l.646-1.376a.728.728 0 0 0 0-.792l-1.616-1.293c-.156-.128-.457 0-.675.29l-.835 1.115a.803.803 0 0 1-.742.384 5.245 5.245 0 0 0-.93-.239.687.687 0 0 1-.53-.48l-.485-1.9a.453.453 0 0 0-.351-.312l-.245-1.689-1.94 2.23Zm6.298 8.611c.362 2.319-.97 4.537-2.982 4.96-2.012.424-3.506-1.482-3.868-3.801-.362-2.318.558-4.18 2.553-4.598 1.995-.418 3.935 1.115 4.297 3.433v.006Z"
    />
    <Path
      fill="#000"
      d="M28.342 98.061a.558.558 0 0 0-.14.396l.112 1.889a.972.972 0 0 1-.457.764 6.37 6.37 0 0 0-.502.368c-.256.217-.596.329-.769.223l-.128-3.01-1.945 2.229a1.089 1.089 0 0 0-.112.151l-.841 1.449c-.179.306-.212.669-.067.808l1.338 1.343a.986.986 0 0 1 .105.814v.084a1.338 1.338 0 0 0-.395-.118l-1.951 2.23a.55.55 0 0 0-.145.412l.334 2.14a.484.484 0 0 0 .508.402l1.583-.123a.632.632 0 0 1 .59.329c.163.345.349.678.558.997a1.03 1.03 0 0 1-.045.87l-.646 1.376c-.145.307-.134.664 0 .786l1.616 1.293c.14.117.407 0 .613-.217l1.321-1.527a.44.44 0 0 1 .307-.034c.305.105.618.185.936.24a.664.664 0 0 1 .502.463l.49 1.895a.474.474 0 0 0 .557.317l1.706-.356a.502.502 0 0 0 .279-.173l1.956-2.263-1.928-.028a.952.952 0 0 1 .457-.758c.172-.115.337-.239.496-.373.262-.212.602-.329.774-.223l1.544.97c.134.083.346 0 .513-.19l1.95-2.229-.991-.613-1.249-.875a.97.97 0 0 1-.106-.808 9.44 9.44 0 0 0 .162-.881.87.87 0 0 1 .524-.674l1.41-.485a.6.6 0 0 0 .268-.184l1.961-2.263-2.05.396-.107-.691a.483.483 0 0 0-.507-.407l-1.583.128a.644.644 0 0 1-.596-.334c-.162-.351-.1-.881-.307-1.193-.117-.173-.345-.362-.2-.669l.646-1.376a.728.728 0 0 0 0-.792l-1.616-1.293c-.156-.128-.457 0-.675.29l-.835 1.115a.803.803 0 0 1-.742.384 5.245 5.245 0 0 0-.93-.239.687.687 0 0 1-.53-.48l-.485-1.9a.453.453 0 0 0-.351-.312l-.245-1.689-1.94 2.23Zm6.298 8.611c.362 2.319-.97 4.537-2.982 4.96-2.012.424-3.506-1.482-3.868-3.801-.362-2.318.558-4.18 2.553-4.598 1.995-.418 3.935 1.115 4.297 3.433v.006Z"
      opacity={0.3}
    />
    <Path
      fill="#39CEC1"
      d="m30.627 115.134.485 1.872a.43.43 0 0 0 .279.29l2.413-2.787h-.111a.952.952 0 0 1 .457-.758v-2.681l-3.523 4.064Z"
    />
    <Path
      fill="#000"
      d="m30.627 115.134.485 1.872a.43.43 0 0 0 .279.29l2.413-2.787h-.111a.952.952 0 0 1 .457-.758v-2.681l-3.523 4.064Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="M28.782 110.359a5.21 5.21 0 0 1-.412-.691l-2.319 2.67c-.013.137-.05.27-.106.395l-.646 1.377a.977.977 0 0 0-.095.558l3.567-4.114.011-.195Z"
    />
    <Path
      fill="#000"
      d="M28.782 110.359a5.21 5.21 0 0 1-.412-.691l-2.319 2.67c-.013.137-.05.27-.106.395l-.646 1.377a.977.977 0 0 0-.095.558l3.567-4.114.011-.195Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="M30.282 95.832a.558.558 0 0 0-.134.385l.117 1.895a.97.97 0 0 1-.457.763c-.173.117-.34.234-.502.368-.262.218-.602.329-.774.223l-.285-.178-.05-.814a.557.557 0 0 1 .145-.396l1.94-2.246Z"
    />
    <Path
      fill="#000"
      d="M30.282 95.832a.558.558 0 0 0-.134.385l.117 1.895a.97.97 0 0 1-.457.763c-.173.117-.34.234-.502.368-.262.218-.602.329-.774.223l-.285-.178-.05-.814a.557.557 0 0 1 .145-.396l1.94-2.246Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="m27.461 101.405-.089.062c-.256.217-.596.328-.769.222l-.128-3.01-1.945 2.23a1.047 1.047 0 0 0-.112.151l-.858 1.46c-.179.306-.212.669-.067.808l1.338 1.343c.07.088.113.195.122.307l2.614-3.015-.106-.558Z"
    />
    <Path
      fill="#000"
      d="m27.461 101.405-.089.062c-.256.217-.596.328-.769.222l-.128-3.01-1.945 2.23a1.047 1.047 0 0 0-.112.151l-.858 1.46c-.179.306-.212.669-.067.808l1.338 1.343c.07.088.113.195.122.307l2.614-3.015-.106-.558Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="m23.002 110.608 2.414-2.787-.558-2.29a1.72 1.72 0 0 0-.345-.09l-1.95 2.23a.557.557 0 0 0-.118.423l.334 2.141a.495.495 0 0 0 .223.373Z"
    />
    <Path
      fill="#000"
      d="m23.002 110.608 2.414-2.787-.558-2.29a1.72 1.72 0 0 0-.345-.09l-1.95 2.23a.557.557 0 0 0-.118.423l.334 2.141a.495.495 0 0 0 .223.373Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="m32.282 95.276-1.705.357a.557.557 0 0 0-.43.557l.118 1.895a.97.97 0 0 1-.457.764 5.26 5.26 0 0 0-.502.367c-.262.212-.602.33-.769.224l-1.544-.97c-.173-.106-.457.055-.64.356l-.86 1.427c-.177.301-.211.663-.066.808l1.338 1.343a.992.992 0 0 1 .105.814 7.586 7.586 0 0 0-.161.875.875.875 0 0 1-.524.68l-1.41.479a.589.589 0 0 0-.407.608l.334 2.134a.483.483 0 0 0 .508.407l1.582-.128a.637.637 0 0 1 .591.335c.16.345.346.676.558.992a1.034 1.034 0 0 1-.045.875l-.646 1.371c-.145.312-.14.663 0 .791l1.61 1.293c.162.128.463 0 .675-.284l.841-1.115c.212-.284.558-.451.736-.379.305.106.618.184.936.234a.686.686 0 0 1 .502.468l.49 1.895a.475.475 0 0 0 .558.318l1.672-.357a.557.557 0 0 0 .43-.557l-.112-1.895a.968.968 0 0 1 .457-.764c.173-.111.339-.234.496-.367.262-.212.602-.329.775-.223l1.543.969c.168.106.457-.05.636-.356l.858-1.427a.753.753 0 0 0 .073-.808l-1.26-1.343a.986.986 0 0 1-.106-.814c.067-.284.123-.557.162-.875a.869.869 0 0 1 .524-.674l1.41-.485a.599.599 0 0 0 .407-.602l-.34-2.14a.472.472 0 0 0-.502-.407l-1.583.128a.644.644 0 0 1-.596-.334 7.087 7.087 0 0 0-.558-.992 1.042 1.042 0 0 1 .045-.875l.646-1.371a.725.725 0 0 0 0-.792l-1.655-1.315c-.156-.128-.457 0-.674.29l-.836 1.114c-.218.285-.558.452-.742.38a5.301 5.301 0 0 0-.93-.235.698.698 0 0 1-.508-.462l-.484-1.9a.474.474 0 0 0-.563-.302Zm4.309 9.14c.362 2.319-.97 4.537-2.982 4.955-2.012.418-3.902-1.115-4.292-3.439-.39-2.324.97-4.536 2.977-4.954 2.006-.418 3.935 1.12 4.297 3.438ZM64.877 106.633l-1.845 2.279a.676.676 0 0 0-.133.351l-.251 4.019a.837.837 0 0 1-.496.685c-.645.256-1.263.575-1.845.953a.716.716 0 0 1-.753.089l-2.97-2.574c-.15-.134-.457 0-.68.256l-2.414 2.982c-.223.273-.306.635-.178.802l2.419 3.249a1.068 1.068 0 0 1 0 .875c-.162.379-.301.775-.43 1.176l-2.742.09-1.85 2.285a.606.606 0 0 0-.123.367l.15 4.498a.518.518 0 0 0 .413.524l3.579.334a.673.673 0 0 1 .512.452c.25.852.58 1.679.987 2.469a1.112 1.112 0 0 1-.167.891l-1.912 2.954c-.195.301-.24.664-.1.814l2.97 3.216c.14.15.452.078.697-.167l2.43-2.403c.245-.239.557-.351.758-.245.694.405 1.43.73 2.196.97a.702.702 0 0 1 .424.557l.524 4.097a.494.494 0 0 0 .48.44l3.9-.128a.426.426 0 0 0 .313-.167l1.845-2.28.15-3.299c.253-.134.498-.279.736-.435a.698.698 0 0 1 .752-.084l2.971 2.575c.15.134.457 0 .68-.262l2.413-2.976c.223-.278.307-.635.179-.808l-2.42-3.249a1.056 1.056 0 0 1 0-.87c.296-.71.531-1.445.703-2.195a.824.824 0 0 1 .557-.619l3.456-.557a.5.5 0 0 0 .301-.184l1.84-2.274-1.862-2.597a.56.56 0 0 0-.413-.524l-3.578-.335c-.217 0-.362-.278-.334-.557a7.92 7.92 0 0 0-.44-3.489 1.116 1.116 0 0 1 .178-.903l1.17-1.805c.195-.301.24-.664.1-.814l-2.97-3.216c-.14-.15-.452-.072-.697.167l-1.6 1.578a.816.816 0 0 1-.77.273 7.327 7.327 0 0 0-2.947-.318.469.469 0 0 1-.49-.412l-.525-4.097a.503.503 0 0 0-.479-.446l-.981-1.934-1.388-.044Zm7.586 19.417c.134 4.202-2.196 6.889-5.836 7.006-3.64.117-6.688-3.25-6.839-7.446-.15-4.197 2.23-6.822 5.842-6.928 3.611-.106 6.694 3.171 6.833 7.368Z"
    />
    <Path
      fill="#000"
      d="m64.877 106.633-1.845 2.279a.676.676 0 0 0-.133.351l-.251 4.019a.837.837 0 0 1-.496.685c-.645.256-1.263.575-1.845.953a.716.716 0 0 1-.753.089l-2.97-2.574c-.15-.134-.457 0-.68.256l-2.414 2.982c-.223.273-.306.635-.178.802l2.419 3.249a1.068 1.068 0 0 1 0 .875c-.162.379-.301.775-.43 1.176l-2.742.09-1.85 2.285a.606.606 0 0 0-.123.367l.15 4.498a.518.518 0 0 0 .413.524l3.579.334a.673.673 0 0 1 .512.452c.25.852.58 1.679.987 2.469a1.112 1.112 0 0 1-.167.891l-1.912 2.954c-.195.301-.24.664-.1.814l2.97 3.216c.14.15.452.078.697-.167l2.43-2.403c.245-.239.557-.351.758-.245.694.405 1.43.73 2.196.97a.702.702 0 0 1 .424.557l.524 4.097a.494.494 0 0 0 .48.44l3.9-.128a.426.426 0 0 0 .313-.167l1.845-2.28.15-3.299c.253-.134.498-.279.736-.435a.698.698 0 0 1 .752-.084l2.971 2.575c.15.134.457 0 .68-.262l2.413-2.976c.223-.278.307-.635.179-.808l-2.42-3.249a1.056 1.056 0 0 1 0-.87c.296-.71.531-1.445.703-2.195a.824.824 0 0 1 .557-.619l3.456-.557a.5.5 0 0 0 .301-.184l1.84-2.274-1.862-2.597a.56.56 0 0 0-.413-.524l-3.578-.335c-.217 0-.362-.278-.334-.557a7.92 7.92 0 0 0-.44-3.489 1.116 1.116 0 0 1 .178-.903l1.17-1.805c.195-.301.24-.664.1-.814l-2.97-3.216c-.14-.15-.452-.072-.697.167l-1.6 1.578a.816.816 0 0 1-.77.273 7.327 7.327 0 0 0-2.947-.318.469.469 0 0 1-.49-.412l-.525-4.097a.503.503 0 0 0-.479-.446l-.981-1.934-1.388-.044Zm7.586 19.417c.134 4.202-2.196 6.889-5.836 7.006-3.64.117-6.688-3.25-6.839-7.446-.15-4.197 2.23-6.822 5.842-6.928 3.611-.106 6.694 3.171 6.833 7.368Z"
      opacity={0.3}
    />
    <Path
      fill="#39CEC1"
      d="m57.559 113.283-.981-.847c-.15-.134-.457 0-.68.256l-2.413 2.982c-.223.273-.307.635-.179.802l2.42 3.25a.5.5 0 0 1 .072.217l3.099-3.829-1.338-2.831Z"
    />
    <Path
      fill="#000"
      d="m57.559 113.283-.981-.847c-.15-.134-.457 0-.68.256l-2.413 2.982c-.223.273-.307.635-.179.802l2.42 3.25a.5.5 0 0 1 .072.217l3.099-3.829-1.338-2.831Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="M63.378 139.07a.744.744 0 0 1 .123.318l.523 4.096c.02.099.064.191.129.268l2.09-2.581-.145-5.456-2.72 3.355Z"
    />
    <Path
      fill="#000"
      d="M63.378 139.07a.744.744 0 0 1 .123.318l.523 4.096c.02.099.064.191.129.268l2.09-2.581-.145-5.456-2.72 3.355Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="M54.003 136.882a.593.593 0 0 0 0 .558l2.97 3.216a.297.297 0 0 0 .285.067l2.38-2.932-2.787-4.459-2.848 3.55Z"
    />
    <Path
      fill="#000"
      d="M54.003 136.882a.593.593 0 0 0 0 .558l2.97 3.216a.297.297 0 0 0 .285.067l2.38-2.932-2.787-4.459-2.848 3.55Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="m50.943 129.464 2.937-3.628-.133-4.008-1.21.039-1.85 2.285a.607.607 0 0 0-.123.368l.15 4.498a.556.556 0 0 0 .23.446Z"
    />
    <Path
      fill="#000"
      d="m50.943 129.464 2.937-3.628-.133-4.008-1.21.039-1.85 2.285a.607.607 0 0 0-.123.368l.15 4.498a.556.556 0 0 0 .23.446Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="m69.09 106.34-3.9.129a.522.522 0 0 0-.452.524l-.251 4.018a.852.852 0 0 1-.496.685 10.21 10.21 0 0 0-1.85.953.698.698 0 0 1-.753.084l-2.965-2.575c-.156-.128-.463 0-.686.262l-2.407 2.976c-.223.279-.301.641-.179.808l2.42 3.25a1.027 1.027 0 0 1 0 .869 14.218 14.218 0 0 0-.703 2.196.813.813 0 0 1-.558.618l-3.455.558a.552.552 0 0 0-.424.557l.145 4.498a.56.56 0 0 0 .418.524l3.573.334a.654.654 0 0 1 .518.452c.248.852.576 1.679.981 2.468a1.05 1.05 0 0 1-.167.892l-1.912 2.954c-.195.301-.24.663-.1.814l2.976 3.215c.14.151.452.073.697-.167l2.424-2.402c.246-.239.558-.351.758-.251.703.41 1.451.736 2.23.97a.721.721 0 0 1 .424.557l.523 4.097a.495.495 0 0 0 .48.446l3.901-.128a.56.56 0 0 0 .452-.524l.25-4.019a.839.839 0 0 1 .502-.685 10.744 10.744 0 0 0 1.845-.953.698.698 0 0 1 .752-.084l2.966 2.569c.156.134.462 0 .685-.256l2.414-2.982a.754.754 0 0 0 .178-.802l-2.419-3.249a1.047 1.047 0 0 1 0-.875c.294-.71.529-1.442.702-2.191a.806.806 0 0 1 .558-.618l3.455-.558a.552.552 0 0 0 .424-.557l-.145-4.498a.518.518 0 0 0-.418-.523l-3.573-.335a.645.645 0 0 1-.513-.451 14.32 14.32 0 0 0-.986-2.469 1.048 1.048 0 0 1 .167-.892l1.912-2.954c.195-.301.24-.663.1-.814l-2.976-3.215c-.14-.151-.452-.078-.697.167l-2.424 2.402c-.245.24-.585.351-.758.245a10.661 10.661 0 0 0-2.202-.97.704.704 0 0 1-.424-.557l-.523-4.096a.492.492 0 0 0-.513-.441Zm5.19 17.439c.14 4.197-2.698 7.697-6.332 7.803-3.634.106-6.688-3.188-6.833-7.385-.145-4.196 2.698-7.702 6.332-7.802 3.634-.101 6.716 3.188 6.833 7.384Z"
    />
    <Path
      fill="#39CEC1"
      d="M64.883 106.633a.601.601 0 0 0-.14.362l-.25 4.013a.846.846 0 0 1-.496.686 9.922 9.922 0 0 0-1.288.613l.19-3.038a.677.677 0 0 1 .133-.357l1.85-2.279Z"
    />
    <Path
      fill="#39CEC1"
      d="M64.883 106.633a.601.601 0 0 0-.14.362l-.25 4.013a.846.846 0 0 1-.496.686 9.922 9.922 0 0 0-1.288.613l.19-3.038a.677.677 0 0 1 .133-.357l1.85-2.279Z"
    />
    <Path
      fill="#000"
      d="M64.883 106.633a.601.601 0 0 0-.14.362l-.25 4.013a.846.846 0 0 1-.496.686 9.922 9.922 0 0 0-1.288.613l.19-3.038a.677.677 0 0 1 .133-.357l1.85-2.279Z"
      opacity={0.1}
    />
    <Path
      fill="#39CEC1"
      d="M179.789 206.886c5.217-5.245 12.485-8.121 19.825-9.057 7.341-.936 14.793-.089 22.066 1.271 2.815.557 5.975 1.064 8.361-.558 2.385-1.621 3.021-5.211 1.945-7.953-1.076-2.742-3.478-4.77-6.036-6.225-9.381-5.345-21.966-4.581-30.817 1.605-7.803 5.456-12.507 13.03-15.322 20.917"
    />
    <Path
      fill="#000"
      d="M179.789 206.886c5.217-5.245 12.485-8.121 19.825-9.057 7.341-.936 14.793-.089 22.066 1.271 2.815.557 5.975 1.064 8.361-.558 2.385-1.621 3.021-5.211 1.945-7.953-1.076-2.742-3.478-4.77-6.036-6.225-9.381-5.345-21.966-4.581-30.817 1.605-7.803 5.456-12.507 13.03-15.322 20.917"
      opacity={0.3}
    />
    <Path
      fill="#39CEC1"
      d="M219.646 173.8a17.098 17.098 0 0 0-4.191.931c-.613.223-1.176.557-1.767.808a15.23 15.23 0 0 0-1.845 1.014c.132-.429.32-.839.557-1.22a12.882 12.882 0 0 1 2.397-3.211 30.872 30.872 0 0 1 10.724-6.956 29.283 29.283 0 0 1 8.282-1.889c3.757-.284 7.859.29 10.59 2.904 1.265 1.22 2.168 2.987 1.823 4.71a4.84 4.84 0 0 1-2.436 3.121 9.877 9.877 0 0 1-3.902 1.081c-3.344.334-6.755-.156-10.105-.652-3.349-.496-6.761-.97-10.127-.641Z"
    />
    <Path
      fill="#000"
      d="M219.646 173.8a17.098 17.098 0 0 0-4.191.931c-.613.223-1.176.557-1.767.808a15.23 15.23 0 0 0-1.845 1.014c.132-.429.32-.839.557-1.22a12.882 12.882 0 0 1 2.397-3.211 30.872 30.872 0 0 1 10.724-6.956 29.283 29.283 0 0 1 8.282-1.889c3.757-.284 7.859.29 10.59 2.904 1.265 1.22 2.168 2.987 1.823 4.71a4.84 4.84 0 0 1-2.436 3.121 9.877 9.877 0 0 1-3.902 1.081c-3.344.334-6.755-.156-10.105-.652-3.349-.496-6.761-.97-10.127-.641Z"
      opacity={0.15}
    />
    <Path
      fill="#39CEC1"
      d="M220.699 150.284c-4.732 8.031-11.074 13.933-18.331 19.551 3.21-6.404 4.431-13.415 4.921-20.493.491-7.078-.825-14.162-1.644-21.179-.463-3.979-.368-8.164 1.343-11.793 1.711-3.628 5.334-6.554 9.342-6.498 3.511.05 6.721 2.369 8.55 5.367 1.828 2.998 2.463 6.582 2.602 10.093.357 8.806-2.301 17.35-6.783 24.952ZM221.023 108.099a10.788 10.788 0 0 1 6.688 6.689c.184.557.44 1.231 1.02 1.293.663.072 1.059-.725 1.115-1.383.496-5.183-5.078-6.655-8.823-6.599Z"
    />
    <Path
      fill="#fff"
      d="M221.023 108.099a10.788 10.788 0 0 1 6.688 6.689c.184.557.44 1.231 1.02 1.293.663.072 1.059-.725 1.115-1.383.496-5.183-5.078-6.655-8.823-6.599Z"
      opacity={0.4}
    />
    <Path
      fill="#39CEC1"
      d="M85.46 194.681c5.323 4.074 10.49 9.675 12.207 16.346 2.118-10.723-1.031-22.694-6.822-31.767-5.574-8.756-16.12-16.977-27.11-12.785-2.787 1.07-5.2 3.544-5.54 6.526-.296 2.636 1.02 5.25 2.892 7.122 1.873 1.873 4.27 3.127 6.627 4.331 6.098 3.099 12.318 6.069 17.747 10.227Z"
    />
    <Path
      fill="#000"
      d="M85.46 194.681c5.323 4.074 10.49 9.675 12.207 16.346 2.118-10.723-1.031-22.694-6.822-31.767-5.574-8.756-16.12-16.977-27.11-12.785-2.787 1.07-5.2 3.544-5.54 6.526-.296 2.636 1.02 5.25 2.892 7.122 1.873 1.873 4.27 3.127 6.627 4.331 6.098 3.099 12.318 6.069 17.747 10.227Z"
      opacity={0.15}
    />
    <Path
      fill="#39CEC1"
      d="M96.73 145.633c-.223 3.516-1.917 7.707-2.853 10.427-1.405 4.085-2.731 8.483-1.628 12.657-2.937-3.812-5.724-8.165-7.017-12.819-1.354-4.91-1.187-10.5 2.57-14.379 2.446-2.524 7.518-2.697 8.672 1.238a8.42 8.42 0 0 1 .257 2.876Z"
    />
    <Path
      fill="#000"
      d="M96.73 145.633c-.223 3.516-1.917 7.707-2.853 10.427-1.405 4.085-2.731 8.483-1.628 12.657-2.937-3.812-5.724-8.165-7.017-12.819-1.354-4.91-1.187-10.5 2.57-14.379 2.446-2.524 7.518-2.697 8.672 1.238a8.42 8.42 0 0 1 .257 2.876Z"
      opacity={0.3}
    />
    <Path
      fill="#39CEC1"
      d="M19.1 185.273c17.452 12.93 40.688 5.941 59.795 15.187-4.972-9.859-17.986-12.155-27.144-19.595-8.444-6.867-12.028-13.41-18.905-18.805-5.674-4.458-14.603-6.069-19.748-1.019-3.378 3.343-4.113 8.727-2.642 13.23 1.472 4.504 4.838 8.182 8.645 11.002ZM37.349 136.812a17.885 17.885 0 0 1 3.489 7.134c.87 3.784.808 7.708.747 11.587-1.243-3.589-3.902-6.571-7.023-8.722-4.459-3.082-9.737-4.643-15.049-5.573a18.16 18.16 0 0 1-3.974-.953 5.19 5.19 0 0 1-2.931-2.703c-.4-1.14-.351-2.39.139-3.495 1.115-2.725 3.729-3.901 6.493-4.458 6.828-1.282 13.879 1.878 18.109 7.183Z"
    />
    <Path
      fill="#fff"
      d="M37.349 136.812a17.885 17.885 0 0 1 3.489 7.134c.87 3.784.808 7.708.747 11.587-1.243-3.589-3.902-6.571-7.023-8.722-4.459-3.082-9.737-4.643-15.049-5.573a18.16 18.16 0 0 1-3.974-.953 5.19 5.19 0 0 1-2.931-2.703c-.4-1.14-.351-2.39.139-3.495 1.115-2.725 3.729-3.901 6.493-4.458 6.828-1.282 13.879 1.878 18.109 7.183Z"
      opacity={0.5}
    />
    <Path
      fill="#39CEC1"
      d="M65.646 158.887a8.578 8.578 0 0 1 4.816.558 8.463 8.463 0 0 1 4.013 3.756c-.312-.591-2.787-.836-3.405-.914a21.151 21.151 0 0 0-6.438.089 14.152 14.152 0 0 0-3.144.998c-.39.173-2.586 1.115-2.614 1.544.123-2.029 1.539-3.818 3.305-4.827a10.252 10.252 0 0 1 3.467-1.204Z"
    />
  </StyledSvg>
);

export default CreativityIcon;
