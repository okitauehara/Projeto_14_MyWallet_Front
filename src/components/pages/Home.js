import styled from "styled-components";
import PageTitle from "../shared/PageTitle";
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getTransactions, requestSignOut } from "../../services/API";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";
import Modal from "../shared/Modal";

export default function Home({ setUser }) {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('@user')));
        setLoading(true);
        getTransactions(user.token)
            .then((response) => {
                setItems(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        // eslint-disable-next-line
    }, []);

    let balance = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i].type === 'earning') {
            balance += items[i].value;
        } else {
            balance -= items[i].value;
        }
    }

    async function signOutUser() {
        await Swal.fire({
            title: 'Deseja deslogar de sua conta?',
            text: 'Você terá que inserir seus dados novamente no próximo acesso',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                requestSignOut(user.token)
                    .then(() => {
                    localStorage.removeItem('@user');
                    setUser({})
                    history.push('/');
                })
                    .catch((error) => console.log(error));
            }
        })
    }

    return (
        <HomeContent>
            <PageTitle>Olá, {user.name}</PageTitle>
            <Link to='/'>
                <LogoutIcon onClick={signOutUser}></LogoutIcon>
            </Link>
                {loading ? <ContainerList><Loading /></ContainerList> : <Transactions items={items} setItems={setItems} balance={balance}/>}
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

function Transactions({ items, setItems, balance }) {

    const [isHidden, setIsHidden] = useState(true);
    const [modalInfo, setModalInfo] = useState({});

    function openModal(item) {
        setIsHidden(false);
        setModalInfo(item);
    }

    return (
        <>
            <Modal
                setItems={setItems}
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                modalInfo={modalInfo} />
            <ContainerList quantity={items.length}>
                <LayoutBox>
                    {items.length > 0 ? <Info>Clique no registro para mais informações</Info> : ''}
                    <Items>
                    {items.length > 0 ? 
                    items.map(item => {
                    return (
                    <Item key={item.id} onClick={() => openModal(item)}>
                        <DateAndDescription><span>{item.date}</span>{item.description}</DateAndDescription>
                        <Value type={item.type}>{(item.value / 100).toFixed(2).replace('.', ',')}</Value>
                    </Item>
                    )}) :
                    <NoItems>Não há registros de entrada ou saída</NoItems>}
                    </Items>
                </LayoutBox>
                {items.length > 0 ?
                <Balance balance={balance}>SALDO <span>{(balance / 100).toFixed(2).replace('.', ',')}</span></Balance>
                :
                ''}
            </ContainerList>
        </>
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

const LayoutBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Info = styled.p`
    font-size: 13px;
    color: #8c11be;
    word-break: break-word;
    padding-bottom: 10px;
    border-bottom: 1px solid #8c11be;
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
    color: ${props => props.type === 'earning' ? '#03ac00' : '#c70000'};
`;