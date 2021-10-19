import styled from "styled-components";

const Input = styled.input`
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    width: calc(100% - 50px);
    height: 58px;
    border: none;
    border-radius: 5px;
    outline: none;
    padding-left: 15px;
    margin: 0px 25px 13px 25px;

    &::placeholder {
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        color: #000000;
    }
`;

export default Input;