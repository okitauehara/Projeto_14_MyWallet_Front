/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../contexts/UserContext';
import { deleteTransaction, getTransactions, updateTransaction } from '../services/API';
import * as S from '../styles/ModalComponent';

export default function Modal({
  isHidden, setIsHidden, modalInfo, setItems,
}) {
  const { user } = useContext(UserContext);
  const [displayUpdate, setDisplayUpdate] = useState(true);
  const [displayBox, setDisplayBox] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState({ description: '', value: '', type: '' });
  const history = useHistory();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  function deleteRecord() {
    deleteTransaction(modalInfo.id, user.token)
      .then(() => {
        getTransactions(user.token)
          .then(async (response) => {
            await Swal.fire({
              icon: 'success',
              title: 'Deletado com sucesso!',
            });
            setItems(response.data);
            setIsHidden(true);
          })
          .catch(async (err) => {
            if (err.response?.status === 401) {
              await Swal.fire({
                icon: 'error',
                title: 'Usuário não encontrado, você será redirecionado para tela de login.',
              });
              history.push('/');
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Tivemos um problema no servidor, tente novamente mais tarde.',
              });
            }
          });
      })
      .catch(async (err) => {
        if (err.response?.status === 401) {
          await Swal.fire({
            icon: 'error',
            title: 'Usuário não encontrado, você será redirecionado para tela de login.',
          });
          history.push('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Tivemos um problema no servidor, tente novamente mais tarde.',
          });
        }
      });
  }

  function updateRecord(event) {
    event.preventDefault();
    setIsDisabled(true);
    const body = {
      description: data.description,
      value: Number((data.value).replace(',', '')),
      type: data.type,
    };
    updateTransaction(modalInfo.id, user.token, body)
      .then(() => {
        getTransactions(user.token)
          .then(async (response) => {
            await Swal.fire({
              icon: 'success',
              title: 'Atualizado com sucesso!',
            });
            setItems(response.data);
            setIsDisabled(false);
            setDisplayBox(false);
            setDisplayUpdate(true);
            setData({ description: '', value: '', type: '' });
            setIsHidden(true);
          })
          .catch(async (err) => {
            if (err.response?.status === 401) {
              await Swal.fire({
                icon: 'error',
                title: 'Usuário não encontrado, você será redirecionado para tela de login.',
              });
              history.push('/');
              setIsDisabled(false);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Tivemos um problema no servidor, tente novamente mais tarde.',
              });
              setIsDisabled(false);
            }
          });
      })
      .catch(async (err) => {
        if (err.response?.status === 401) {
          await Swal.fire({
            icon: 'error',
            title: 'Usuário não encontrado, você será redirecionado para tela de login.',
          });
          history.push('/');
          setIsDisabled(false);
        } else if (err.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Verifique se os dados inseridos são válidos.',
          });
          setIsDisabled(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Tivemos um problema no servidor, tente novamente mais tarde.',
          });
          setIsDisabled(false);
        }
      });
  }

  return (
    <S.ModalContainer hidden={isHidden}>
      <S.ModalBox hidden={displayBox}>
        <S.Description>{modalInfo.description}</S.Description>
        <S.Date>{modalInfo.date}</S.Date>
        <S.Value type={modalInfo.type}>
          R$
          {(modalInfo.value / 100).toFixed(2).replace('.', ',')}
        </S.Value>
        <S.Actions>
          <S.ModalButton
            style={{ backgroundColor: '#c70000' }}
            onClick={deleteRecord}
          >
            Apagar
          </S.ModalButton>
          <S.ModalButton
            style={{ backgroundColor: '#009eff' }}
            onClick={() => { setDisplayUpdate(false); setDisplayBox(true); }}
          >
            Atualizar
          </S.ModalButton>
          <S.ModalButton
            style={{ backgroundColor: '#a9a9a9' }}
            onClick={() => setIsHidden(true)}
          >
            Voltar
          </S.ModalButton>
        </S.Actions>
      </S.ModalBox>
      <S.UpdateBox hidden={displayUpdate} onSubmit={updateRecord}>
        <S.Input
          placeholder="Descrição"
          required
          type="text"
          name="description"
          autoFocus
          minLength="3"
          value={data.description}
          onChange={handleChange}
          disabled={isDisabled}
          validation
        />
        <S.Input
          placeholder="Valor (Ex: 30,00)"
          type="text"
          name="value"
          required
          value={data.value}
          onChange={handleChange}
          pattern="^[1-9]\d{0,2}(\d{3})*,\d{2}$"
          disabled={isDisabled}
          validation
        />
        <S.TypeOptions>
          <S.Option>
            <S.RadioInput
              type="radio"
              name="type"
              id="earning"
              required
              value="earning"
              onChange={handleChange}
              disabled={isDisabled}
              validation
            />
            <S.Label htmlFor="earning">Entrada</S.Label>
          </S.Option>
          <S.Option>
            <S.RadioInput
              type="radio"
              name="type"
              id="expense"
              required
              value="expense"
              onChange={handleChange}
              disabled={isDisabled}
              validation
            />
            <S.Label htmlFor="expense">Saída</S.Label>
          </S.Option>
        </S.TypeOptions>
        <S.Actions style={{ gridTemplateColumns: 'repeat(2, auto)', marginTop: '0px' }}>
          <S.ModalButton style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#a328d6' }}>Salvar</S.ModalButton>
          <S.ModalButton
            style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#a9a9a9' }}
            onClick={() => { setDisplayUpdate(true); setDisplayBox(false); setData({ ...data, description: '', value: '' }); }}
          >
            Voltar
          </S.ModalButton>
        </S.Actions>
      </S.UpdateBox>
    </S.ModalContainer>
  );
}
