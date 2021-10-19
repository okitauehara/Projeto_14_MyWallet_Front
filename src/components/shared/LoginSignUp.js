import styled from "styled-components";

const CenterPage = styled.section`
    height: calc(100vh - 50px);
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

export {
    CenterPage,
    Logo
}