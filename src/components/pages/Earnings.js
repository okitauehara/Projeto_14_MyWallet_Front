import Input from "../shared/Input";
import Button from "../shared/Button";
import Form from "../shared/Form";
import { useState } from "react";
import PageTitle from "../shared/PageTitle";

export default function Earnings() {

    const [data, setData] = useState({ value: '', description: '' });

    const handleChange = event => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function submitEarnings(event) {
        event.preventDefault();
        // Conectar com back-end
    }

    return (
        <>
            <PageTitle>Nova Entrada</PageTitle>
            <Form onSubmit={submitEarnings}>
                <Input
                    placeholder='Valor'
                    type='text'
                    name='value'
                    required
                    value={data.value}
                    onChange={handleChange}
                />
                <Input
                    placeholder='Descrição'
                    type='text'
                    name='description'
                    required
                    value={data.description}
                    onChange={handleChange}
                />
                <Button>Salvar entrada</Button>
            </Form>
        </>
    );
}
