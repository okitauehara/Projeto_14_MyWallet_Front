import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';

const HomeButton = styled(AiFillHome)`
  width: 25px;
  height: 25px;
  color: #DEAE60;
  position: absolute;
  top: 25px;
  right: 25px;

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

export default HomeButton;
