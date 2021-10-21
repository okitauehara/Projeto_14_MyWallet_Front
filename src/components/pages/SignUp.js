import Input from "../shared/Input";
import Button from "../shared/Button";
import Redirect from "../shared/Redirect";
import Form from "../shared/Form";
import { CenterPage, Logo } from "../shared/LoginSignUp";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {

    const [data, setData] = useState({ name: '', email: '', password: '', confirmation: '' });

    const handleChange = event => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function submitSignUp(event) {
        event.preventDefault();
        // Conectar com back-end
    }

    return (
        <CenterPage>
            <Logo>MyWallet</Logo>
            <Form onSubmit={submitSignUp}>
                <Input
                    placeholder='Nome'
                    type='text'
                    name='name'
                    required
                    value={data.name}
                    onChange={handleChange}
                />
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
                <Input
                    placeholder='Confirme a senha'
                    type='password'
                    name='confirmation'
                    required
                    value={data.confirmation}
                    onChange={handleChange}
                />
                <Button>Cadastrar</Button>
            </Form>
            <Link to='/'>
                <Redirect>Já tem uma conta? Entre agora!</Redirect>
            </Link>
        </CenterPage>
    );
}
