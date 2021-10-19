import styled from "styled-components";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Redirect from "../shared/Redirect";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [data, setData] = useState({ email: '', password: ''});

    const handleChange = event => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function submitLogin(event) {
        event.preventDefault();
        // Conectar com back-end
    }

    return (
        <LoginPage>
            <Logo>MyWallet</Logo>
            <Form onSubmit={submitLogin}>
                <Input
                    placeholder='E-mail'
                    type='email'
                    name='email'
                    required
                    value={data.email}
                    onChange={handleChange}
                />
                <Input
                    placeholder='Senha'
                    type='password'
                    name='password'
                    required
                    value={data.password}
                    onChange={handleChange}
                />
                <Button>Entrar</Button>
            </Form>
            <Link to='/signup'>
                <Redirect>Primeira vez? Cadastre-se!</Redirect>
            </Link>
        </LoginPage>
    );
}

const LoginPage = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    color: #ffffff;
    margin-bottom: 25px;
`;

const Form = styled.form`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;