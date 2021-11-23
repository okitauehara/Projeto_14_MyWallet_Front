import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Redirect from '../shared/Redirect';
import Form from '../shared/Form';
import { CenterPage, Logo } from '../shared/LoginSignUp';
import { postSignUp } from '../../services/API';

export default function SignUp() {
  const [data, setData] = useState({
    name: '', email: '', password: '', confirmation: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const emailRegex = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: [event.target.value] });
  };

  function submitSignUp(event) {
    event.preventDefault();
    setIsDisabled(true);
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmation: data.confirmation,
    };

    postSignUp(body)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Usuário cadastrado!',
        });
        setIsDisabled(false);
        history.push('/');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Verifique se todos os dados inseridos são válidos',
          });
        }
        if (error.response.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'O e-mail inserido já está em uso',
          });
        }
        setIsDisabled(false);
      });
  }

  return (
    <CenterPage>
      <Logo>MyWallet</Logo>
      <Form onSubmit={submitSignUp}>
        <Input
          placeholder="Nome"
          type="text"
          name="name"
          required
          autoFocus
          minLength="3"
          value={data.name}
          onChange={handleChange}
          disabled={isDisabled}
          validation
        />
        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          required
          pattern={emailRegex}
          value={data.email}
          onChange={handleChange}
          disabled={isDisabled}
          validation
        />
        <Input
          placeholder="Senha"
          type="password"
          name="password"
          required
          minLength="8"
          value={data.password}
          onChange={handleChange}
          disabled={isDisabled}
          validation
        />
        <Input
          placeholder="Confirme a senha"
          type="password"
          name="confirmation"
          required
          minLength="8"
          pattern={data.password}
          value={data.confirmation}
          onChange={handleChange}
          disabled={isDisabled}
          validation
        />
        <Button disabled={isDisabled}>Cadastrar</Button>
      </Form>
      <Link to="/" disabled={isDisabled} style={{ pointerEvents: isDisabled ? 'none' : 'all', textDecoration: 'none' }}>
        <Redirect>Já tem uma conta? Entre agora!</Redirect>
      </Link>
    </CenterPage>
  );
}
