import Input from "../shared/Input";
import Button from "../shared/Button";
import Form from "../shared/Form";
import { useContext, useState } from "react";
import PageTitle from "../shared/PageTitle";
import { postNewExpense } from "../../services/API";
import UserContext from "../../contexts/UserContext";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";
import HomeButton from "../shared/HomeButton";
import { Link } from "react-router-dom";

export default function Expenses() {

    const { user, userData } = useContext(UserContext);
    const [data, setData] = useState({ value: '', description: '' });
    const [isDisabled, setIsDisabled] = useState(false);
    const history = useHistory()

    if (userData === null) {
        Swal.fire({
            icon: 'error',
            title: 'Você precisa estar logado para acessar esta página!',
        })
        history.push('/')
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function submitExpenses(event) {
        event.preventDefault();
        setIsDisabled(true);
        const body = {
            description: data.description,
            value: Number((data.value).replace(',', '')),
            type: 'expense'
        }
        postNewExpense(body, user.token)
            .then(async () => {
                setIsDisabled(false);
                await Swal.fire({
                    icon: 'success',
                    title: 'Adicionado com sucesso!',
                })
                history.push('/home')
            })
            .catch(async () => {
                await Swal.fire({
                    icon: 'error',
                    title: 'Verifique se os dados inseridos estão corretos e tente novamente',
                })
                setIsDisabled(false);
            });
    }

    return (
        <>
            <PageTitle>Nova Saída</PageTitle>
            <Link to='/home'>
                <HomeButton />
            </Link>
            <Form onSubmit={submitExpenses}>
                <Input
                    placeholder='Valor (Ex: 30,00)'
                    type='text'
                    name='value'
                    required
                    autoFocus
                    value={data.value}
                    onChange={handleChange}
                    pattern="^[1-9]\d{0,2}(\d{3})*,\d{2}$"
                    disabled={isDisabled}
                />
                <Input
                    placeholder='Descrição'
                    type='text'
                    name='description'
                    required
                    value={data.description}
                    onChange={handleChange}
                    disabled={isDisabled}
                />
                <Button disabled={isDisabled}>{isDisabled ? <Loader type="ThreeDots" color="#ffffff" height={60} width={60} /> : 'Salvar saída'}</Button>
            </Form>
        </>
    );
}
