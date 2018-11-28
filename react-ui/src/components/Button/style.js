import styled from 'styled-components';

export const ButtonContainer = styled.button`
  width: ${props => props.wide ? "7rem" : "2.75rem"};
  height: 3rem;
  float: left;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 100;
  color: #fff;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: ${props => props.last ? "0 6px 6px 0" : "6px 0 0 6px"};
  cursor: ${props => props.wide ? "pointer" : "auto"};

  img {
    width: 60%;
  }
`;

export const CenterButtonContainer = styled(ButtonContainer)`
  border-radius: 0;
`;