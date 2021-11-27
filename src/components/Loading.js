import styled from 'styled-components';
import Loader from 'react-loader-spinner';

export default function Loading() {
  return (
    <LoadingComponent>
      <Loader type="BallTriangle" color="#0D1732" height={40} width={40} />
      <Status>Carregando registros...</Status>
    </LoadingComponent>
  );
}

const LoadingComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
`;

const Status = styled.span`
  font-size: 16px;
  color: #0D1732;
  margin-top: 10px;
`;
