import Input from "../shared/Input";
import Button from "../shared/Button";
import Redirect from "../shared/Redirect";
import Form from "../shared/Form";
import { CenterPage, Logo } from "../shared/LoginSignUp";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [data, setData] = useState({ email: '', password: '' });

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
        <CenterPage>
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
            <Link to='/sign-up'>
                <Redirect>Primeira vez? Cadastre-se!</Redirect>
            </Link>
        </CenterPage>
    );
}

