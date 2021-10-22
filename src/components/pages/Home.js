import styled from "styled-components";
import PageTitle from "../shared/PageTitle";
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Home() {

    const { user } = useContext(UserContext);

    const items = [
        {
            id: 1,
            date: "30/11",
            description: "Almoço mãe",
            value: 3990,
            type: "expense"
        },
        {
            id: 2,
            date: "27/11",
            description: "Mercado",
            value: 54254,
            type: "expense"
        },
        {
            id: 3,
            date: "26/11",
            description: "Compras churrasco",
            value: 6760,
            type: "expense"
        },
        {
            id: 4,
            date: "20/11",
            description: "Empréstimo Maria",
            value: 50000,
            type: "earning"
        },
        {
            id: 5,
            date: "15/11",
            description: "Salário",
            value: 300000,
            type: "earning"
        },
    ];

    let balance = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i].type === 'earning') {
            balance += items[i].value;
        } else {
            balance -= items[i].value;
        }
    }

    return (
        <HomeContent>
            <PageTitle>Olá, {user.name}</PageTitle>
            <Link to='/'>
                <LogoutIcon></LogoutIcon>
            </Link>
                <Transactions items={items} balance={balance}/>
                <Buttons>
                    <Link to='/new-earning'>
                        <AddButton>
                            <PlusIcon></PlusIcon>
                            Nova Entrada
                        </AddButton>
                    </Link>
                    <Link to='/new-expense'>
                        <AddButton>
                            <MinusIcon></MinusIcon>
                            Nova Saída
                        </AddButton>
                    </Link>
                </Buttons>
        </HomeContent>
    );
}

function Transactions({ items, balance }) {
    return (
        <ContainerList quantity={items.length}>
            <Items>
            {items.length > 0 ? 
            items.map(item => {
            return (
            <Item key={item.id}>
                <DateAndDescription><span>{item.date}</span>{item.description}</DateAndDescription>
                <Value type={item.type}>{(item.value / 100).toFixed(2).replace('.', ',')}</Value>
            </Item>
            )}) :
            <NoItems>Não há registros de entrada ou saída</NoItems>}
            </Items>
            {items.length > 0 ?
            <Balance balance={balance}>SALDO <span>{(balance / 100).toFixed(2).replace('.', ',')}</span></Balance>
            :
            ''}
        </ContainerList>
    );
}

const LogoutIcon = styled(RiLogoutBoxRLine)`
    width: 25px;
    height: 25px;
    color: #ffffff;
    position: absolute;
    top: 25px;
    right: 25px;
`;

const HomeContent = styled.div`
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
`;

const ContainerList = styled.div`
    height: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.quantity > 0 ? 'space-between' : 'center'};
`;

const Items = styled.div`
    max-height: 380px;
    overflow-y: scroll;
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

    & span {
        font-weight: 400;
        color: ${props => props.balance > 0 ? '#03ac00' : '#c70000'}
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
    color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: calc(50vw - 32.5px);
    height: 114px;
    background-color: #a328d6;
    border: none;
    border-radius: 5px;
    position: relative;
    padding: 10px;
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
`;

const DateAndDescription = styled.p`
    font-size: 16px;
    max-width: 220px;
    color: #000000;
    line-height: 31px;
    word-break: break-word;

    & span {
        display: inline-block;
        width: 50px;
        color: #c6c6c6;
    }
`;

const Value = styled.p`
    font-size: 16px;
    max-width: 72px;
    line-height: 31px;
    word-break: break-word;
    color: ${props => props.type === 'earning' ? '#03ac00' : '#c70000'};
`;