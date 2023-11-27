import styled, { css } from "styled-components";

interface ButtonProps {
  variation?: "primary" | "secondary";
}

const variations = {
  primary: css`
    color: var(--color-gray-0);
    background: var(--gradiant-right-1);
    &:hover {
      background: var(--gradiant-left-1);    
    `,
};

const Button = styled.button<ButtonProps>`
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  background-color: inherit;
  border: 2px solid;
  font-size: 1.6rem;
  font-weight: 500;

  ${(props) => props.variation && variations[props.variation]}
`;

export default Button;
