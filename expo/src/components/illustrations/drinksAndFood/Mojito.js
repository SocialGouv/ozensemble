import React from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components";

const StyledSvg = styled(Svg)``;

const Mojito = ({ size, color = "#DE285E", ...props }) => (
  <StyledSvg width={size} height={size} viewBox="0 0 32 48" {...props}>
    <Path
      d="M31.569 6.517a1.656 1.656 0 0 0-1.123-.429h-12.83c.421-1.822.36-3.66.31-4.382-.036-.537-.517-.95-1.119-.962-1.193-.022-5.097.023-7.604 1.418C6.661.571 2.803.113 1.572.005 1.01-.045.504.293.397.79.136 2.009-.594 6.195.986 8.873c1.102 1.867 2.557 3.03 4.325 3.458a6.39 6.39 0 0 0 1.277.173L8.26 46.672c.036.744.718 1.328 1.552 1.328H28.53c.834 0 1.517-.584 1.553-1.328l1.916-39.134a1.315 1.315 0 0 0-.43-1.021ZM16.387 3.15c-.032 1.544-.296 3.215-.944 4.415l-.014.026a4.32 4.32 0 0 1-.221.362l-.042.061c-.036.051-.072.1-.11.149a8.438 8.438 0 0 1-.173.213l-.045.053a7.819 7.819 0 0 1-.401.438 6.787 6.787 0 0 1-.175.17l-.01.01a6.164 6.164 0 0 1-.407.343l-.015.012a5.3 5.3 0 0 1-.414.287l-.018.012a4.784 4.784 0 0 1-.424.231l-.02.01a4.307 4.307 0 0 1-.904.308l-.013.003a4.043 4.043 0 0 1-.466.07l-.007.001.003-.004a6.35 6.35 0 0 0 .252-.391l.018-.032c.038-.065.075-.131.112-.2l.006-.01.05-.097.03.006a.88.88 0 0 0 .176.018c.358 0 .682-.221.766-.547.09-.351-.132-.701-.503-.819l.017-.085.011-.07.021-.142.008-.064.015-.15.004-.064.008-.151.002-.034v-.174l1.063.217a.88.88 0 0 0 .176.018c.36 0 .683-.22.767-.546.097-.379-.168-.756-.592-.843l-.676-.138.73-.68.835.172c.06.012.118.018.176.018.36 0 .683-.22.767-.547.09-.353-.135-.706-.51-.821l1.09-1.014Zm-1.303 16.36c-2.326 2.025-2.546 5.265-.632 7.521l-.349.305c-2.12-2.447-1.874-5.94.646-8.135 1.334-1.162 3.06-1.744 4.785-1.744 1.533 0 3.067.46 4.327 1.38l-.35.305c-2.472-1.77-6.1-1.658-8.427.368Zm7.29.623-6.784 5.908c-1.316-1.691-1.111-4.04.592-5.524.932-.811 2.141-1.215 3.35-1.215 1 0 2.001.278 2.842.83Zm-7.945-6.68-.685 3.181-3.559-.612.686-3.182 3.558.613Zm.824-11.278L14.162 3.19c-.144-.33-.546-.518-.939-.424-.419.102-.667.488-.554.863l.224.74-.73.679-.18-.6c-.099-.324-.436-.533-.796-.518a9.027 9.027 0 0 0-.735-.784c1.31-.595 3.118-.883 4.8-.97ZM8.67 3.564l.01.008a6.244 6.244 0 0 1 .297.236l.008.008c.09.079.177.158.261.237l.089.085c.055.054.11.107.162.16l.096.101a7.206 7.206 0 0 1 .35.397c.029.035.058.07.085.106.041.052.08.104.118.157.022.03.046.061.067.092.056.08.11.16.159.24.02.03.036.06.055.092.03.052.062.105.09.157a4.254 4.254 0 0 1 .272.61c.02.058.039.115.056.172l.023.079c.046.17.079.34.098.51.003.021.004.043.006.065.005.063.01.126.012.189l.001.085c0 .067 0 .134-.003.201l-.001.026a3.352 3.352 0 0 1-.024.233l-.008.053a3.41 3.41 0 0 1-.058.294l-.02.077a3.654 3.654 0 0 1-.059.198l-.004.015a4.721 4.721 0 0 1-.86 1.5l-.809-.967.912-1.99c.164-.36-.029-.771-.43-.918-.403-.147-.862.025-1.027.384l-.553 1.21-.884-1.059.691-1.511c.165-.36-.028-.77-.43-.917-.402-.147-.861.025-1.026.384l-.334.73-.786-.94.37-.807c.164-.36-.029-.77-.431-.917-.402-.147-.862.025-1.026.384l-.011.025L2.97 1.599c1.663.262 4.157.824 5.7 1.965Zm-1.437 7.523c-.47.036-.985.013-1.512-.114-1.328-.321-2.453-1.248-3.343-2.757-.977-1.655-.871-4.172-.667-5.775L2.913 3.88l-.03.003c-.432.039-.747.384-.703.77.04.363.383.633.782.633a.885.885 0 0 0 .08-.004l.97-.088.785.94-.877.08c-.432.04-.747.384-.703.77.04.363.383.633.781.633a.89.89 0 0 0 .08-.003l1.818-.165.87 1.04-1.407.128c-.433.04-.748.384-.704.77.041.363.383.633.782.633a.9.9 0 0 0 .08-.003l2.347-.213.823.985c-.38.125-.87.249-1.42.294l-.034.004Zm21.279 35.506H9.832L9.73 44.51c2.537.235 5.91.368 9.442.368 3.531 0 6.904-.133 9.442-.368l-.102 2.084Zm1.833-37.45h-8.85c-.435 0-.788.314-.788.703 0 .388.353.703.787.703h8.782l-1.593 32.54c-2.506.243-5.92.38-9.511.38-3.592 0-7.006-.137-9.512-.38l-.11-2.258c.152.238.415.418.739.474l4.21.724c.068.012.137.018.206.018.512 0 .97-.325 1.07-.791l.81-3.763a.887.887 0 0 0-.167-.731 1.1 1.1 0 0 0-.697-.411l-4.21-.725c-.59-.102-1.163.246-1.277.774l-.735 3.41-1.342-27.425a8.15 8.15 0 0 0 1.298-.353.903.903 0 0 0-.042.136l-.86 3.996a.902.902 0 0 0 .17.744c.167.22.418.367.71.418l4.36.75c-.047.04-.096.078-.143.119-3.243 2.824-3.422 7.4-.407 10.415a1.169 1.169 0 0 0 .823.33c.287 0 .567-.101.773-.28l4.837-4.213 4.406-3.837 1.239-1.079a.944.944 0 0 0 .334-.716.947.947 0 0 0-.347-.711c-2.794-2.352-6.9-2.68-10.062-1.003l.816-3.788a.902.902 0 0 0-.171-.744 1.118 1.118 0 0 0-.71-.418l-2.9-.5.075-.015.056-.01a5.62 5.62 0 0 0 .177-.041l.014-.004c.055-.013.11-.028.165-.043l.058-.017a5.58 5.58 0 0 0 .308-.1l.065-.023a6.12 6.12 0 0 0 .133-.051l.05-.02c.062-.025.123-.05.184-.078l.032-.015c.05-.023.101-.046.152-.071l.061-.03a6.168 6.168 0 0 0 .316-.17c.02-.013.042-.025.063-.037l.145-.09.04-.025c.062-.04.124-.08.185-.123l.045-.031.14-.101.01-.007h3.078c.435 0 .787-.315.787-.703 0-.389-.352-.704-.787-.704h-1.625a5.227 5.227 0 0 0 .284-.37l.037-.053c.037-.054.074-.11.11-.167l.026-.039c.193-.309.367-.648.518-1.018h13.243l-.081 1.647ZM11.06 40.004l.628-2.916 3.261.562-.627 2.915-3.262-.561Z"
      fill={color}
    />
    <Path
      d="M31.569 6.517a1.656 1.656 0 0 0-1.123-.429h-12.83c.421-1.822.36-3.66.31-4.382-.036-.537-.517-.95-1.119-.962-1.193-.022-5.097.023-7.604 1.418C6.661.571 2.803.113 1.572.005 1.01-.045.504.293.397.79.136 2.009-.594 6.195.986 8.873c1.102 1.867 2.557 3.03 4.325 3.458a6.39 6.39 0 0 0 1.277.173L8.26 46.672c.036.744.718 1.328 1.552 1.328H28.53c.834 0 1.517-.584 1.553-1.328l1.916-39.134a1.315 1.315 0 0 0-.43-1.021ZM16.387 3.15c-.032 1.544-.296 3.215-.944 4.415l-.014.026a4.32 4.32 0 0 1-.221.362l-.042.061c-.036.051-.072.1-.11.149a8.438 8.438 0 0 1-.173.213l-.045.053a7.819 7.819 0 0 1-.401.438 6.787 6.787 0 0 1-.175.17l-.01.01a6.164 6.164 0 0 1-.407.343l-.015.012a5.3 5.3 0 0 1-.414.287l-.018.012a4.784 4.784 0 0 1-.424.231l-.02.01a4.307 4.307 0 0 1-.904.308l-.013.003a4.043 4.043 0 0 1-.466.07l-.007.001.003-.004a6.35 6.35 0 0 0 .252-.391l.018-.032c.038-.065.075-.131.112-.2l.006-.01.05-.097.03.006a.88.88 0 0 0 .176.018c.358 0 .682-.221.766-.547.09-.351-.132-.701-.503-.819l.017-.085.011-.07.021-.142.008-.064.015-.15.004-.064.008-.151.002-.034v-.174l1.063.217a.88.88 0 0 0 .176.018c.36 0 .683-.22.767-.546.097-.379-.168-.756-.592-.843l-.676-.138.73-.68.835.172c.06.012.118.018.176.018.36 0 .683-.22.767-.547.09-.353-.135-.706-.51-.821l1.09-1.014Zm-1.303 16.36c-2.326 2.025-2.546 5.265-.632 7.521l-.349.305c-2.12-2.447-1.874-5.94.646-8.135 1.334-1.162 3.06-1.744 4.785-1.744 1.533 0 3.067.46 4.327 1.38l-.35.305c-2.472-1.77-6.1-1.658-8.427.368Zm7.29.623-6.784 5.908c-1.316-1.691-1.111-4.04.592-5.524.932-.811 2.141-1.215 3.35-1.215 1 0 2.001.278 2.842.83Zm-7.945-6.68-.685 3.181-3.559-.612.686-3.182 3.558.613Zm.824-11.278L14.162 3.19c-.144-.33-.546-.518-.939-.424-.419.102-.667.488-.554.863l.224.74-.73.679-.18-.6c-.099-.324-.436-.533-.796-.518a9.027 9.027 0 0 0-.735-.784c1.31-.595 3.118-.883 4.8-.97ZM8.67 3.564l.01.008a6.244 6.244 0 0 1 .297.236l.008.008c.09.079.177.158.261.237l.089.085c.055.054.11.107.162.16l.096.101a7.206 7.206 0 0 1 .35.397c.029.035.058.07.085.106.041.052.08.104.118.157.022.03.046.061.067.092.056.08.11.16.159.24.02.03.036.06.055.092.03.052.062.105.09.157a4.254 4.254 0 0 1 .272.61c.02.058.039.115.056.172l.023.079c.046.17.079.34.098.51.003.021.004.043.006.065.005.063.01.126.012.189l.001.085c0 .067 0 .134-.003.201l-.001.026a3.352 3.352 0 0 1-.024.233l-.008.053a3.41 3.41 0 0 1-.058.294l-.02.077a3.654 3.654 0 0 1-.059.198l-.004.015a4.721 4.721 0 0 1-.86 1.5l-.809-.967.912-1.99c.164-.36-.029-.771-.43-.918-.403-.147-.862.025-1.027.384l-.553 1.21-.884-1.059.691-1.511c.165-.36-.028-.77-.43-.917-.402-.147-.861.025-1.026.384l-.334.73-.786-.94.37-.807c.164-.36-.029-.77-.431-.917-.402-.147-.862.025-1.026.384l-.011.025L2.97 1.599c1.663.262 4.157.824 5.7 1.965Zm-1.437 7.523c-.47.036-.985.013-1.512-.114-1.328-.321-2.453-1.248-3.343-2.757-.977-1.655-.871-4.172-.667-5.775L2.913 3.88l-.03.003c-.432.039-.747.384-.703.77.04.363.383.633.782.633a.885.885 0 0 0 .08-.004l.97-.088.785.94-.877.08c-.432.04-.747.384-.703.77.04.363.383.633.781.633a.89.89 0 0 0 .08-.003l1.818-.165.87 1.04-1.407.128c-.433.04-.748.384-.704.77.041.363.383.633.782.633a.9.9 0 0 0 .08-.003l2.347-.213.823.985c-.38.125-.87.249-1.42.294l-.034.004Zm21.279 35.506H9.832L9.73 44.51c2.537.235 5.91.368 9.442.368 3.531 0 6.904-.133 9.442-.368l-.102 2.084Zm1.833-37.45h-8.85c-.435 0-.788.314-.788.703 0 .388.353.703.787.703h8.782l-1.593 32.54c-2.506.243-5.92.38-9.511.38-3.592 0-7.006-.137-9.512-.38l-.11-2.258c.152.238.415.418.739.474l4.21.724c.068.012.137.018.206.018.512 0 .97-.325 1.07-.791l.81-3.763a.887.887 0 0 0-.167-.731 1.1 1.1 0 0 0-.697-.411l-4.21-.725c-.59-.102-1.163.246-1.277.774l-.735 3.41-1.342-27.425a8.15 8.15 0 0 0 1.298-.353.903.903 0 0 0-.042.136l-.86 3.996a.902.902 0 0 0 .17.744c.167.22.418.367.71.418l4.36.75c-.047.04-.096.078-.143.119-3.243 2.824-3.422 7.4-.407 10.415a1.169 1.169 0 0 0 .823.33c.287 0 .567-.101.773-.28l4.837-4.213 4.406-3.837 1.239-1.079a.944.944 0 0 0 .334-.716.947.947 0 0 0-.347-.711c-2.794-2.352-6.9-2.68-10.062-1.003l.816-3.788a.902.902 0 0 0-.171-.744 1.118 1.118 0 0 0-.71-.418l-2.9-.5.075-.015.056-.01a5.62 5.62 0 0 0 .177-.041l.014-.004c.055-.013.11-.028.165-.043l.058-.017a5.58 5.58 0 0 0 .308-.1l.065-.023a6.12 6.12 0 0 0 .133-.051l.05-.02c.062-.025.123-.05.184-.078l.032-.015c.05-.023.101-.046.152-.071l.061-.03a6.168 6.168 0 0 0 .316-.17c.02-.013.042-.025.063-.037l.145-.09.04-.025c.062-.04.124-.08.185-.123l.045-.031.14-.101.01-.007h3.078c.435 0 .787-.315.787-.703 0-.389-.352-.704-.787-.704h-1.625a5.227 5.227 0 0 0 .284-.37l.037-.053c.037-.054.074-.11.11-.167l.026-.039c.193-.309.367-.648.518-1.018h13.243l-.081 1.647ZM11.06 40.004l.628-2.916 3.261.562-.627 2.915-3.262-.561Z"
      fill={color}
    />
  </StyledSvg>
);

export default Mojito;