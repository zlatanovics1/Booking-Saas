import styled from "styled-components";

const Input = styled.input`
  padding: 1.2rem 2.4rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);

  border: 1px solid var(--color-grey-300);
  &:focus {
    outline: 2px solid var(--color-brand-700);
  }
`;

export default Input;
