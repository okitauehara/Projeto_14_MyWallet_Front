/* eslint-disable max-len */
import { Link, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../contexts/UserContext';
import { getTransactions, requestSignOut } from '../services/API';
import PageTitle from '../styles/PageTitle';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { calcBalance, formatCurrency } from '../services/utils';
import * as S from '../styles/HomePage';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(async () => {
    if (!user) {
      await Swal.fire({
        icon: 'warning',
        title: 'Você precisa estar logado para acessar esta página!',
        confirmButtonColor: '#191970',
      });
      history.push('/');
    } else {
      setLoading(true);
      await getTransactions(user?.token)
        .then((response) => {
          setItems(response.data);
          setLoading(false);
          setBalance(calcBalance(response.data));
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Usuário não encontrado.',
              confirmButtonColor: '#191970',
            });
            setLoading(false);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Tivemos um problema no servidor, tente novamente mais tarde.',
              confirmButtonColor: '#191970',
            });
            setLoading(false);
          }
        });
    }
  }, []);

  async function signOutUser() {
    await Swal.fire({
      title: 'Deseja deslogar de sua conta?',
      text: 'Você terá que inserir seus dados novamente no próximo acesso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#191970',
    }).then((result) => {
      if (result.isConfirmed) {
        requestSignOut(user?.token)
          .then(() => {
            localStorage.removeItem('@user');
            setUser('');
            history.push('/');
          })
          .catch((err) => {
            if (err.response?.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Usuário não encontrado.',
                confirmButtonColor: '#191970',
              });
              setLoading(false);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Tivemos um problema no servidor, tente novamente mais tarde',
                confirmButtonColor: '#191970',
              });
              setLoading(false);
            }
          });
      }
    });
  }

  return (
    <S.HomeContent>
      <PageTitle>
        Olá,
        {' '}
        {user?.name}
      </PageTitle>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <S.LogoutIcon onClick={signOutUser} />
      </Link>
      {loading ? <S.ContainerList><Loading /></S.ContainerList> : <Transactions items={items} setItems={setItems} balance={balance} />}
      <S.Buttons>
        <Link to="/new-earning" style={{ textDecoration: 'none' }}>
          <S.AddButton>
            <S.PlusIcon />
            Nova Entrada
          </S.AddButton>
        </Link>
        <Link to="/new-expense" style={{ textDecoration: 'none' }}>
          <S.AddButton>
            <S.MinusIcon />
            Nova Saída
          </S.AddButton>
        </Link>
      </S.Buttons>
    </S.HomeContent>
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
        modalInfo={modalInfo}
      />
      <S.ContainerList quantity={items.length}>
        <S.LayoutBox>
          {items.length > 0 ? <S.Info>Clique no registro para mais informações</S.Info> : ''}
          <S.Items>
            {items.length > 0
              ? items.map((item) => (
                <S.Item key={item.id} onClick={() => openModal(item)}>
                  <S.DateAndDescription>
                    <span>{item.date}</span>
                    {item.description}
                  </S.DateAndDescription>
                  <S.Value type={item.type}>{formatCurrency(item.value)}</S.Value>
                </S.Item>
              ))
              : <S.NoItems>Não há registros de entrada ou saída</S.NoItems>}
          </S.Items>
        </S.LayoutBox>
        {items.length > 0
          ? (
            <S.Balance balance={balance}>
              SALDO
              {' '}
              <span>{formatCurrency(balance)}</span>
            </S.Balance>
          )
          : ''}
      </S.ContainerList>
    </>
  );
}
