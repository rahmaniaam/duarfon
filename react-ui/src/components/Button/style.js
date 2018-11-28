import styled from 'styled-components';

export const ButtonContainer = styled.div`
  width: ${props => props.wide ? "7rem" : "2.75rem"};
  height: 3rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 2px solid #fff;
  border-radius: ${props => props.last ? "0 6px 6px 0" : "6px 0 0 6px"};
  cursor: ${props => props.wide ? "pointer" : "auto"};

  img {
    width: 40%;
  }
`;

export const CenterButtonContainer = styled(ButtonContainer)`
  border-radius: 0;
`;