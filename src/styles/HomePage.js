import styled from 'styled-components';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';

const LogoutIcon = styled(RiLogoutBoxRLine)`
  width: 25px;
  height: 25px;
  color: #DEAE60;
  position: absolute;
  top: 25px;
  right: 25px;

  & :hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

const HomeContent = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`;

const ContainerList = styled.div`
  height: 100%;
  background-color: #fffff0;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.quantity > 0 ? 'space-between' : 'center')};
`;

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Info = styled.p`
  font-size: 13px;
  color: #0D1732;
  word-break: break-word;
  padding-bottom: 10px;
  border-bottom: 1px solid #0D1732;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Items = styled.div`
  max-height: 348px;
  border-radius: 5px;
  overflow-y: scroll;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const NoItems = styled.p`
  font-size: 20px;
  color: #868686;
  text-align: center;
  overflow-y: hidden;
`;

const Balance = styled.p`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  color: #000000;
  padding-top: 10px;

  & span {
    font-weight: 700;
    color: ${(props) => (props.balance > 0 ? '#7ba05b' : '#9f0000')}
  }
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: 1;
  gap: 15px;
`;

const AddButton = styled.button`
  font-family: 'Raleway', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #DEAE60;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: calc(50vw - 32.5px);
  height: 114px;
  background-color: #323750;
  border: none;
  border-radius: 5px;
  position: relative;
  padding: 10px;

  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;

const PlusIcon = styled(FiPlusCircle)`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const MinusIcon = styled(FiMinusCircle)`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;

  & :hover {
    font-weight: 700;
    cursor: pointer;
    filter: brightness(1.1);
  }
`;

const DateAndDescription = styled.p`
  font-size: 16px;
  max-width: 75%;
  color: #000000;
  line-height: 30px;
  word-break: break-word;

  & span {
    display: inline-block;
    width: 50px;
    color: #c6c6c6;
  }
`;

const Value = styled.p`
  font-size: 16px;
  max-width: 25%;
  line-height: 30px;
  word-break: break-word;
  color: ${(props) => (props.type === 'earning' ? '#7ba05b' : '#9f0000')};
`;

export {
  LogoutIcon,
  HomeContent,
  ContainerList,
  LayoutBox,
  Info,
  Items,
  NoItems,
  Balance,
  Buttons,
  AddButton,
  PlusIcon,
  MinusIcon,
  Item,
  DateAndDescription,
  Value,
};
