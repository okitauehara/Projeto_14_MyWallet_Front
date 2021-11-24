import { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Input from '../styles/Input';
import Button from '../styles/Button';
import Form from '../styles/Form';
import PageTitle from '../styles/PageTitle';
import { postNewExpense } from '../services/API';
import UserContext from '../contexts/UserContext';
import HomeButton from '../styles/HomeButton';

export default function Expenses() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({ value: '', description: '' });
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    if (!user) {
      await Swal.fire({
        icon: 'warning',
        title: 'Você precisa estar logado para acessar esta página!',
      });
      history.push('/');
    }
  }, [user]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  function submitExpenses(event) {
    event.preventDefault();
    setIsDisabled(true);
    const body = {
      description: data.description,
      value: Number((data.value).replace(',', '')),
      type: 'expense',
    };
    postNewExpense(body, user.token)
      .then(async () => {
        setIsDisabled(false);
        await Swal.fire({
          icon: 'success',
          title: 'Adicionado com sucesso!',
        });
        history.push('/home');
      })
      .catch(async () => {
        await Swal.fire({
          icon: 'error',
          title: 'Verifique se os dados inseridos estão corretos e tente novamente.',
        });
        setIsDisabled(false);
      });
  }

  return (
    <>
      <PageTitle>Nova Saída</PageTitle>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <HomeButton />
      </Link>
      <Form onSubmit={submitExpenses}>
        <Input
          placeholder="Valor (Ex: 30,00)"
          type="text"
          name="value"
          required
          autoFocus
          value={data.value}
          onChange={handleChange}
          pattern="^[1-9]\d{0,2}(\d{3})*,\d{2}$"
          disabled={isDisabled}
          autoComplete="off"
        />
        <Input
          placeholder="Descrição"
          type="text"
          name="description"
          required
          value={data.description}
          onChange={handleChange}
          disabled={isDisabled}
          autoComplete="off"
        />
        <Button disabled={isDisabled}>{isDisabled ? <Loader type="ThreeDots" color="#ffffff" height={60} width={60} /> : 'Salvar saída'}</Button>
      </Form>
    </>
  );
}
