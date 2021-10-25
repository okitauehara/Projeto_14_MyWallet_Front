import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { deleteTransaction, getTransactions, updateTransaction } from "../../services/API";
import Swal from "sweetalert2";

export default function Modal({ isHidden, setIsHidden, modalInfo, setItems }) {

    const { user } = useContext(UserContext);
    const [displayUpdate, setDisplayUpdate] = useState(true);
    const [displayBox, setDisplayBox] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [data, setData] = useState({ description: '', value: '' });

    const handleChange = event => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    function deleteRecord() {
        deleteTransaction(modalInfo.id, user.token)
            .then(() => {
                getTransactions(user.token)
                    .then(async (response) => {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Deletado com sucesso!',
                        })
                        setItems(response.data);
                        setIsHidden(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => console.log(error));
    }

    function updateRecord(event) {
        event.preventDefault();
        setIsDisabled(true);
        const body = {
            description: data.description,
            value: Number((data.value).replace(',', '')),
            type: modalInfo.type
        }
        updateTransaction(modalInfo.id, user.token, body)
            .then(() => {
                getTransactions(user.token)
                    .then(async (response) => {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Atualizado com sucesso!',
                        })
                        setItems(response.data);
                        setIsDisabled(false);
                        setDisplayBox(false);
                        setDisplayUpdate(true);
                        setData({ description: '', value: '' });
                        setIsHidden(true);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsDisabled(false);
                    });
            })
            .catch((error) => console.log(error));
    }

    return (
        <ModalContainer hidden={isHidden}>
            <ModalBox hidden={displayBox}>
                <Description>{modalInfo.description}</Description>
                <Value type={modalInfo.type}>R${(modalInfo.value / 100).toFixed(2).replace('.', ',')}</Value>
                <Actions>
                    <ModalButton style={{ backgroundColor: '#c70000'}} onClick={deleteRecord}>Apagar</ModalButton>
                    <ModalButton style={{ backgroundColor: '#009eff'}} onClick={() => {setDisplayUpdate(false); setDisplayBox(true)}}>Atualizar</ModalButton>
                    <ModalButton style={{ backgroundColor: '#c5c5c5'}} onClick={() => setIsHidden(true)}>Voltar</ModalButton>
                </Actions>
            </ModalBox>
            <UpdateBox hidden={displayUpdate} onSubmit={updateRecord}>
                <Input
                    placeholder='Descrição'
                    required
                    type='text'
                    name='description'
                    autoFocus
                    minLength='3'
                    value={data.description}
                    onChange={handleChange}
                    disabled={isDisabled}
                    validation={true}
                    ></Input>
                <Input
                    placeholder='Valor (Ex: 30,00)'
                    type='text'
                    name='value'
                    required
                    value={data.value}
                    onChange={handleChange}
                    pattern="^[1-9]\d{0,2}(\d{3})*,\d{2}$"
                    disabled={isDisabled}
                    validation={true}
                    ></Input>
                <Actions style={{ gridTemplateColumns: 'repeat(2, auto)', marginTop: '0px' }}>
                    <ModalButton style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#a328d6' }}>Salvar</ModalButton>
                    <ModalButton style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#c5c5c5' }} onClick={() => {setDisplayUpdate(true); setDisplayBox(false)}}>Voltar</ModalButton>
                </Actions>
            </UpdateBox>
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
    display: ${props => props.hidden ? 'none' : 'flex'};
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

const ModalButton = styled.button`
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

const UpdateBox = styled.form`
    width: calc(100vw - 50px);
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;
    display: ${props => props.hidden ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`;

const Input = styled.input`
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    width: auto;
    height: 40px;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #c5c5c5;
    outline: none;
    margin-bottom: 13px;

    &::placeholder {
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        color: #000000;
    }

    &:valid {
        background-color: ${props => props.validation ? '#d4f8d4' : 'default'};
    }
`;