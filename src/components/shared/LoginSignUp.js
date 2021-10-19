import styled from "styled-components";

const CenterPage = styled.section`
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

export {
    CenterPage,
    Logo,
    Form
}