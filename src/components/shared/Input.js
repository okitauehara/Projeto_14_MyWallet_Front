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
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

    &::placeholder {
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        color: #000000;
    }

    &:valid {
        background-color: #d4f8d4;
    }
`;

export default Input;