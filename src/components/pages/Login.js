import Input from "../shared/Input";
import Button from "../shared/Button";
import Redirect from "../shared/Redirect";
import Form from "../shared/Form";
import { CenterPage, Logo } from "../shared/LoginSignUp";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postSignIn } from "../../services/API";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext";

export default function Login({ setUser }) {

    const [data, setData] = useState({ email: '', password: '' });
    const [isDisabled, setIsDisabled] = useState(false);
    const { user } = useContext(UserContext);

    const history = useHistory();

    if (user?.token) {
        history.push('/home');
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function submitLogin(event) {
        event.preventDefault();
        setIsDisabled(true);
        const body = {
            email: data.email,
            password: data.password
        }

        postSignIn(body)
            .then((response) => {
                setUser(response.data);
                localStorage.setItem('@user',JSON.stringify(response.data));
                setIsDisabled(false);
                history.push('/home')
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'E-mail ou senha incorretos',
                });
                setIsDisabled(false);
            })
    }

    return (
        <CenterPage>
            <Logo>MyWallet</Logo>
            <Form onSubmit={submitLogin}>
                <Input
                    placeholder='E-mail'
                    type='email'
                    name='email'
                    required
                    autoFocus
                    value={data.email}
                    onChange={handleChange}
                    disabled={isDisabled}
                />
                <Input
                    placeholder='Senha'
                    type='password'
                    name='password'
                    required
                    value={data.password}
                    onChange={handleChange}
                    disabled={isDisabled}
                />
                <Button disabled={isDisabled}>{isDisabled ? <Loader type="ThreeDots" color="#ffffff" height={60} width={60} /> : 'Entrar'}</Button>
            </Form>
            <Link to='/sign-up' disabled={isDisabled} style={{pointerEvents: isDisabled ? 'none' : 'all'}}>
                <Redirect>Primeira vez? Cadastre-se!</Redirect>
            </Link>
        </CenterPage>
    );
}

