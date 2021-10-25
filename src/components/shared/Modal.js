import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { deleteTransaction, getTransactions } from "../../services/API";

export default function Modal({ isHidden, setIsHidden, modalInfo, setItems }) {

    const { user } = useContext(UserContext);

    function deleteRecord() {
        deleteTransaction(modalInfo.id, user.token)
            .then(() => {
                setIsHidden(true)
                getTransactions(user.token)
                    .then((response) => {
                        setItems(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => console.log(error));
    }

    return (
        <ModalContainer hidden={isHidden}>
            <ModalBox>
                <Description>{modalInfo.description}</Description>
                <Value type={modalInfo.type}>R${(modalInfo.value / 100).toFixed(2).replace('.', ',')}</Value>
                <Actions>
                    <Button style={{ backgroundColor: '#c70000'}} onClick={deleteRecord}>Apagar</Button>
                    <Button style={{ backgroundColor: '#009eff'}}>Atualizar</Button>
                    <Button style={{ backgroundColor: '#c5c5c5'}} onClick={() => setIsHidden(true)}>Voltar</Button>
                </Actions>
            </ModalBox>
        </ModalContainer>
    );
}


const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 10;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
    justify-content: center;
    align-items: center;
    display: ${props => props.hidden ? 'none' : 'flex'};
    pointer-events: ${props => props.hidden ? 'none' : 'all'};
`;

const ModalBox = styled.div`
    width: calc(100vw - 50px);
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`;

const Description = styled.p`
    font-size: 20px;
    max-width: 90%;
    color: #000000;
    line-height: 30px;
    word-break: break-word;
`;

const Value = styled.p`
    font-size: 20px;
    max-width: 90%;
    line-height: 30px;
    word-break: break-word;
    color: ${props => props.type === 'earning' ? '#03ac00' : '#c70000'};
`;

const Actions = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: 1;
    gap: 15px;
    margin-top: 10px;
`;

const Button = styled.button`
    font-family: 'Raleway', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    width: calc(33.3vw - 33.3px);
    height: 46px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: ${props => props.disabled ? 'none' : 'all'};
`;