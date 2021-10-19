import styled from "styled-components";

const Input = styled.input`
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    width: calc(100vw - 50px);
    height: 58px;
    border: none;
    border-radius: 5px;
    outline: none;
    padding-left: 15px;
    margin-bottom: 13px;

    &::placeholder {
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        color: #000000;
    }
`;

export default Input;